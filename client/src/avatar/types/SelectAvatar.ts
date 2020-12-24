/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SelectAvatarInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SelectAvatar
// ====================================================

export interface SelectAvatar_selectAvatar {
  __typename: "User";
  id: string | null;
  /**
   * The id of the current user's selected avatar
   */
  currentAvatar: string | null;
}

export interface SelectAvatar {
  selectAvatar: SelectAvatar_selectAvatar;
}

export interface SelectAvatarVariables {
  input: SelectAvatarInput;
}
