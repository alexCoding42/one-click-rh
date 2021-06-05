/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubTheme = /* GraphQL */ `
  query GetSubTheme($id: ID!) {
    getSubTheme(id: $id) {
      id
      name
      themeID
      createdAt
      updatedAt
    }
  }
`;
export const listSubThemes = /* GraphQL */ `
  query ListSubThemes(
    $filter: ModelSubThemeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubThemes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        themeID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTheme = /* GraphQL */ `
  query GetTheme($id: ID!) {
    getTheme(id: $id) {
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
export const listThemes = /* GraphQL */ `
  query ListThemes(
    $filter: ModelThemeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThemes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        subThemes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
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
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const appointmentsByUsername = /* GraphQL */ `
  query AppointmentsByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    appointmentsByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
