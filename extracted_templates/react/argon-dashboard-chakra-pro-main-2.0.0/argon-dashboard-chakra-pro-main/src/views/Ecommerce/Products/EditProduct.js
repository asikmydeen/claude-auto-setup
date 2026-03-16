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

import React, { useState } from 'react';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import productImage1 from 'assets/img/product-page-1.png';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Editor from 'components/Editor/Editor';

function EditProduct() {
  const [skills, setSkills] = useState([
    {
      name: 'chakra-ui',
      id: 1,
    },
    {
      name: 'react',
      id: 2,
    },
    {
      name: 'javascript',
      id: 3,
    },
  ]);

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setSkills([
        ...skills,
        {
          name: e.target.value,
          id: skills.length === 0 ? 1 : skills[skills.length - 1].id + 1,
        },
      ]);
      e.target.value = '';
    }
  };

  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
      <Flex
        direction={{ sm: 'column', lg: 'row' }}
        justify='space-between'
        align={{ lg: 'center' }}
        w='100%'
        mb={{ sm: '24px', lg: '55px' }}
      >
        <Flex direction='column'>
          <Text
            color='white'
            ms='12px'
            fontSize={{ sm: 'xl', md: '2xl' }}
            fontWeight='bold'
            mb='10px'
          >
            Make the changes below
          </Text>
          <Text
            fontSize='sm'
            color='white'
            ms='12px'
            fontWeight='normal'
            mb={{ sm: '16px', lg: '0px' }}
          >
            We’re constantly trying to express ourselves and actualize our
            dreams. If you have the opportunity to play.
          </Text>
        </Flex>
      </Flex>
      <Grid templateColumns={{ sm: '1fr', lg: '1fr 1.7fr' }} gap='24px'>
        <Stack direction='column' spacing='24px'>
          <Card>
            <CardHeader mb='42px'>
              <Text color={textColor} fontSize='lg' fontWeight='bold'>
                Product Image
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                <Box
                  w={{ sm: '280px', md: '670px', lg: '600px' }}
                  h={{ sm: '185px', md: '450px', lg: '400px' }}
                  maxW={{ sm: '280px', md: '670px', lg: '600px' }}
                  maxH={{ sm: '185px', md: '450px', lg: '400px' }}
                  mb='24px'
                >
                  <Image src={productImage1} w='100%' h='100%' />
                </Box>
                <Flex mt='40px'>
                  <Button
                    variant='no-effects'
                    bg='gray.700'
                    w={{ sm: '75px', md: '100px' }}
                    h='35px'
                    me='12px'
                  >
                    <Text fontSize='xs' color='#fff' fontWeight='bold'>
                      EDIT
                    </Text>
                  </Button>
                  <Button
                    variant='no-effects'
                    bg='gray.100'
                    w={{ sm: '75px', md: '100px' }}
                    h='35px'
                  >
                    <Text fontSize='xs' color='gray.700' fontWeight='bold'>
                      REMOVE
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card>
            <CardHeader mb='32px'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Socials
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction='column' spacing='20px' w='100%'>
                <FormControl>
                  <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                    Shopify Handle
                  </FormLabel>
                  <Input variant='main' placeholder='@Argon' fontSize='xs' />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                    Facebook Account
                  </FormLabel>
                  <Input variant='main' placeholder='https://' fontSize='xs' />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                    Instagram Account
                  </FormLabel>
                  <Input variant='main' placeholder='https://' fontSize='xs' />
                </FormControl>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Stack direction='column' spacing='24px'>
          <Card>
            <CardHeader mb='22px'>
              <Text color={textColor} fontSize='lg' fontWeight='bold'>
                Product Information
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction='column' spacing='20px' w='100%'>
                <Stack direction={{ sm: 'column', md: 'row' }} spacing='30px'>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Product Name
                    </FormLabel>
                    <Input
                      variant='main'
                      placeholder='eg. Modern Luxury Sofa'
                      fontSize='xs'
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Weight
                    </FormLabel>
                    <Input variant='main' placeholder='eg. 42' fontSize='xs' />
                  </FormControl>
                </Stack>
                <Stack direction={{ sm: 'column', lg: 'row' }} spacing='30px'>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Description
                    </FormLabel>
                    <Editor />
                  </FormControl>
                  <Stack direction='column' spacing='20px' w='100%'>
                    <FormControl>
                      <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                        Category
                      </FormLabel>
                      <Select
                        variant='main'
                        fontSize='xs'
                        defaultValue={0}
                        color='gray.400'
                      >
                        <option>Electronics</option>
                        <option>Clothing</option>
                        <option>Real Estate</option>
                        <option>Others</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                        Color
                      </FormLabel>
                      <Select
                        variant='main'
                        fontSize='xs'
                        defaultValue={0}
                        color='gray.400'
                      >
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Black</option>
                        <option>White</option>
                        <option>Pink</option>
                        <option>Orange</option>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
                <Stack direction={{ sm: 'column', md: 'row' }} spacing='30px'>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Collection
                    </FormLabel>
                    <Input
                      variant='main'
                      placeholder='eg. Summer'
                      fontSize='xs'
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Quantity
                    </FormLabel>
                    <NumberInput
                      variant='main'
                      defaultValue={1}
                      min={1}
                      max={20}
                      color='gray.400'
                      fontSize='xs'
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader mb='32px'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Pricing
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction='column' spacing='20px' w='100%'>
                <Stack direction='row' spacing='24px'>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Price
                    </FormLabel>
                    <Input
                      variant='main'
                      placeholder='eg. $99.99'
                      fontSize='xs'
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      Currency
                    </FormLabel>
                    <Select
                      variant='main'
                      fontSize='xs'
                      defaultValue={0}
                      color='gray.400'
                    >
                      <option>EUR</option>
                      <option>CNY</option>
                      <option>RON</option>
                      <option>GBP</option>
                      <option>INR</option>
                      <option>CZH</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                      SKU
                    </FormLabel>
                    <Input
                      variant='main'
                      placeholder='71283476591'
                      fontSize='xs'
                    />
                  </FormControl>
                </Stack>
                <FormControl>
                  <FormLabel fontWeight='bold' fontSize='xs' mb='10px'>
                    Tags
                  </FormLabel>
                  <Flex
                    direction='row'
                    p='12px'
                    wrap='wrap'
                    bg={useColorModeValue('none', 'navy.900')}
                    border={useColorModeValue('1px solid #E2E8F0', 'none')}
                    borderRadius='8px'
                    _focus={{ borderColor: 'teal.300' }}
                    minH='40px'
                    cursor='text'
                  >
                    {skills.map((skill, index) => {
                      return (
                        <Tag
                          fontSize='xs'
                          h='25px'
                          mb='6px'
                          me='6px'
                          key={skill.id}
                          borderRadius='12px'
                          variant='solid'
                          bg='gray.700'
                        >
                          <TagLabel w='100%'>{skill.name}</TagLabel>
                          <TagCloseButton
                            justifySelf='flex-end'
                            color='white'
                            onClick={() =>
                              setSkills([
                                ...skills.filter(
                                  (element) => element.id !== skill.id
                                ),
                              ])
                            }
                          />
                        </Tag>
                      );
                    })}
                    <Input
                      variant='main'
                      border='none'
                      _focus={{}}
                      p='0px'
                      onKeyDown={(e) => keyPress(e)}
                      fontSize='xs'
                    />
                  </Flex>
                </FormControl>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='22px'>
                Product Images
              </Text>
            </CardHeader>
            <CardBody>
              <Flex
                align='center'
                justify='center'
                bg={useColorModeValue('none', 'navy.900')}
                border={useColorModeValue('1px dashed #E2E8F0', 'none')}
                borderRadius='15px'
                w='100%'
                minH='130px'
                cursor='pointer'
              >
                <Button variant='no-effects'>
                  <Text color='gray.400' fontWeight='normal'>
                    Drop files here to upload
                  </Text>
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
    </Flex>
  );
}

export default EditProduct;
