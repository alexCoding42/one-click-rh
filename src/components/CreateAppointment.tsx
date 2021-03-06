import React, { FC, forwardRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { format, formatISO, isWeekend, setHours, setMinutes } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

import './CreateAppointment.css';
import { createAppointmentValidationSchema } from '../utils/validationSchema/createAppointmentValidationSchema';
import { IAppointment } from '../types';
import { SubTheme, Theme } from '../API';

type CreateAppointmentProps = {
  handleSubmit: (values: IAppointment) => void;
  changeTheme: (theme: string) => void;
  themes: Theme[];
  subThemes: SubTheme[];
  isSubmitting: boolean;
};

const initialValues: IAppointment = {
  id: '',
  theme: '',
  subTheme: '',
  closedRequest: '',
  closedRequestId: '',
  contactPreference: '',
  otherLinePhoneNumber: '',
  description: '',
  date: '',
};

const CreateAppointment: FC<CreateAppointmentProps> = ({
  handleSubmit,
  changeTheme,
  themes,
  subThemes,
  isSubmitting,
}) => {
  const [closedRequest, setClosedRequest] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);

  const CustomCalendarInput = forwardRef<any>(({ value, onClick, onChange }: any, ref) => (
    <Input
      type="text"
      variant="outline"
      placeholder="Choisir un jour de la semaine, 9:00-15:00"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      value={value ? format(new Date(value), 'MMMM d, yyyy h:mm aa') : ''}
    />
  ));

  const filterWeekend = (date: Date) => {
    const day = !isWeekend(date);
    return day;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAppointmentValidationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
        setClosedRequest('');
        setContactPreference('');
        setDate(null);
      }}
    >
      {({ setFieldValue }) => (
        <Form data-testid="custom-form">
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="8" mb={8}>
            <Field name="theme">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.theme && form.touched.theme}>
                  <FormLabel htmlFor="theme">Thème de votre question</FormLabel>
                  <Select
                    {...field}
                    name="theme"
                    placeholder="---"
                    onChange={(e: any) => {
                      const { value } = e.target;
                      changeTheme(value);
                      setFieldValue('theme', value);
                    }}
                  >
                    {themes &&
                      themes.map((theme: Theme) => (
                        <option key={theme.id} value={theme.name}>
                          {theme.name}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>{form.errors.theme}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="subTheme">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.subTheme && form.touched.subTheme}>
                  <FormLabel htmlFor="subTheme">Sous thème de votre question</FormLabel>
                  <Select {...field} name="subTheme" placeholder="---">
                    {subThemes &&
                      subThemes.map((subTheme: SubTheme) => (
                        <option key={subTheme.id} value={subTheme.name}>
                          {subTheme.name}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>{form.errors.subTheme}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </SimpleGrid>

          <Box mb={8}>
            <Field name="closedRequest">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.closedRequest && form.touched.closedRequest}>
                  <FormLabel htmlFor="closedRequest">
                    Votre question concerne-t-elle une demande RH en cours ou cloturée ?
                  </FormLabel>
                  <Flex
                    d="flex"
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={{ base: 'initial', sm: 'center' }}
                  >
                    <Box width={{ base: '90%', sm: '50%' }} mb={{ base: 4, sm: 0 }}>
                      <RadioGroup
                        {...field}
                        name="closedRequest"
                        onChange={(request: string) => {
                          setClosedRequest(request);
                          setFieldValue('closedRequest', request);
                          setFieldValue('closedRequestId', '');
                        }}
                      >
                        <HStack>
                          <Radio
                            key="no"
                            value="Non"
                            isChecked={'Non' === closedRequest}
                            bg={form.errors.closedRequest && form.touched.closedRequest ? 'red.500' : 'transparent'}
                          >
                            Non
                          </Radio>
                          <Radio
                            key="yes"
                            value="Oui"
                            isChecked={'Oui' === closedRequest}
                            bg={form.errors.closedRequest && form.touched.closedRequest ? 'red.500' : 'transparent'}
                          >
                            Oui
                          </Radio>
                        </HStack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.closedRequest}</FormErrorMessage>
                    </Box>

                    <Box width={{ base: '100%', sm: '40%' }}>
                      <Field name="closedRequestId">
                        {({ field, form }: any) => (
                          <FormControl isInvalid={form.errors.closedRequestId && form.touched.closedRequestId}>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Préciser le n° de la demande"
                              isDisabled={closedRequest !== 'Oui'}
                            />
                            <FormErrorMessage>{form.errors.closedRequestId}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>

                  <FormHelperText>
                    Vous pouvez retrouver le numéro de votre demande RH depuis le portail RH, dans la rubrique mes
                    demandes.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Box mb={8}>
            <Field name="contactPreference">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.contactPreference && form.touched.contactPreference}>
                  <FormLabel htmlFor="contactPreference">Votre souhaitez être contacté sur :</FormLabel>
                  <Flex
                    d="flex"
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={{ base: 'initial', sm: 'center' }}
                  >
                    <Box width={{ base: '90%', sm: '50%' }} mb={{ base: 4, sm: 0 }}>
                      <RadioGroup
                        {...field}
                        name="contactPreference"
                        onChange={(contact: string) => {
                          setContactPreference(contact);
                          setFieldValue('contactPreference', contact);
                          setFieldValue('otherLinePhoneNumber', '');
                        }}
                      >
                        <HStack>
                          <Radio
                            key="proLine"
                            value="proLine"
                            isChecked={'proLine' === contactPreference}
                            bg={
                              form.errors.contactPreference && form.touched.contactPreference
                                ? 'red.500'
                                : 'transparent'
                            }
                          >
                            Votre ligne professionnelle
                          </Radio>
                          <Radio
                            key="otherLine"
                            value="otherLine"
                            isChecked={'otherLine' === contactPreference}
                            bg={
                              form.errors.contactPreference && form.touched.contactPreference
                                ? 'red.500'
                                : 'transparent'
                            }
                          >
                            Une autre ligne
                          </Radio>
                        </HStack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.contactPreference}</FormErrorMessage>
                    </Box>

                    <Box width={{ base: '90%', sm: '50%' }}>
                      <Field name="otherLinePhoneNumber">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.otherLinePhoneNumber && form.touched.otherLinePhoneNumber}
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none" children={<PhoneIcon color="gray.300" />} />
                              <Input
                                {...field}
                                type="tel"
                                placeholder="XX XX XX XX XX"
                                isDisabled={contactPreference !== 'otherLine'}
                              />
                            </InputGroup>
                            <FormErrorMessage>{form.errors.otherLinePhoneNumber}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>

                  <FormHelperText>
                    Le jour du rendez-vous, vous serez contacté sur cette ligne par l'expert RH en charge de votre
                    demande.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Stack mb={8}>
            <Field name="description">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.description && form.touched.description}>
                  <FormLabel htmlFor="description">Merci de préciser votre question :</FormLabel>
                  <Textarea {...field} name="description" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>

          <Box mb={8}>
            <Field name="date">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.date && form.touched.date}>
                  <FormLabel htmlFor="date">Choisissez votre créneau:</FormLabel>
                  <DatePicker
                    {...field}
                    name="date"
                    isClearable
                    showTimeSelect
                    timeIntervals={30}
                    selected={date}
                    filterDate={(d) => filterWeekend(d)}
                    minDate={new Date()}
                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                    maxTime={setHours(setMinutes(new Date(), 0), 15)}
                    onChange={(value: Date | null) => {
                      setDate(value);
                      setFieldValue('date', value ? formatISO(value) : null);
                    }}
                    customInput={<CustomCalendarInput />}
                  />
                  <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>

          <Button type="submit" colorScheme="whatsapp" isLoading={isSubmitting}>
            Prendre rendez-vous
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAppointment;
