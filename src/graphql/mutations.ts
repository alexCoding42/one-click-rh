/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubTheme = /* GraphQL */ `
  mutation CreateSubTheme(
    $input: CreateSubThemeInput!
    $condition: ModelSubThemeConditionInput
  ) {
    createSubTheme(input: $input, condition: $condition) {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const updateSubTheme = /* GraphQL */ `
  mutation UpdateSubTheme(
    $input: UpdateSubThemeInput!
    $condition: ModelSubThemeConditionInput
  ) {
    updateSubTheme(input: $input, condition: $condition) {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubTheme = /* GraphQL */ `
  mutation DeleteSubTheme(
    $input: DeleteSubThemeInput!
    $condition: ModelSubThemeConditionInput
  ) {
    deleteSubTheme(input: $input, condition: $condition) {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const createTheme = /* GraphQL */ `
  mutation CreateTheme(
    $input: CreateThemeInput!
    $condition: ModelThemeConditionInput
  ) {
    createTheme(input: $input, condition: $condition) {
      id
      name
      subThemes {
        items {
          id
          name
          themeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTheme = /* GraphQL */ `
  mutation UpdateTheme(
    $input: UpdateThemeInput!
    $condition: ModelThemeConditionInput
  ) {
    updateTheme(input: $input, condition: $condition) {
      id
      name
      subThemes {
        items {
          id
          name
          themeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTheme = /* GraphQL */ `
  mutation DeleteTheme(
    $input: DeleteThemeInput!
    $condition: ModelThemeConditionInput
  ) {
    deleteTheme(input: $input, condition: $condition) {
      id
      name
      subThemes {
        items {
          id
          name
          themeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
      id
      theme
      subTheme
      closedRequest
      closedRequestId
      contactPreference
      otherLinePhoneNumber
      description
      date
      username
      createdAt
      updatedAt
    }
  }
`;
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
      id
      theme
      subTheme
      closedRequest
      closedRequestId
      contactPreference
      otherLinePhoneNumber
      description
      date
      username
      createdAt
      updatedAt
    }
  }
`;
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
      id
      theme
      subTheme
      closedRequest
      closedRequestId
      contactPreference
      otherLinePhoneNumber
      description
      date
      username
      createdAt
      updatedAt
    }
  }
`;
