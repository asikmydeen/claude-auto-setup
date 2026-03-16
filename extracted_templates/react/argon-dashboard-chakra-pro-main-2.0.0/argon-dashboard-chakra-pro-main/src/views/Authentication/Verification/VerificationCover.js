/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Button,
  Flex,
  Link,
  Icon,
  FormControl,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { PinInputLight } from "components/PinInput/PinInput";
import { IoIosRocket } from "react-icons/io";
import CoverImage from "assets/img/CoverImage.png";
import React from "react";
import AuthCover from "layouts/AuthCover";

function LockCover() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  return (
    <AuthCover image={CoverImage}>
      <Flex
        zIndex="2"
        direction="column"
        w="445px"
        background="transparent"
        borderRadius="15px"
        p="40px"
        mx={{ base: "20px", md: "auto" }}
        mb={{ base: "20px", md: "auto" }}
        bg={bgForm}
        boxShadow={useColorModeValue(
          "0px 5px 14px rgba(0, 0, 0, 0.05)",
          "unset"
        )}
        mt="25vh"
      >
        <Flex
          mx="auto"
          borderRadius="50%"
          bg="blue.500"
          w={{ base: "100px" }}
          h={{ base: "100px" }}
          justify="center"
          align="center"
          mb="30px"
        >
          <Icon as={IoIosRocket} color="white" w="36px" h="36px" />
        </Flex>
        <Text
          fontWeight="bold"
          color={textColor}
          textAlign="center"
          mb="10px"
          fontSize={{ base: "3xl", md: "4xl" }}
        >
          2-Step Verification
        </Text>
        <FormControl>
          <Flex justify="center" align="center" mx="auto" mb="30px">
            <PinInputLight />
          </Flex>
          <Button
            fontSize="10px"
            variant="dark"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
          >
            UNLOCK
          </Button>
        </FormControl>
        <Text color="gray.400" fontWeight="400" textAlign="center">
          Haven't received it?{" "}
          <Link color={textColor} as="span" fontWeight="700">
            Resend a new code.
          </Link>
        </Text>
      </Flex>
    </AuthCover>
  );
}

export default LockCover;
