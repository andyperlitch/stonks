/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteAvatarInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteAvatar
// ====================================================

export interface DeleteAvatar_deleteAvatar {
  __typename: "AvatarMeta";
  /**
   * The unique id of this avatar instance
   */
  id: string;
}

export interface DeleteAvatar {
  deleteAvatar: DeleteAvatar_deleteAvatar;
}

export interface DeleteAvatarVariables {
  input: DeleteAvatarInput;
}
