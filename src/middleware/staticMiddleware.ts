import express, { Router } from 'express'
import { promises as fs } from 'fs'
import { resolve } from 'path'

export const staticMiddleware = ({
  indexCacheTime = 60 * 1000,
  indexHtmlPath = resolve(__dirname, '../../client/build/index.html'),
}) => {
  const router = Router()

  // Static files
  router.use(express.static('client/build'))
  console.log(
    `resolve(__dirname, '../client/build')`,
    resolve(__dirname, '../client/build'),
  )

  // Redirect to index.html when unknown GET route, and cache index.html contents
  let cachedHtml: string
  let lastCacheTime: number
  let cachingPromise: Promise<string> | null = null
  router.get('*', (req, res, next) => {
    if (cachedHtml && Date.now() - lastCacheTime < indexCacheTime) {
      res.send(cachedHtml)
      return
    }
    if (cachingPromise) {
      cachingPromise.then((html) => res.send(html), next)
      return
    }
    cachingPromise = fs.readFile(indexHtmlPath, 'utf8').then(
      (indexHtml) => {
        cachedHtml = indexHtml
        cachingPromise = null
        res.send(indexHtml)
        return indexHtml
      },
      (err) => {
        console.error(
          `staticMiddleware: An error occurred loading the index.html file: ${err}`,
        )
        next(err)
        throw err
      },
    )
  })
  return router
}
