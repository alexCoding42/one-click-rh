export const schema = {
  models: {
    Appointment: {
      name: 'Appointment',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        theme: {
          name: 'theme',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        subTheme: {
          name: 'subTheme',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        closedRequest: {
          name: 'closedRequest',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        contactPreference: {
          name: 'contactPreference',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        precision: {
          name: 'precision',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        hour: {
          name: 'hour',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        requestId: {
          name: 'requestId',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        otherLinePhoneNumber: {
          name: 'otherLinePhoneNumber',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: 'Appointments',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: 'ef7341b35b00f818cd58e1cfe87bf516',
};
