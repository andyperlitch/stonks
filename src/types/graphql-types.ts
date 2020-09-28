import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type User = {
  __typename?: 'User';
  isAuthenticated: Scalars['Boolean'];
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  avatarTemplate: AvatarTemplate;
};

export type AvatarTemplate = {
  __typename?: 'AvatarTemplate';
  imageUrl: Scalars['String'];
  frames: Array<AvatarTemplateFrame>;
};

export type AvatarTemplateFrame = {
  __typename?: 'AvatarTemplateFrame';
  index: Scalars['Int'];
  animationName: Scalars['String'];
  frameNumber: Scalars['Int'];
  partType: Scalars['String'];
  partName: Scalars['String'];
  subPartName?: Maybe<Scalars['String']>;
  sliceName: Scalars['String'];
  flipped: Scalars['Boolean'];
  coordinates: Box;
};

export type Box = {
  __typename?: 'Box';
  w: Scalars['Float'];
  h: Scalars['Float'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  AvatarTemplate: ResolverTypeWrapper<AvatarTemplate>;
  AvatarTemplateFrame: ResolverTypeWrapper<AvatarTemplateFrame>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Box: ResolverTypeWrapper<Box>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  User: User;
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  Query: {};
  AvatarTemplate: AvatarTemplate;
  AvatarTemplateFrame: AvatarTemplateFrame;
  Int: Scalars['Int'];
  Box: Box;
  Float: Scalars['Float'];
  Upload: Scalars['Upload'];
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  isAuthenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  avatarTemplate?: Resolver<ResolversTypes['AvatarTemplate'], ParentType, ContextType>;
}>;

export type AvatarTemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvatarTemplate'] = ResolversParentTypes['AvatarTemplate']> = ResolversObject<{
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  frames?: Resolver<Array<ResolversTypes['AvatarTemplateFrame']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AvatarTemplateFrameResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvatarTemplateFrame'] = ResolversParentTypes['AvatarTemplateFrame']> = ResolversObject<{
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  animationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  frameNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  partType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subPartName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sliceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flipped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coordinates?: Resolver<ResolversTypes['Box'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type BoxResolvers<ContextType = any, ParentType extends ResolversParentTypes['Box'] = ResolversParentTypes['Box']> = ResolversObject<{
  w?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  h?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  User?: UserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  AvatarTemplate?: AvatarTemplateResolvers<ContextType>;
  AvatarTemplateFrame?: AvatarTemplateFrameResolvers<ContextType>;
  Box?: BoxResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
