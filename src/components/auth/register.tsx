import { useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Alert,
  useColorModeValue,
  AlertIcon,
  AlertDescription,
  InputGroup,
  InputRightElement,
  Text,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react';
import zxcvbn from 'zxcvbn';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm, useWatch } from 'react-hook-form';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { loginRequest } from '../../api/auth';
import { LoginFormData } from './types';
import { useAuthStore } from '../../stores/auth';
import { Logo } from '../../assets/logo';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkRut } from '../../utils/rut';
import PasswordStrengthBar from './PasswordStrength';

export default function Register() {
  const validationSchema = z
    .object({
      firstName: z.string().refine((value) => /^[a-z ,.'-]+$/i.test(value), {
        message: 'No pueden haber números, símbolos ni acentos.',
      }),
      lastName: z.string().refine((value) => /^[a-z ,.'-]+$/i.test(value), {
        message: 'No pueden haber números, símbolos ni acentos.',
      }),
      rut: z.string().refine((value) => checkRut(value), {
        message: 'Rut inválido, asegurese de poner el digito verificador.',
      }),
      email: z.string().email({ message: 'Email inválido.' }),
      password: z.string().refine((value) => zxcvbn(value).score >= 3),
      repeat_password: z.string(),
    })
    .refine((data) => data.password === data.repeat_password, {
      message: 'Las contraseñas no coinciden.',
      path: ['repeat_password'],
    });

  type SchemaProps = z.infer<typeof validationSchema>;

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({ resolver: zodResolver(validationSchema) });

  const password = useWatch({ control, name: 'password' });
  const onSubmit = async (values: LoginFormData) => { };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="xl" w="xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Regístrate</Heading>
          <Box width="100%">
            <Logo color="var(--chakra-colors-blue-600)" />
          </Box>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.600')}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Stack direction={['column', 'row']}>
                <Box w="100%">
                  <FormControl
                    isInvalid={Boolean(errors?.firstName?.message)}
                    id="firstName"
                    isRequired
                  >
                    <FormLabel>Nombres</FormLabel>
                    <Input
                      type="text"
                      placeholder="john trevor"
                      {...register('firstName')}
                    />
                    <FormErrorMessage>
                      {errors?.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w="100%">
                  <FormControl
                    isInvalid={Boolean(errors?.lastName?.message)}
                    id="lastName"
                    isRequired
                  >
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      type="text"
                      placeholder="doe smith"
                      {...register('lastName')}
                    />
                    <FormErrorMessage>
                      {errors?.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Stack>
              <FormControl isInvalid={Boolean(errors?.rut)} id="rut" isRequired>
                <FormLabel>RUT</FormLabel>
                <Input placeholder="12.456.789-k" {...register('rut')} />
                <FormErrorMessage>{errors?.rut?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.email)}
                id="email"
                isRequired
              >
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="jonhdoe@domino.cl"
                  type="email"
                  {...register('email')}
                />
                <FormErrorMessage>{errors?.rut?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors?.password)} id="password">
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="contraseña"
                    type={show ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputRightElement onClick={() => setShow(!show)}>
                    <Button>{show ? <ViewIcon /> : <ViewOffIcon />}</Button>
                  </InputRightElement>
                </InputGroup>{' '}
                <FormErrorMessage>
                  La contraseña debe ser al menos de nivel Fuerte.
                </FormErrorMessage>
                <PasswordStrengthBar
                  scoreWords={[
                    'Debil',
                    'Debil',
                    'Buena',
                    'Fuerte',
                    'Muy Fuerte',
                  ]}
                  shortScoreWord="Muy corta"
                  password={password}
                />
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors?.repeat_password)}
                id="repeat_password"
              >
                <FormLabel>Repita su contraseña</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="contraseña"
                    {...register('repeat_password')}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.repeat_password?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Stack spacing={2}>
                  {errors.root?.serverError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>
                        {errors.root?.serverError.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    variant="solid"
                    bg="blue.600"
                    color="white"
                    _hover={{
                      bg: 'blue.700',
                    }}
                  >
                    Sign in
                  </Button>
                  <Text>
                    Ya tienes una cuenta?{' '}
                    <ChakraLink
                      as={Link}
                      to="/auth/register"
                      color="blue.600"
                      style={{ textDecoration: 'underline' }}
                    >
                      Ingresa
                    </ChakraLink>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
