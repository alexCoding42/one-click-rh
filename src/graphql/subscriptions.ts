/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubTheme = /* GraphQL */ `
  subscription OnCreateSubTheme {
    onCreateSubTheme {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubTheme = /* GraphQL */ `
  subscription OnUpdateSubTheme {
    onUpdateSubTheme {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubTheme = /* GraphQL */ `
  subscription OnDeleteSubTheme {
    onDeleteSubTheme {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTheme = /* GraphQL */ `
  subscription OnCreateTheme {
    onCreateTheme {
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
export const onUpdateTheme = /* GraphQL */ `
  subscription OnUpdateTheme {
    onUpdateTheme {
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
export const onDeleteTheme = /* GraphQL */ `
  subscription OnDeleteTheme {
    onDeleteTheme {
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
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment($username: String) {
    onCreateAppointment(username: $username) {
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
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment($username: String) {
    onUpdateAppointment(username: $username) {
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
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment($username: String) {
    onDeleteAppointment(username: $username) {
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
