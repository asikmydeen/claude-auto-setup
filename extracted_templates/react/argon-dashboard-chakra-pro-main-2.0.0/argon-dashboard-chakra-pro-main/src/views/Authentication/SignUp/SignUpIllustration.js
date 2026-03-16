import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
  Heading,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/react";
// Assets
import illustration from "assets/img/illustration-auth.png";
import AuthIllustration from "layouts/AuthIllustration";

function SignUpIllustration() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.400", "white");
  const titleColor = useColorModeValue("blue.500", "blue.500");
  return (
    <AuthIllustration
      illustrationBackground='linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)'
      image={illustration}>
      <Flex
        w='100%'
        h='100%'
        alignItems='center'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "24vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={titleColor} fontSize='32px' mb='10px'>
            Sign Up
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColor}
            fontWeight='bold'
            fontSize={"sm"}>
            Enter your name, email and password to sign up
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "350px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Name
            </FormLabel>
            <Input
              variant='authSecondary'
              fontSize='sm'
              ms={{ base: "0px", md: "4px" }}
              type='text'
              placeholder='Your full name'
              mb='24px'
              size='lg'
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Name
            </FormLabel>
            <Input
              variant='authSecondary'
              fontSize='sm'
              ms={{ base: "0px", md: "4px" }}
              type='email'
              placeholder='Your full email address'
              mb='24px'
              size='lg'
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Password
            </FormLabel>
            <Input
              variant='authSecondary'
              fontSize='sm'
              ms={{ base: "0px", md: "4px" }}
              type='password'
              placeholder='Your password'
              mb='24px'
              size='lg'
            />
            <FormControl display='flex' alignItems='center' mb='24px'>
              <Switch id='remember-login' colorScheme='blue' me='10px' />
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                Remember me
              </FormLabel>
            </FormControl>
            <LightMode>
              <Button
                fontSize='10px'
                colorScheme='blue'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px'>
                SIGN IN
              </Button>
            </LightMode>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium'>
              Don’t have an account?
              <Link
                color={titleColor}
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'>
                Sign up
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </AuthIllustration>
  );
}

export default SignUpIllustration;
