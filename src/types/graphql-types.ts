import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Query = {
  __typename?: 'Query'
  /** Info about the current user, logged in or not. */
  me: User
  /** The avatars that the current user has created. */
  myAvatars: Array<AvatarMeta>
  /** Data about the template for avatars */
  avatarTemplate: AvatarTemplate
}

export type Mutation = {
  __typename?: 'Mutation'
  createAvatar: AvatarMeta
  updateAvatar: AvatarMeta
  deleteAvatar: AvatarMeta
  selectAvatar: User
}

export type MutationCreateAvatarArgs = {
  input: CreateAvatarInput
}

export type MutationUpdateAvatarArgs = {
  input: UpdateAvatarInput
}

export type MutationDeleteAvatarArgs = {
  input: DeleteAvatarInput
}

export type MutationSelectAvatarArgs = {
  input: SelectAvatarInput
}

export type CreateAvatarInput = {
  name?: Maybe<Scalars['String']>
}

export type UpdateAvatarInput = {
  /** The unique id of this avatar instance */
  id: Scalars['ID']
  /** The name of this avatar instance */
  name?: Maybe<Scalars['String']>
  /** The components that this avatar instance consists of */
  components?: Maybe<Array<AvatarComponentMetaInput>>
}

export type DeleteAvatarInput = {
  /** The unique id of this avatar instance */
  id: Scalars['ID']
}

export type SelectAvatarInput = {
  /** The unique id of the avatar to select */
  id: Scalars['ID']
}

export type AvatarComponentMetaInput = {
  /** The id of the option being used for the given component type */
  optionId: Scalars['String']
  /** The type of the component */
  type: Scalars['String']
  /** The hue adjustment from the original component. Will be between -100 and 100 */
  hue: Scalars['Int']
  /** The saturation adjustment from the original component. Will be between -100 and 100 */
  saturation: Scalars['Int']
  /** The lightness adjustment from the original component. Will be between -100 and 100 */
  lightness: Scalars['Int']
  /** The contrast adjustment from the original component. Will be between -100 and 100 */
  contrast: Scalars['Int']
}

export type AvatarMeta = {
  __typename?: 'AvatarMeta'
  /** The unique id of this avatar instance */
  id: Scalars['ID']
  /** The name of this avatar instance */
  name: Scalars['String']
  /** The components that this avatar instance consists of */
  components: Array<AvatarComponentMeta>
}

export type AvatarComponentMeta = {
  __typename?: 'AvatarComponentMeta'
  /** The id of the option being used for the given component type */
  optionId: Scalars['String']
  /** The type of the component */
  type: Scalars['String']
  /** The hue adjustment from the original component. Will be between -100 and 100 */
  hue: Scalars['Int']
  /** The saturation adjustment from the original component. Will be between -100 and 100 */
  saturation: Scalars['Int']
  /** The lightness adjustment from the original component. Will be between -100 and 100 */
  lightness: Scalars['Int']
  /** The contrast adjustment from the original component. Will be between -100 and 100 */
  contrast: Scalars['Int']
}

export type User = {
  __typename?: 'User'
  isAuthenticated: Scalars['Boolean']
  id?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  googleId?: Maybe<Scalars['String']>
  thumbnail?: Maybe<Scalars['String']>
}

export type AvatarTemplate = {
  __typename?: 'AvatarTemplate'
  imageUrl: Scalars['String']
  frames: Array<AvatarTemplateFrame>
}

export type AvatarTemplateFrame = {
  __typename?: 'AvatarTemplateFrame'
  index: Scalars['Int']
  animationName: Scalars['String']
  frameNumber: Scalars['Int']
  partType: Scalars['String']
  partName: Scalars['String']
  subPartName?: Maybe<Scalars['String']>
  sliceName: Scalars['String']
  coordinates: Box
}

