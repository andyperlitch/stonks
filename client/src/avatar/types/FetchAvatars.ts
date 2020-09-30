/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAvatars
// ====================================================

export interface FetchAvatars_myAvatars_components {
  __typename: "AvatarComponentMeta";
  /**
   * The id of the option being used for the given component type
   */
  optionId: string;
  /**
   * The type of the component
   */
  type: string;
  /**
   * The hue adjustment from the original component. Will be between -100 and 100
   */
  hue: number;
  /**
   * The saturation adjustment from the original component. Will be between -100 and 100
   */
  saturation: number;
  /**
   * The lightness adjustment from the original component. Will be between -100 and 100
   */
  lightness: number;
  /**
   * The contrast adjustment from the original component. Will be between -100 and 100
   */
  contrast: number;
}

export interface FetchAvatars_myAvatars {
  __typename: "AvatarMeta";
  /**
   * The unique id of this avatar instance
   */
  id: string;
  /**
   * The name of this avatar instance
   */
  name: string;
  /**
   * The components that this avatar instance consists of
   */
  components: FetchAvatars_myAvatars_components[];
}

export interface FetchAvatars {
  /**
   * The avatars that the current user has created.
   */
  myAvatars: FetchAvatars_myAvatars[];
}
