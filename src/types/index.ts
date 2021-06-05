export interface IAppointment {
  id: string;
  theme: string;
  subTheme: string;
  closedRequest: string;
  closedRequestId?: string;
  contactPreference: string;
  otherLinePhoneNumber?: string;
  description: string;
  date: string;
  username?: string;
}
