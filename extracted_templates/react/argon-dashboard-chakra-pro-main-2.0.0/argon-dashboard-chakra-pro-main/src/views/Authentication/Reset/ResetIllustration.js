import React from "react";
// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/react";
// Assets
import illustration from "assets/img/illustration-auth.png";
import AuthIllustration from "layouts/AuthIllustration";

function ResetIllustration() {
  // Chakra color mode
  const textColor = useColorModeValue("blue.500", "blue.500");
  return (
    <AuthIllustration
      illustrationBackground='linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)'
      image={illustration}>
      <Flex
        w='100%'
        h='100%'
        alignItems='start'
        justifyContent='start'
        mb={{ base: "0px", md: "60px" }}
        mt={{ base: "60px", md: "34vh" }}>
        <Flex
          zIndex='2'
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          pe={{ base: "0px", md: "80px" }}
          mx={{ base: "20px", md: "0px" }}
          mb={{ base: "20px", md: "auto" }}>
          <Text
            fontWeight='bold'
            color={textColor}
            mb='10px'
            fontSize={{ base: "3xl", md: "4xl" }}>
            Reset password
          </Text>
          <Text fontWeight='regular' color='gray.400' mb='35px'>
            You will receive an e-mail in maximum 60 seconds.
          </Text>
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Email
            </FormLabel>
            <Input
              variant='main'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Your email address'
              mb='24px'
              size='lg'
            />
            <LightMode>
              <Button
                fontSize='10px'
                colorScheme='blue'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px'>
                SEND
              </Button>
            </LightMode>
          </FormControl>
        </Flex>
      </Flex>
    </AuthIllustration>
  );
}

export default ResetIllustration;
