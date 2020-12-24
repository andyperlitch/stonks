/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AvatarComponentMetaInput {
  optionId: string;
  type: string;
  hue: number;
  saturation: number;
  lightness: number;
  contrast: number;
}

export interface CreateAvatarInput {
  name?: string | null;
}

export interface DeleteAvatarInput {
  id: string;
}

export interface SelectAvatarInput {
  id: string;
}

export interface UpdateAvatarInput {
  id: string;
  name?: string | null;
  components?: AvatarComponentMetaInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
