import { ResolverFn } from '../../types/graphql'

export const userResolver: ResolverFn = (parent, args, context) => {
  if (context.req.session?.loggedIn) {
  }
}
