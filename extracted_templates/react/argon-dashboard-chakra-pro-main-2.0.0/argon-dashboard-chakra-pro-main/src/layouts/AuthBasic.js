import PropTypes from 'prop-types';
import React from 'react'; // Chakra imports
import { Box, Flex, Text } from '@chakra-ui/react';

function AuthBasic(props) {
  const { children, title, description, image, ...rest } = props;
  return (
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'
    >
      <Box
        position='absolute'
        minH={{ base: '70vh', md: '50vh' }}
        maxH={{ base: '70vh', md: '50vh' }}
        w={{ md: 'calc(100vw - 50px)' }}
        maxW={{ md: 'calc(100vw - 50px)' }}
        left='0'
        right='0'
        bgRepeat='no-repeat'
        overflow='hidden'
        zIndex='-1'
        top='0'
        bgImage={image}
        bgSize='cover'
        mx={{ md: 'auto' }}
        mt={{ md: '14px' }}
        borderRadius={{ base: '0px', md: '20px' }}
      >
        <Box w='100vw' h='100vh' bg='blue.500' opacity='0.8'></Box>
      </Box>
      {title && description ? (
        <Flex
          direction='column'
          textAlign='center'
          justifyContent='center'
          align='center'
          mt='125px'
          mb='30px'
        >
          <Text fontSize='4xl' color='white' fontWeight='bold'>
            {title}
          </Text>
          <Text
            fontSize='md'
            color='white'
            fontWeight='normal'
            mt='10px'
            mb='26px'
            w={{ base: '90%', sm: '60%', lg: '40%', xl: '333px' }}
          >
            {description}
          </Text>
        </Flex>
      ) : null}
      {children}
    </Flex>
  );
}
// PROPS

export default AuthBasic;
