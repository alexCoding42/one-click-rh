import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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