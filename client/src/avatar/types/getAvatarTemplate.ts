/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAvatarTemplate
// ====================================================

export interface GetAvatarTemplate_avatarTemplate_frames_coordinates {
  __typename: "Box";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GetAvatarTemplate_avatarTemplate_frames {
  __typename: "AvatarTemplateFrame";
  index: number;
  animationName: string;
  frameNumber: number;
  partType: string;
  partName: string;
  subPartName: string | null;
  sliceName: string;
  flipped: boolean;
  coordinates: GetAvatarTemplate_avatarTemplate_frames_coordinates;
}

export interface GetAvatarTemplate_avatarTemplate {
  __typename: "AvatarTemplate";
  imageUrl: string;
  frames: GetAvatarTemplate_avatarTemplate_frames[];
}

export interface GetAvatarTemplate {
  /**
   * Data about the template for avatars
   */
  avatarTemplate: GetAvatarTemplate_avatarTemplate;
}
