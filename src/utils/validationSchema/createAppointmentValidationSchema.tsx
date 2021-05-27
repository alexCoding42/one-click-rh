import * as Yup from 'yup';

const fieldRequired = 'Ce champ est obligatoire.';
const requestIdRequired = 'Vous devez préciser le n° de demande.';
const otherLinePhoneNumberRequired = 'Vous devez entrer un n° de téléphone.';

const requiredForClosedRequest = {
  is: 'Oui',
  then: Yup.string().required(requestIdRequired),
};

const requiredForContactPreference = {
  is: 'otherLine',
  then: Yup.string().required(otherLinePhoneNumberRequired),
};

export const createAppointmentValidationSchema = Yup.object().shape({
  theme: Yup.string().required(fieldRequired),
  subTheme: Yup.string().required(fieldRequired),
  closedRequest: Yup.string().required(fieldRequired),
  requestId: Yup.string().when('closedRequest', requiredForClosedRequest),
  contactPreference: Yup.string().required(fieldRequired),
  otherLinePhoneNumber: Yup.string().when('contactPreference', requiredForContactPreference),
  precision: Yup.string().required(fieldRequired),
  date: Yup.string().required(fieldRequired).nullable(),
});
