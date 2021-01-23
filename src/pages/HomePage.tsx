import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { hourOptions, themesAndSubthemes } from '../data';

interface IFormInputs {
  theme: string;
  subTheme: string;
  closedRequest: string;
  contactPreference: string;
  precision: string;
  hour: string;
}

const initialValues: IFormInputs = {
  theme: '',
  subTheme: '',
  closedRequest: '',
  contactPreference: '',
  precision: '',
  hour: '',
};

const fieldRequired: string = 'Ce champ est obligatoire.';

const formSchema = Yup.object().shape({
  theme: Yup.string().required(fieldRequired),
  subTheme: Yup.string().required(fieldRequired),
  closedRequest: Yup.string().required(fieldRequired),
  contactPreference: Yup.string().required(fieldRequired),
  precision: Yup.string().required(fieldRequired),
  hour: Yup.string().required(fieldRequired),
});

const HomePage = () => {
  const [closedRequest, setClosedRequest] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);
  const [subThemes, setSubThemes] = useState<any[]>([]);
  const [theme, setTheme] = useState<string | null>(null);

  const handleChangeSubTheme = (theme: string) => {
    setTheme(theme.toUpperCase());
  };

  const onSubmit = (values: IFormInputs) => {
    console.log(values);
  };

  useEffect(() => {
    if (themesAndSubthemes) {
      const themesData = Object.entries(themesAndSubthemes).map(
        (theme: any) => theme[0]
      );
      setThemes(themesData);
    }

    if (theme) {
      const subThemesData = Object.entries(themesAndSubthemes).filter(
        (subTheme: any) => subTheme[0] === theme
      );

      if (subThemesData) {
        setSubThemes(subThemesData[0][1]);
      }
    } else {
      setSubThemes([]);
    }
  }, [theme]);

  return (
    <Container maxW='6xl'>
      <Flex direction='column'>
        <Box mb={8}>
          <Center>
            <Text
              bgGradient='linear(to-l, #7928CA,#FF0080)'
              bgClip='text'
              fontSize='2xl'
              fontWeight='extrabold'
            >
              Prenez un rendez-vous téléphonique au Click et Kiosque RH
            </Text>
          </Center>
          <Center>
            <Text color='gray.500' fontWeight='bold'>
              Les experts de l'administration et de la paie vous répondent
            </Text>
          </Center>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              onSubmit(values);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ isSubmitting, isValid, setFieldValue }) => (
            <Form>
              <HStack mb={8}>
                <Field name='theme'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.theme && form.touched.theme}
                    >
                      <FormLabel htmlFor='theme'>
                        Thème de votre question
                      </FormLabel>
                      <Select
                        {...field}
                        name='theme'
                        placeholder='---'
                        onChange={(e: any) => {
                          const { value } = e.target;
                          handleChangeSubTheme(value);
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
                      <FormErrorMessage>
                        {form.errors.subTheme}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>

              <Stack mb={8}>
                <Field name='closedRequest'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.closedRequest && form.touched.closedRequest
                      }
                    >
                      <FormLabel>
                        Votre question concerne-t-elle une demande RH en cours
                        ou cloturée ?
                      </FormLabel>
                      <RadioGroup
                        {...field}
                        name='closedRequest'
                        onChange={(request: string) => {
                          setClosedRequest(request);
                          setFieldValue('closedRequest', request);
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
                      <FormHelperText>
                        Vous pouvez retrouver le numéro de votre demande RH
                        depuis le portail RH, dans la rubrique mes demandes.
                      </FormHelperText>
                      <FormErrorMessage>
                        {form.errors.closedRequest}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack mb={8}>
                <Field name='contactPreference'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.contactPreference &&
                        form.touched.contactPreference
                      }
                    >
                      <FormLabel>Votre souhaitez être contacté sur :</FormLabel>
                      <RadioGroup
                        {...field}
                        name='contactPreference'
                        onChange={(contact: string) => {
                          setContactPreference(contact);
                          setFieldValue('contactPreference', contact);
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
                      <FormHelperText>
                        Le jour du rendez-vous, vous serez contacté sur cette
                        ligne par l'expert RH en charge de votre demande.
                      </FormHelperText>
                      <FormErrorMessage>
                        {form.errors.contactPreference}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack mb={8}>
                <Field name='precision'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.precision && form.touched.precision
                      }
                    >
                      <FormLabel htmlFor='precision'>
                        Merci de préciser votre question :
                      </FormLabel>
                      <Textarea {...field} name='precision' />
                      <FormErrorMessage>
                        {form.errors.precision}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack mb={8}>
                <Field name='hour'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.hour && form.touched.hour}
                    >
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

              <Button
                type='submit'
                colorScheme='blue'
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                Prendre rendez-vous
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Container>
  );
};

export default HomePage;
