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

import React from "react";
import PropTypes from "prop-types";
// Chakra imports
import { Box, Flex, Image } from "@chakra-ui/react";

function AuthIllustration(props) {
  const { children, illustrationBackground, image, ...rest } = props;
  // Chakra color mode
  return (
    <Flex position="relative" mb="70px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="40px"
        pt={{ sm: "100px", md: "0px" }}
      >
        {children}
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w={{ lg: "50vw", "2xl": "50vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={illustrationBackground}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          >
            <Image
              boxSize={{ lg: "500px", xl: "600px", "2xl": "790px" }}
              src={image}
              alt="illustration"
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
