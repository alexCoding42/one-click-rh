import React, { FC, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
} from '@chakra-ui/react';

import { AiOutlinePhone as PhoneIcon } from 'react-icons/ai';

import { hourOptions } from '../../src/data';
import { customFormValidationSchema } from '../utils/validationSchema/customFormValidationSchema';
import { IAppointment } from '../types';

type CustomFormProps = {
  handleSubmit: (values: IAppointment) => any;
  changeTheme: (theme: string) => string;
  themes: string[];
  subThemes: any[];
  isSubmitting: boolean;
};

const initialValues: IAppointment = {
  id: '',
  theme: '',
  subTheme: '',
  closedRequest: '',
  requestId: '',
  contactPreference: '',
  otherLinePhoneNumber: '',
  precision: '',
  hour: '',
};

const CustomForm: FC<CustomFormProps> = ({
  handleSubmit,
  changeTheme,
  themes,
  subThemes,
  isSubmitting,
}) => {
  const [closedRequest, setClosedRequest] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<string>('');
  const [hour, setHour] = useState<string>('');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customFormValidationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing='8' mb={8}>
            <Field name='theme'>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.theme && form.touched.theme}
                >
                  <FormLabel htmlFor='theme'>Thème de votre question</FormLabel>
                  <Select
                    {...field}
                    name='theme'
                    placeholder='---'
                    onChange={(e: any) => {
                      const { value } = e.target;
                      changeTheme(value);
                      setFieldValue('theme', value);
                    }}
                  >
                    {themes &&
                      themes.map((theme: any) => (
                        <option key={theme} value={theme}>
                          {theme.toLowerCase()}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>{form.errors.theme}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='subTheme'>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.subTheme && form.touched.subTheme}
                >
                  <FormLabel htmlFor='subTheme'>
                    Sous thème de votre question
                  </FormLabel>
                  <Select {...field} name='subTheme' placeholder='---'>
                    {subThemes &&
                      subThemes.map((subTheme: any) => (
                        <option key={subTheme.id} value={subTheme.subTheme}>
                          {subTheme.subTheme.toLowerCase()}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>{form.errors.subTheme}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </SimpleGrid>

          <Box mb={8}>
            <Field name='closedRequest'>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.closedRequest && form.touched.closedRequest
                  }
                >
                  <FormLabel>
                    Votre question concerne-t-elle une demande RH en cours ou
                    cloturée ?
                  </FormLabel>
                  <Flex
                    d='flex'
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={{ base: 'initial', sm: 'center' }}
                  >
                    <Box
                      width={{ base: '90%', sm: '50%' }}
                      mb={{ base: 4, sm: 0 }}
                    >
                      <RadioGroup
                        {...field}
                        name='closedRequest'
                        onChange={(request: string) => {
                          setClosedRequest(request);
                          setFieldValue('closedRequest', request);
                          setFieldValue('requestId', '');
                        }}
                      >
                        <HStack>
                          <Radio
                            value='Non'
                            isChecked={'Non' === closedRequest}
                          >
                            Non
                          </Radio>
                          <Radio
                            value='Oui'
                            isChecked={'Oui' === closedRequest}
                          >
                            Oui
                          </Radio>
                        </HStack>
                      </RadioGroup>
                      <FormErrorMessage>
                        {form.errors.closedRequest}
                      </FormErrorMessage>
                    </Box>

                    <Box width={{ base: '100%', sm: '40%' }}>
                      <Field name='requestId'>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.requestId && form.touched.requestId
                            }
                          >
                            <Input
                              {...field}
                              type='text'
                              placeholder='Préciser le n° de la demande'
                              isDisabled={closedRequest !== 'Oui'}
                            />
                            <FormErrorMessage>
                              {form.errors.requestId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>

                  <FormHelperText>
                    Vous pouvez retrouver le numéro de votre demande RH depuis
                    le portail RH, dans la rubrique mes demandes.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Box mb={8}>
            <Field name='contactPreference'>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.contactPreference &&
                    form.touched.contactPreference
                  }
                >
                  <FormLabel>Votre souhaitez être contacté sur :</FormLabel>
                  <Flex
                    d='flex'
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={{ base: 'initial', sm: 'center' }}
                  >
                    <Box
                      width={{ base: '90%', sm: '50%' }}
                      mb={{ base: 4, sm: 0 }}
                    >
                      <RadioGroup
                        {...field}
                        name='contactPreference'
                        onChange={(contact: string) => {
                          setContactPreference(contact);
                          setFieldValue('contactPreference', contact);
                          setFieldValue('otherLinePhoneNumber', '');
                        }}
                      >
                        <HStack>
                          <Radio
                            value='proLine'
                            isChecked={'proLine' === contactPreference}
                          >
                            Votre ligne professionnelle
                          </Radio>
                          <Radio
                            value='otherLine'
                            isChecked={'otherLine' === contactPreference}
                          >
                            Une autre ligne
                          </Radio>
                        </HStack>
                      </RadioGroup>
                      <FormErrorMessage>
                        {form.errors.contactPreference}
                      </FormErrorMessage>
                    </Box>

                    <Box width={{ base: '90%', sm: '50%' }}>
                      <Field name='otherLinePhoneNumber'>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.otherLinePhoneNumber &&
                              form.touched.otherLinePhoneNumber
                            }
                          >
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents='none'
                                children={<PhoneIcon color='gray.300' />}
                              />
                              <Input
                                {...field}
                                type='tel'
                                placeholder='XX XX XX XX XX'
                                isDisabled={contactPreference !== 'otherLine'}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.otherLinePhoneNumber}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>

                  <FormHelperText>
                    Le jour du rendez-vous, vous serez contacté sur cette ligne
                    par l'expert RH en charge de votre demande.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Stack mb={8}>
            <Field name='precision'>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.precision && form.touched.precision}
                >
                  <FormLabel htmlFor='precision'>
                    Merci de préciser votre question :
                  </FormLabel>
                  <Textarea {...field} name='precision' />
                  <FormErrorMessage>{form.errors.precision}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>

          <Stack hidden mb={8}>
            <Field name='hour'>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.hour && form.touched.hour}>
                  <FormLabel htmlFor='hour'>
                    Choisissez votre créneau :
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    name='hour'
                    onChange={(hourValue: string) => {
                      setHour(hourValue);
                      setFieldValue('hour', hourValue);
                    }}
                  >
                    <HStack spacing={4} direction='column'>
                      {hourOptions.map((value, index) => {
                        return (
                          <Radio
                            key={index}
                            value={value}
                            isChecked={value === hour}
                          >
                            {value}
                          </Radio>
                        );
                      })}
                    </HStack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.hour}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>

          <Button type='submit' colorScheme='whatsapp' isLoading={isSubmitting}>
            Prendre rendez-vous
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
