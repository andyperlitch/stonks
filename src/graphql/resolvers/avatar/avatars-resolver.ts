import { isAuthenticated } from '../common/is-authenticated'
import { combineResolvers } from 'graphql-resolvers'
import { GraphQLContext } from 'src/types/graphql'
import { UserResolvers } from './../../../types/graphql-types'

export const avatarsResolver: UserResolvers<
  GraphQLContext
>['avatars'] = combineResolvers<any, GraphQLContext>(
  isAuthenticated,
  async (_, __, { user }) => {
    const avatarEntities = await user.avatars
    return avatarEntities.map((a) => ({
      id: a.id,
      components: a.components,
      name: a.name,
    }))
  },
)