export type Box = {
  __typename?: 'Box'
  w: Scalars['Float']
  h: Scalars['Float']
  x: Scalars['Float']
  y: Scalars['Float']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>
  Mutation: ResolverTypeWrapper<{}>
  CreateAvatarInput: CreateAvatarInput
  String: ResolverTypeWrapper<Scalars['String']>
  UpdateAvatarInput: UpdateAvatarInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  DeleteAvatarInput: DeleteAvatarInput
  SelectAvatarInput: SelectAvatarInput
  AvatarComponentMetaInput: AvatarComponentMetaInput
  Int: ResolverTypeWrapper<Scalars['Int']>
  AvatarMeta: ResolverTypeWrapper<AvatarMeta>
  AvatarComponentMeta: ResolverTypeWrapper<AvatarComponentMeta>
  User: ResolverTypeWrapper<User>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  AvatarTemplate: ResolverTypeWrapper<AvatarTemplate>
  AvatarTemplateFrame: ResolverTypeWrapper<AvatarTemplateFrame>
  Box: ResolverTypeWrapper<Box>
  Float: ResolverTypeWrapper<Scalars['Float']>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  Mutation: {}
  CreateAvatarInput: CreateAvatarInput
  String: Scalars['String']
  UpdateAvatarInput: UpdateAvatarInput
  ID: Scalars['ID']
  DeleteAvatarInput: DeleteAvatarInput
  SelectAvatarInput: SelectAvatarInput
  AvatarComponentMetaInput: AvatarComponentMetaInput
  Int: Scalars['Int']
  AvatarMeta: AvatarMeta
  AvatarComponentMeta: AvatarComponentMeta
  User: User
  Boolean: Scalars['Boolean']
  AvatarTemplate: AvatarTemplate
  AvatarTemplateFrame: AvatarTemplateFrame
  Box: Box
  Float: Scalars['Float']
  Upload: Scalars['Upload']
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  myAvatars?: Resolver<
    Array<ResolversTypes['AvatarMeta']>,
    ParentType,
    ContextType
  >
  avatarTemplate?: Resolver<
    ResolversTypes['AvatarTemplate'],
    ParentType,
    ContextType
  >
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createAvatar?: Resolver<
    ResolversTypes['AvatarMeta'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAvatarArgs, 'input'>
  >
  updateAvatar?: Resolver<
    ResolversTypes['AvatarMeta'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAvatarArgs, 'input'>
  >
  deleteAvatar?: Resolver<
    ResolversTypes['AvatarMeta'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAvatarArgs, 'input'>
  >
  selectAvatar?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationSelectAvatarArgs, 'input'>
  >
}>

export type AvatarMetaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AvatarMeta'] = ResolversParentTypes['AvatarMeta']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  components?: Resolver<
    Array<ResolversTypes['AvatarComponentMeta']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type AvatarComponentMetaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AvatarComponentMeta'] = ResolversParentTypes['AvatarComponentMeta']
> = ResolversObject<{
  optionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  hue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  saturation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lightness?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  contrast?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  isAuthenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  googleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type AvatarTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AvatarTemplate'] = ResolversParentTypes['AvatarTemplate']
> = ResolversObject<{
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  frames?: Resolver<
    Array<ResolversTypes['AvatarTemplateFrame']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type AvatarTemplateFrameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AvatarTemplateFrame'] = ResolversParentTypes['AvatarTemplateFrame']
> = ResolversObject<{
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  animationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  frameNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  partType?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  partName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  subPartName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  sliceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  coordinates?: Resolver<ResolversTypes['Box'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type BoxResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Box'] = ResolversParentTypes['Box']
> = ResolversObject<{
  w?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  h?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  AvatarMeta?: AvatarMetaResolvers<ContextType>
  AvatarComponentMeta?: AvatarComponentMetaResolvers<ContextType>
  User?: UserResolvers<ContextType>
  AvatarTemplate?: AvatarTemplateResolvers<ContextType>
  AvatarTemplateFrame?: AvatarTemplateFrameResolvers<ContextType>
  Box?: BoxResolvers<ContextType>
  Upload?: GraphQLScalarType
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
