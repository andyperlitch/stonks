import { getAppConfig } from './config'
import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export async function setupDB() {
  const config = getAppConfig()
  // synchronize database
  const dbConnection = await createConnection(
    config.dbConfig as PostgresConnectionOptions,
  )
  if (process.env.NODE_ENV !== 'production') {
    await dbConnection.synchronize()
  }
}
