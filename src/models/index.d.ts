import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Appointment {
  readonly id: string;
  readonly theme: string;
  readonly subTheme: string;
  readonly closedRequest: string;
  readonly contactPreference: string;
  readonly precision: string;
  readonly hour: string;
  readonly requestId?: string;
  readonly otherLinePhoneNumber?: string;
  constructor(init: ModelInit<Appointment>);
  static copyOf(source: Appointment, mutator: (draft: MutableModel<Appointment>) => MutableModel<Appointment> | void): Appointment;
}

export declare class Subtheme {
  readonly id: string;
  readonly title?: string;
  readonly themeID: string;
  constructor(init: ModelInit<Subtheme>);
  static copyOf(source: Subtheme, mutator: (draft: MutableModel<Subtheme>) => MutableModel<Subtheme> | void): Subtheme;
}

export declare class Theme {
  readonly id: string;
  readonly title?: string;
  readonly subthemes?: (Subtheme | null)[];
  constructor(init: ModelInit<Theme>);
  static copyOf(source: Theme, mutator: (draft: MutableModel<Theme>) => MutableModel<Theme> | void): Theme;
}