// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SubTheme, Theme, Appointment } = initSchema(schema);

export {
  SubTheme,
  Theme,
  Appointment
};