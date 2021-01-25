import * as Yup from 'yup';

const fieldRequired: string = 'Ce champ est obligatoire.';

export const formSchema = Yup.object().shape({
  theme: Yup.string().required(fieldRequired),
  subTheme: Yup.string().required(fieldRequired),
  closedRequest: Yup.string().required(fieldRequired),
  contactPreference: Yup.string().required(fieldRequired),
  precision: Yup.string().required(fieldRequired),
  hour: Yup.string().required(fieldRequired),
});
