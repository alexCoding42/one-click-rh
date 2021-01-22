import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInputs {
  questionTheme: string;
  subQuestionTheme: string;
  isRhRequestClosed: boolean;
  contactPreference: boolean;
  questionBody: string;
  inputHour: string;
}

const HomePage = () => {
  const { register, errors, formState, handleSubmit } = useForm<IFormInputs>();

  const [closeRhRequestValue, setCloseRhRequestValue] = useState<string>('');
  const [contactValue, setContactValue] = useState<string>('');
  const [hourValue, setHourValue] = useState<string>('');

  const hourOptions = [
    '9:30',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '12:15',
    '12:30',
    '12:45',
  ];

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  const isRequired = (value: string) => {
    if (!value) {
      return 'This field is required';
    } else return true;
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <HStack>
              <Box mb={8}>
                <FormControl
                  id='questionTheme'
                  isInvalid={!!errors.questionTheme}
                >
                  <FormLabel>Thème de votre question</FormLabel>
                  <Select
                    name='questionTheme'
                    placeholder='---'
                    ref={register({ validate: isRequired })}
                  >
                    <option value='option1'>Accident du travail</option>
                    <option value='option2'>Acompte sur salaire</option>
                    <option value='option3'>
                      Allocations enfants (vacances, étude, frais de garde,
                      handicap)
                    </option>
                  </Select>
                  <FormErrorMessage>
                    {errors.questionTheme && errors.questionTheme.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box mb={8}>
                <FormControl
                  id='subQuestionTheme'
                  isInvalid={!!errors.subQuestionTheme}
                >
                  <FormLabel>Sous thème de votre question</FormLabel>
                  <Select
                    name='subQuestionTheme'
                    placeholder='---'
                    ref={register({ validate: isRequired })}
                  >
                    <option value='option1'>Accident du travail</option>
                    <option value='option2'>
                      Demander un acompte sur salaire
                    </option>
                    <option value='option3'>
                      Déclarer mes enfants à charge
                    </option>
                    <option value='option4'>
                      Déclarer mon changement de modalités de garde
                    </option>
                    <option value='option5'>Enfant handicapé</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.subQuestionTheme && errors.subQuestionTheme.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
          </Box>
          <Box mb={8}>
            <FormControl
              id='isRhRequestClosed'
              isInvalid={!!errors.isRhRequestClosed}
            >
              <FormLabel>
                Votre question concerne-t-elle une demande RH en cours ou
                cloturée ?
              </FormLabel>
              <RadioGroup
                name='isRhRequestClosed'
                onChange={(value: string) => setCloseRhRequestValue(value)}
                value={closeRhRequestValue}
              >
                <HStack>
                  <Radio
                    value='0'
                    ref={register({ validate: isRequired })}
                    isChecked={'0' === closeRhRequestValue}
                  >
                    Non
                  </Radio>
                  <Radio
                    value='1'
                    ref={register({ validate: isRequired })}
                    isChecked={'1' === closeRhRequestValue}
                  >
                    Oui
                  </Radio>
                </HStack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.isRhRequestClosed && errors.isRhRequestClosed.message}
              </FormErrorMessage>
            </FormControl>
            <Text color='gray.400' as='i'>
              Vous pouvez retrouver le numéro de votre demande RH depuis le
              portail RH, dans la rubrique mes demandes.
            </Text>
          </Box>
          <Box mb={8}>
            <FormControl
              id='contactPreference'
              isInvalid={!!errors.contactPreference}
            >
              <FormLabel>Votre souhaitez être contacté sur :</FormLabel>
              <RadioGroup
                name='contactPreference'
                onChange={(value: string) => setContactValue(value)}
                value={contactValue}
              >
                <HStack>
                  <Radio
                    value='0'
                    ref={register({ validate: isRequired })}
                    isChecked={'0' === contactValue}
                  >
                    Votre ligne professionnelle
                  </Radio>
                  <Radio
                    value='1'
                    ref={register({ validate: isRequired })}
                    isChecked={'1' === contactValue}
                  >
                    Une autre ligne
                  </Radio>
                </HStack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.contactPreference && errors.contactPreference.message}
              </FormErrorMessage>
            </FormControl>
            <Text color='gray.400' as='i'>
              Le jour du rendez-vous, vous serez contacté sur cette ligne par
              l'expert RH en charge de votre demande.
            </Text>
          </Box>
          <Box mb={8}>
            <FormControl isInvalid={!!errors.questionBody}>
              <FormLabel>Merci de préciser votre question :</FormLabel>
              <Textarea
                name='questionBody'
                ref={register({ validate: isRequired })}
              />
              <FormErrorMessage>
                {errors.questionBody && errors.questionBody.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box mb={4}>
            <FormControl id='inputHour' isInvalid={!!errors.inputHour}>
              <FormLabel>Choisissez votre créneau :</FormLabel>
              <RadioGroup
                name='inputHour'
                onChange={(value: string) => setHourValue(value)}
                value={hourValue}
              >
                <HStack spacing={4} direction='column'>
                  {hourOptions.map((value, index) => {
                    return (
                      <Radio
                        key={index}
                        value={value}
                        ref={register({ validate: isRequired })}
                        isChecked={value === hourValue}
                      >
                        {value}
                      </Radio>
                    );
                  })}
                </HStack>
              </RadioGroup>

              <FormErrorMessage>
                {errors.inputHour && errors.inputHour.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box mb={4}>
            <Button
              type='submit'
              colorScheme='blue'
              isLoading={formState.isSubmitting}
            >
              Prendre rendez-vous
            </Button>
          </Box>
        </form>
      </Flex>
    </Container>
  );
};

export default HomePage;
