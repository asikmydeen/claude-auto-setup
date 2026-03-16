import React from "react";
import PropTypes from "prop-types";
// Chakra imports
import { Box, Flex } from "@chakra-ui/react";

function AuthCover(props) {
  const { children, image, ...rest } = props;
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        minH={{ md: "950px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'>
        {children}
        <Box
          overflowX='hidden'
          h={{ base: "100%", lg: "100%" }}
          w='100%'
          left='0px'
          position='absolute'
          bgImage={image}>
          <Box
            w='100%'
            h='100%'
            bgSize='cover'
            bg='blue.500'
            opacity='0.8'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}
// PROPS

AuthCover.propTypes = {
  image: PropTypes.any,
};
export default AuthCover;
