import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    isAuthenticated: Boolean!
    id: String
    email: String
    username: String
    googleId: String
    thumbnail: String
  }

  type Query {
    me: User!
    avatarTemplate: AvatarTemplate!
  }

  type AvatarTemplate {
    imageUrl: String!
    frames: [AvatarTemplateFrame!]!
  }

  type AvatarTemplateFrame {
    index: Int!
    animationName: String!
    frameNumber: Int!
    partType: String!
    partName: String!
    subPartName: String
    sliceName: String!
    flipped: Boolean!
    coordinates: Box!
  }

  type Box {
    w: Float!
    h: Float!
    x: Float!
    y: Float!
  }
`
