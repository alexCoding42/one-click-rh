export interface IAppointment {
  id: string;
  theme: string;
  subTheme: string;
  closedRequest: string;
  requestId?: string;
  contactPreference: string;
  otherLinePhoneNumber?: string;
  precision: string;
  date: string;
}
