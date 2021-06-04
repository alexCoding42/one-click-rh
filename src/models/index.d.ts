import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class SubTheme {
  readonly id: string;
  readonly name?: string;
  readonly themeID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SubTheme>);
  static copyOf(source: SubTheme, mutator: (draft: MutableModel<SubTheme>) => MutableModel<SubTheme> | void): SubTheme;
}

export declare class Theme {
  readonly id: string;
  readonly name?: string;
  readonly SubThemes?: (SubTheme | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Theme>);
  static copyOf(source: Theme, mutator: (draft: MutableModel<Theme>) => MutableModel<Theme> | void): Theme;
}

export declare class Appointment {
  readonly id: string;
  readonly theme: string;
  readonly subTheme: string;
  readonly closedRequest: string;
  readonly requestId?: string;
  readonly contactPreference: string;
  readonly otherLinePhoneNumber?: string;
  readonly precision: string;
  readonly date: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Appointment>);
  static copyOf(source: Appointment, mutator: (draft: MutableModel<Appointment>) => MutableModel<Appointment> | void): Appointment;
}