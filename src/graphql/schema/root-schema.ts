import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    """
    Info about the current user, logged in or not.
    """
    me: User!
    """
    The avatars that the current user has created.
    """
    myAvatars: [AvatarMeta!]!
    """
    Data about the template for avatars
    """
    avatarTemplate: AvatarTemplate!
  }

  type Mutation {
    createAvatar(input: CreateAvatarInput!): AvatarMeta!
    updateAvatar(input: UpdateAvatarInput!): AvatarMeta!
    deleteAvatar(input: DeleteAvatarInput!): AvatarMeta!
    selectAvatar(input: SelectAvatarInput!): User!
  }

  input CreateAvatarInput {
    name: String
  }

  input UpdateAvatarInput {
    """
    The unique id of this avatar instance
    """
    id: ID!
    """
    The name of this avatar instance
    """
    name: String
    """
    The components that this avatar instance consists of
    """
    components: [AvatarComponentMetaInput!]
  }

  input DeleteAvatarInput {
    """
    The unique id of this avatar instance
    """
    id: ID!
  }

  input SelectAvatarInput {
    """
    The unique id of the avatar to select
    """
    id: ID!
  }

  input AvatarComponentMetaInput {
    """
    The id of the option being used for the given component type
    """
    optionId: String!
    """
    The type of the component
    """
    type: String!
    """
    The hue adjustment from the original component. Will be between -100 and 100
    """
    hue: Int!
    """
    The saturation adjustment from the original component. Will be between -100 and 100
    """
    saturation: Int!
    """
    The lightness adjustment from the original component. Will be between -100 and 100
    """
    lightness: Int!
    """
    The contrast adjustment from the original component. Will be between -100 and 100
    """
    contrast: Int!
  }

  type AvatarMeta {
    """
    The unique id of this avatar instance
    """
    id: ID!
    """
    The name of this avatar instance
    """
    name: String!
    """
    The components that this avatar instance consists of
    """
    components: [AvatarComponentMeta!]!
  }

  type AvatarComponentMeta {
    """
    The id of the option being used for the given component type
    """
    optionId: String!
    """
    The type of the component
    """
    type: String!
    """
    The hue adjustment from the original component. Will be between -100 and 100
    """
    hue: Int!
    """
    The saturation adjustment from the original component. Will be between -100 and 100
    """
    saturation: Int!
    """
    The lightness adjustment from the original component. Will be between -100 and 100
    """
    lightness: Int!
    """
    The contrast adjustment from the original component. Will be between -100 and 100
    """
    contrast: Int!
  }

  type User {
    isAuthenticated: Boolean!
    id: ID
    email: String
    username: String
    googleId: String
    thumbnail: String
    """
    The id of the current user's selected avatar
    """
    currentAvatar: String
  }

  type AvatarTemplate {
    imageUrl: String!
    frames: [AvatarTemplateFrame!]!
    skinColors: [AvatarColorChoice!]!
  }

  type AvatarColorChoice {
    id: String!
    previewColor: String!
    hue: Int!
    saturation: Int!
    lightness: Int!
    contrast: Int!
  }

  type AvatarTemplateFrame {
    index: Int!
    animationName: String!
    frameNumber: Int!
    partType: String!
    partName: String!
    subPartName: String
    sliceName: String!
    coordinates: Box!
  }

  type Box {
    w: Float!
    h: Float!
    x: Float!
    y: Float!
  }
`
