import React from "react";
// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  Link,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import illustration from "assets/img/illustration-auth.png";
import AuthIllustration from "layouts/AuthIllustration";
import { PinInputDark } from "components/PinInput/PinInput";
import { IoIosRocket } from "react-icons/io";

function LockIllustration() {
  // Chakra color mode
  const textColor = useColorModeValue("blue.500", "blue.500");
  const inputBg = useColorModeValue(
    { background: "white !important" },
    { background: "red !important" }
  );
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
        mt={{ base: "60px", md: "30vh" }}>
        <Flex
          zIndex='2'
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          pe={{ base: "0px", md: "80px" }}
          mx={{ base: "20px", md: "0px" }}
          mb={{ base: "20px", md: "auto" }}>
          <Flex
            mx={{ base: "auto", md: "0px" }}
            borderRadius='50%'
            bg='blue.500'
            w={{ base: "100px" }}
            h={{ base: "100px" }}
            justify='center'
            align='center'
            mb='30px'>
            <Icon as={IoIosRocket} color='white' w='36px' h='36px' />
          </Flex>
          <Text
            fontWeight='bold'
            color={textColor}
            textAlign='start'
            mb='10px'
            fontSize={{ base: "3xl", md: "4xl" }}>
            2-Step Verification
          </Text>
          <FormControl>
            <Flex mx={{ base: "auto", md: "0px" }} mb='30px'>
              <PinInputDark />
            </Flex>
            <Button
              fontSize='10px'
              variant='dark'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'>
              UNLOCK
            </Button>
          </FormControl>
          <Text
            color='gray.400'
            fontWeight='400'
            textAlign={{ base: "center", md: "start" }}>
            Haven't received it?{" "}
            <Link color={textColor} as='span' fontWeight='700'>
              Resend a new code.
            </Link>
          </Text>
        </Flex>
      </Flex>
    </AuthIllustration>
  );
}

export default LockIllustration;
