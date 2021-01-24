// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Appointment, Subtheme, Theme } = initSchema(schema);

export {
  Appointment,
  Subtheme,
  Theme
};