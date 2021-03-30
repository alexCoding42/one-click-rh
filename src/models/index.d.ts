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