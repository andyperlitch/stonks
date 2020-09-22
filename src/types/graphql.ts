import { Request } from 'express'

export interface GraphqlContext {
  req: Request
}

export interface GraphQLObjectTypeConfig {
  name: string
  description?: string
  interfaces?: any
  fields: any
  isTypeOf?: any
  extensions?: any
  astNode?: any
  extensionASTNodes?: any
}

export interface ResolverFn<Data = any, Parent = any, Args = any> {
  (
    parent: Parent,
    args: Args,
    context: GraphqlContext,
    info?: GraphQLObjectTypeConfig,
  ): Data
}
