import * as Yup from 'yup';

const fieldRequired: string = 'Ce champ est obligatoire.';
const requestIdRequired: string = 'Vous devez préciser le n° de demande.';
const otherLinePhoneNumberRequired: string =
  'Vous devez entrer un n° de téléphone.';

const requiredForClosedRequest = {
  is: 'Oui',
  then: Yup.string().required(requestIdRequired),
};

const requiredForContactPreference = {
  is: 'otherLine',
  then: Yup.string().required(otherLinePhoneNumberRequired),
};

export const formSchema = Yup.object().shape({
  theme: Yup.string().required(fieldRequired),
  subTheme: Yup.string().required(fieldRequired),
  closedRequest: Yup.string().required(fieldRequired),
  requestId: Yup.string().when('closedRequest', requiredForClosedRequest),
  contactPreference: Yup.string().required(fieldRequired),
  otherLinePhoneNumber: Yup.string().when(
    'contactPreference',
    requiredForContactPreference
  ),
  precision: Yup.string().required(fieldRequired),
  hour: Yup.string().required(fieldRequired),
});
