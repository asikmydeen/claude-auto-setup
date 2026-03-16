import {
  Button,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarHelpImage from "assets/img/SidebarHelpImage.png";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useContext } from "react";

export default function SidebarDocs({ landing }) {

  const textColor = useColorModeValue("gray.700", "white");

  const { sidebarWidth } = useContext(SidebarContext);

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'


      display={sidebarWidth !== 275 && "none"}
    >
      <Image src={SidebarHelpImage} w='165px' ms="24px" />
      <Flex direction='column' align="center" textAlign='center' mb="12px" me="24px">
        <Text fontSize='14px' color={landing ? "white" : textColor} fontWeight='bold'>
          Need help?
        </Text>
        <Text fontSize='12px' color={landing ? "white" : 'gray.500'}>
          Please check our docs.
        </Text>
      </Flex>
      <Link href='#' >
        <Button variant={landing ? "light" : 'primary'} mb={{ sm: "12px", xl: "16px" }} color={landing && "blue.500"} fontWeight="bold" minW="185px" ms="24px">
          DOCUMENTATION
        </Button>
      </Link>
    </Flex>
  );
}