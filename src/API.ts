/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSubThemeInput = {
  id?: string | null,
  name: string,
  themeID: string,
};

export type ModelSubThemeConditionInput = {
  name?: ModelStringInput | null,
  themeID?: ModelIDInput | null,
  and?: Array< ModelSubThemeConditionInput | null > | null,
  or?: Array< ModelSubThemeConditionInput | null > | null,
  not?: ModelSubThemeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type SubTheme = {
  __typename: "SubTheme",
  id: string,
  name: string,
  themeID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSubThemeInput = {
  id: string,
  name?: string | null,
  themeID?: string | null,
};

export type DeleteSubThemeInput = {
  id: string,
};

export type CreateThemeInput = {
  id?: string | null,
  name: string,
};

export type ModelThemeConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelThemeConditionInput | null > | null,
  or?: Array< ModelThemeConditionInput | null > | null,
  not?: ModelThemeConditionInput | null,
};

export type Theme = {
  __typename: "Theme",
  id: string,
  name: string,
  subThemes?: ModelSubThemeConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelSubThemeConnection = {
  __typename: "ModelSubThemeConnection",
  items?:  Array<SubTheme | null > | null,
  nextToken?: string | null,
};

export type UpdateThemeInput = {
  id: string,
  name?: string | null,
};

export type DeleteThemeInput = {
  id: string,
};

export type CreateAppointmentInput = {
  id?: string | null,
  theme: string,
  subTheme: string,
  closedRequest: string,
  closedRequestId?: string | null,
  contactPreference: string,
  otherLinePhoneNumber?: string | null,
  description: string,
  date: string,
  username?: string | null,
};

export type ModelAppointmentConditionInput = {
  theme?: ModelStringInput | null,
  subTheme?: ModelStringInput | null,
  closedRequest?: ModelStringInput | null,
  closedRequestId?: ModelStringInput | null,
  contactPreference?: ModelStringInput | null,
  otherLinePhoneNumber?: ModelStringInput | null,
  description?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelAppointmentConditionInput | null > | null,
  or?: Array< ModelAppointmentConditionInput | null > | null,
  not?: ModelAppointmentConditionInput | null,
};

export type Appointment = {
  __typename: "Appointment",
  id: string,
  theme: string,
  subTheme: string,
  closedRequest: string,
  closedRequestId?: string | null,
  contactPreference: string,
  otherLinePhoneNumber?: string | null,
  description: string,
  date: string,
  username?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAppointmentInput = {
  id: string,
  theme?: string | null,
  subTheme?: string | null,
  closedRequest?: string | null,
  closedRequestId?: string | null,
  contactPreference?: string | null,
  otherLinePhoneNumber?: string | null,
  description?: string | null,
  date?: string | null,
  username?: string | null,
};

export type DeleteAppointmentInput = {
  id: string,
};

export type ModelSubThemeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  themeID?: ModelIDInput | null,
  and?: Array< ModelSubThemeFilterInput | null > | null,
  or?: Array< ModelSubThemeFilterInput | null > | null,
  not?: ModelSubThemeFilterInput | null,
};

export type ModelThemeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelThemeFilterInput | null > | null,
  or?: Array< ModelThemeFilterInput | null > | null,
  not?: ModelThemeFilterInput | null,
};

export type ModelThemeConnection = {
  __typename: "ModelThemeConnection",
  items?:  Array<Theme | null > | null,
  nextToken?: string | null,
};

export type ModelAppointmentFilterInput = {
  id?: ModelIDInput | null,
  theme?: ModelStringInput | null,
  subTheme?: ModelStringInput | null,
  closedRequest?: ModelStringInput | null,
  closedRequestId?: ModelStringInput | null,
  contactPreference?: ModelStringInput | null,
  otherLinePhoneNumber?: ModelStringInput | null,
  description?: ModelStringInput | null,
  date?: ModelStringInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelAppointmentFilterInput | null > | null,
  or?: Array< ModelAppointmentFilterInput | null > | null,
  not?: ModelAppointmentFilterInput | null,
};

export type ModelAppointmentConnection = {
  __typename: "ModelAppointmentConnection",
  items?:  Array<Appointment | null > | null,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateSubThemeMutationVariables = {
  input: CreateSubThemeInput,
  condition?: ModelSubThemeConditionInput | null,
};

export type CreateSubThemeMutation = {
  createSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubThemeMutationVariables = {
  input: UpdateSubThemeInput,
  condition?: ModelSubThemeConditionInput | null,
};

export type UpdateSubThemeMutation = {
  updateSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubThemeMutationVariables = {
  input: DeleteSubThemeInput,
  condition?: ModelSubThemeConditionInput | null,
};

export type DeleteSubThemeMutation = {
  deleteSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateThemeMutationVariables = {
  input: CreateThemeInput,
  condition?: ModelThemeConditionInput | null,
};

export type CreateThemeMutation = {
  createTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateThemeMutationVariables = {
  input: UpdateThemeInput,
  condition?: ModelThemeConditionInput | null,
};

export type UpdateThemeMutation = {
  updateTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteThemeMutationVariables = {
  input: DeleteThemeInput,
  condition?: ModelThemeConditionInput | null,
};

export type DeleteThemeMutation = {
  deleteTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAppointmentMutationVariables = {
  input: CreateAppointmentInput,
  condition?: ModelAppointmentConditionInput | null,
};

export type CreateAppointmentMutation = {
  createAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAppointmentMutationVariables = {
  input: UpdateAppointmentInput,
  condition?: ModelAppointmentConditionInput | null,
};

export type UpdateAppointmentMutation = {
  updateAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAppointmentMutationVariables = {
  input: DeleteAppointmentInput,
  condition?: ModelAppointmentConditionInput | null,
};

export type DeleteAppointmentMutation = {
  deleteAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSubThemeQueryVariables = {
  id: string,
};

export type GetSubThemeQuery = {
  getSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubThemesQueryVariables = {
  filter?: ModelSubThemeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubThemesQuery = {
  listSubThemes?:  {
    __typename: "ModelSubThemeConnection",
    items?:  Array< {
      __typename: "SubTheme",
      id: string,
      name: string,
      themeID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetThemeQueryVariables = {
  id: string,
};

export type GetThemeQuery = {
  getTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListThemesQueryVariables = {
  filter?: ModelThemeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListThemesQuery = {
  listThemes?:  {
    __typename: "ModelThemeConnection",
    items?:  Array< {
      __typename: "Theme",
      id: string,
      name: string,
      subThemes?:  {
        __typename: "ModelSubThemeConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAppointmentQueryVariables = {
  id: string,
};

export type GetAppointmentQuery = {
  getAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAppointmentsQueryVariables = {
  filter?: ModelAppointmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAppointmentsQuery = {
  listAppointments?:  {
    __typename: "ModelAppointmentConnection",
    items?:  Array< {
      __typename: "Appointment",
      id: string,
      theme: string,
      subTheme: string,
      closedRequest: string,
      closedRequestId?: string | null,
      contactPreference: string,
      otherLinePhoneNumber?: string | null,
      description: string,
      date: string,
      username?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type AppointmentsByUsernameQueryVariables = {
  username?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAppointmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AppointmentsByUsernameQuery = {
  appointmentsByUsername?:  {
    __typename: "ModelAppointmentConnection",
    items?:  Array< {
      __typename: "Appointment",
      id: string,
      theme: string,
      subTheme: string,
      closedRequest: string,
      closedRequestId?: string | null,
      contactPreference: string,
      otherLinePhoneNumber?: string | null,
      description: string,
      date: string,
      username?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSubThemeSubscription = {
  onCreateSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubThemeSubscription = {
  onUpdateSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubThemeSubscription = {
  onDeleteSubTheme?:  {
    __typename: "SubTheme",
    id: string,
    name: string,
    themeID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateThemeSubscription = {
  onCreateTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateThemeSubscription = {
  onUpdateTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteThemeSubscription = {
  onDeleteTheme?:  {
    __typename: "Theme",
    id: string,
    name: string,
    subThemes?:  {
      __typename: "ModelSubThemeConnection",
      items?:  Array< {
        __typename: "SubTheme",
        id: string,
        name: string,
        themeID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAppointmentSubscriptionVariables = {
  username?: string | null,
};

export type OnCreateAppointmentSubscription = {
  onCreateAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAppointmentSubscriptionVariables = {
  username?: string | null,
};

export type OnUpdateAppointmentSubscription = {
  onUpdateAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAppointmentSubscriptionVariables = {
  username?: string | null,
};

export type OnDeleteAppointmentSubscription = {
  onDeleteAppointment?:  {
    __typename: "Appointment",
    id: string,
    theme: string,
    subTheme: string,
    closedRequest: string,
    closedRequestId?: string | null,
    contactPreference: string,
    otherLinePhoneNumber?: string | null,
    description: string,
    date: string,
    username?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
