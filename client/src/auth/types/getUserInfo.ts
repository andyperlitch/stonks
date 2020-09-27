/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserInfo
// ====================================================

export interface getUserInfo_me {
  __typename: "User";
  id: string | null;
  email: string | null;
  username: string | null;
  googleId: string | null;
  thumbnail: string | null;
  isAuthenticated: boolean;
}

export interface getUserInfo {
  me: getUserInfo_me | null;
}
