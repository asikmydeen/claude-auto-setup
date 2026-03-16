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

import React, { useReducer, useRef, useState } from 'react';
// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorMode,
  useColorModeValue,
  LightMode,
} from '@chakra-ui/react';
// Assets
import avatar5 from 'assets/img/avatars/avatar5.png';
import { BsCircleFill } from 'react-icons/bs';
import { FaCube, FaPenFancy } from 'react-icons/fa';
import { IoDocumentsSharp } from 'react-icons/io5';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Editor from 'components/Editor/Editor';
import { useDropzone } from 'react-dropzone';

const reducer = (state, action) => {
  if (action.type === 'SWITCH_ACTIVE') {
    if (action.payload === 'overview') {
      const newState = {
        overview: true,
        teams: false,
        projects: false,
      };
      return newState;
    } else if (action.payload === 'teams') {
      const newState = {
        overview: false,
        teams: true,
        projects: false,
      };
      return newState;
    } else if (action.payload === 'projects') {
      const newState = {
        overview: false,
        teams: false,
        projects: true,
      };
      return newState;
    }
  }
  return state;
};

function NewProduct() {
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

  const [state, dispatch] = useReducer(reducer, {
    overview: true,
    teams: false,
    projects: false,
  });

  const [activeBullets, setActiveBullets] = useState({
    productInfo: true,
    media: false,
    socials: false,
    pricing: false,
  });

  const productInfoTab = useRef();
  const mediaTab = useRef();
  const socialsTab = useRef();
  const pricingTab = useRef();

  const { getRootProps, getInputProps } = useDropzone();

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
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');
  const bgProfile = useColorModeValue('hsla(0,0%,100%,.8)', 'navy.800');
  const borderProfileColor = useColorModeValue('white', 'transparent');
  const bgPrevButton = 'gray.100';

  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px', lg: '100px' }}>
      <Flex
        direction={{ sm: 'column', md: 'row' }}
        mb='24px'
        maxH='330px'
        justifyContent={{ sm: 'center', md: 'space-between' }}
        align='center'
        backdropFilter='blur(21px)'
        boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
        border='1.5px solid'
        borderColor={borderProfileColor}
        bg={bgProfile}
        p='24px'
        borderRadius='20px'
      >
        <Flex
          align='center'
          mb={{ sm: '10px', md: '0px' }}
          direction={{ sm: 'column', md: 'row' }}
          w={{ sm: '100%' }}
          textAlign={{ sm: 'center', md: 'start' }}
        >
          <Avatar
            me={{ md: '22px' }}
            src={avatar5}
            w='80px'
            h='80px'
            borderRadius='15px'
          />
          <Flex direction='column' maxWidth='100%' my={{ sm: '14px' }}>
            <Text
              fontSize={{ sm: 'lg', lg: 'xl' }}
              color={textColor}
              fontWeight='bold'
              ms={{ sm: '8px', md: '0px' }}
            >
              Alec Thompson
            </Text>
            <Text fontSize={{ sm: 'sm', md: 'md' }} color='gray.400'>
              alec@simmmple.com
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: 'column', lg: 'row' }}
          w={{ sm: '100%', md: '50%', lg: 'auto' }}
        >
          <Button p='0px' bg='transparent' variant='no-effects'>
            <Flex
              align='center'
              w={{ sm: '100%', lg: '135px' }}
              bg={
                state.overview
                  ? colorMode === 'dark'
                    ? 'navy.900'
                    : '#fff'
                  : null
              }
              borderRadius='8px'
              justifyContent='center'
              py='10px'
              boxShadow={
                state.overview ? '0px 2px 5.5px rgba(0, 0, 0, 0.06)' : null
              }
              cursor='pointer'
              transition='all .5s ease'
              onClick={() =>
                dispatch({ type: 'SWITCH_ACTIVE', payload: 'overview' })
              }
            >
              <Icon color={textColor} as={FaCube} me='6px' />
              <Text fontSize='xs' color={textColor} fontWeight='bold'>
                OVERVIEW
              </Text>
            </Flex>
          </Button>
          <Button p='0px' bg='transparent' variant='no-effects'>
            <Flex
              align='center'
              w={{ lg: '135px' }}
              borderRadius='8px'
              justifyContent='center'
              py='10px'
              mx={{ lg: '1rem' }}
              cursor='pointer'
              boxShadow={
                state.teams ? '0px 2px 5.5px rgba(0, 0, 0, 0.06)' : null
              }
              bg={
                state.teams
                  ? colorMode === 'dark'
                    ? 'navy.900'
                    : '#fff'
                  : null
              }
              transition='all .5s ease'
              onClick={() =>
                dispatch({ type: 'SWITCH_ACTIVE', payload: 'teams' })
              }
            >
              <Icon color={textColor} as={IoDocumentsSharp} me='6px' />
              <Text fontSize='xs' color={textColor} fontWeight='bold'>
                TEAMS
              </Text>
            </Flex>
          </Button>
          <Button p='0px' bg='transparent' variant='no-effects'>
            <Flex
              align='center'
              w={{ lg: '135px' }}
              borderRadius='8px'
              justifyContent='center'
              py='10px'
              cursor='pointer'
              boxShadow={
                state.projects ? '0px 2px 5.5px rgba(0, 0, 0, 0.06)' : null
              }
              bg={
                state.projects
                  ? colorMode === 'dark'
                    ? 'navy.900'
                    : '#fff'
                  : null
              }
              transition='all .5s ease'
              onClick={() =>
                dispatch({ type: 'SWITCH_ACTIVE', payload: 'projects' })
              }
            >
              <Icon color={textColor} as={FaPenFancy} me='6px' />
              <Text fontSize='xs' color={textColor} fontWeight='bold'>
                PROJECTS
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      <Tabs variant='unstyled' mt='24px' alignSelf='center'>
        <TabList display='flex' align='center'>
          <Tab
            ref={productInfoTab}
            _focus={{}}
            w={{ sm: '80px', md: '200px' }}
            onClick={() =>
              setActiveBullets({
                productInfo: true,
                media: false,
                socials: false,
                pricing: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '80px', md: '200px' },
                height: '3px',
                bg: activeBullets.media ? 'white' : 'blue.300',
                left: { sm: '12px', md: '52px' },
                top: {
                  sm: activeBullets.productInfo ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.productInfo ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.productInfo ? 'white' : 'blue.300'}
                w={activeBullets.productInfo ? '16px' : '12px'}
                h={activeBullets.productInfo ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.productInfo ? 'white' : 'gray.300'}
                fontWeight={activeBullets.productInfo ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                1. Product Info
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={mediaTab}
            _focus={{}}
            w={{ sm: '80px', md: '200px' }}
            onClick={() =>
              setActiveBullets({
                productInfo: true,
                media: true,
                socials: false,
                pricing: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '80px', md: '200px' },
                height: '3px',
                bg: activeBullets.socials ? 'white' : 'blue.300',
                left: { sm: '12px', md: '32px' },
                top: {
                  sm: activeBullets.media ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.media ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.media ? 'white' : 'blue.300'}
                w={activeBullets.media ? '16px' : '12px'}
                h={activeBullets.media ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.media ? 'white' : 'gray.300'}
                fontWeight={activeBullets.media ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                2. Media
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={socialsTab}
            _focus={{}}
            w={{ sm: '80px', md: '200px' }}
            onClick={() =>
              setActiveBullets({
                productInfo: true,
                media: true,
                socials: true,
                pricing: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '80px', md: '200px' },
                height: '3px',
                bg: activeBullets.pricing ? 'white' : 'blue.300',
                left: { sm: '12px', md: '32px' },
                top: {
                  sm: activeBullets.socials ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.socials ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.socials ? 'white' : 'blue.300'}
                w={activeBullets.socials ? '16px' : '12px'}
                h={activeBullets.socials ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.socials ? 'white' : 'gray.300'}
                fontWeight={activeBullets.socials ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                3. Socials
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={pricingTab}
            _focus={{}}
            w={{ sm: '80px', md: '200px' }}
            onClick={() =>
              setActiveBullets({
                productInfo: true,
                media: true,
                socials: true,
                pricing: true,
              })
            }
          >
            <Flex direction='column' justify='center' align='center'>
              <Icon
                zIndex='1'
                as={BsCircleFill}
                color={activeBullets.pricing ? 'white' : 'blue.300'}
                w={activeBullets.pricing ? '16px' : '12px'}
                h={activeBullets.pricing ? '16px' : '12px'}
                mb='8px'
              />
              <Text
                color={activeBullets.pricing ? 'white' : 'gray.300'}
                fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                4. Pricing
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt='24px' maxW={{ md: '90%', lg: '100%' }} mx='auto'>
          <TabPanel>
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
                      <Input
                        variant='main'
                        placeholder='eg. 42'
                        fontSize='xs'
                      />
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
                          placeholder='Furniture'
                          color='gray.400'
                          defaultValue={0}
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
                          placeholder='Green'
                          color='gray.400'
                          defaultValue={0}
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
                      >
                        <NumberInputField fontSize='xs' />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Stack>
                  <LightMode>
                    <Button
                      variant='dark'
                      alignSelf='flex-end'
                      mt='24px'
                      w='100px'
                      h='35px'
                      onClick={() => mediaTab.current.click()}
                    >
                      <Text fontSize='xs' color='#fff' fontWeight='bold'>
                        NEXT
                      </Text>
                    </Button>
                  </LightMode>
                </Stack>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb='40px'>
                <Text
                  color={textColor}
                  fontSize='xl'
                  fontWeight='bold'
                  mb='3px'
                >
                  Media
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction='column' w='100%'>
                  <Text
                    color={textColor}
                    fontSize='sm'
                    fontWeight='bold'
                    mb='12px'
                  >
                    Product images
                  </Text>
                  <Flex
                    align='center'
                    justify='center'
                    bg={useColorModeValue('none', 'navy.900')}
                    border={useColorModeValue('1px dashed #E2E8F0', 'none')}
                    w='100%'
                    minH='130px'
                    cursor='pointer'
                    {...getRootProps({ className: 'dropzone' })}
                  >
                    <Input variant='main' {...getInputProps()} />
                    <Button variant='no-effects'>
                      <Text color='gray.400' fontWeight='normal'>
                        Drop files here to upload
                      </Text>
                    </Button>
                  </Flex>
                  <Flex justify='space-between'>
                    <Button
                      variant='no-effects'
                      bg={bgPrevButton}
                      alignSelf='flex-end'
                      mt='24px'
                      w='100px'
                      h='35px'
                      onClick={() => productInfoTab.current.click()}
                    >
                      <Text fontSize='xs' color='gray.700' fontWeight='bold'>
                        PREV
                      </Text>
                    </Button>
                    <LightMode>
                      <Button
                        variant='DARK'
                        alignSelf='flex-end'
                        mt='24px'
                        w='100px'
                        h='35px'
                        onClick={() => socialsTab.current.click()}
                      >
                        <Text fontSize='xs' color='#fff' fontWeight='bold'>
                          NEXT
                        </Text>
                      </Button>
                    </LightMode>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb='32px'>
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Socials
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction='column' w='100%'>
                  <Stack direction='column' spacing='20px' w='100%'>
                    <FormControl>
                      <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                        Shopify Handle
                      </FormLabel>
                      <Input
                        variant='main'
                        placeholder='@Argon'
                        fontSize='xs'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                        Facebook Account
                      </FormLabel>
                      <Input
                        variant='main'
                        placeholder='https://'
                        fontSize='xs'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='xs' fontWeight='bold' mb='10px'>
                        Instagram Account
                      </FormLabel>
                      <Input
                        variant='main'
                        placeholder='https://'
                        fontSize='xs'
                      />
                    </FormControl>
                  </Stack>
                  <Flex justify='space-between'>
                    <Button
                      variant='no-effects'
                      bg={bgPrevButton}
                      alignSelf='flex-end'
                      mt='24px'
                      w='100px'
                      h='35px'
                      onClick={() => mediaTab.current.click()}
                    >
                      <Text fontSize='xs' color='gray.700' fontWeight='bold'>
                        PREV
                      </Text>
                    </Button>
                    <LightMode>
                      <Button
                        variant='no-effects'
                        bg='dark'
                        alignSelf='flex-end'
                        mt='24px'
                        w='100px'
                        h='35px'
                        onClick={() => pricingTab.current.click()}
                      >
                        <Text fontSize='xs' color='#fff' fontWeight='bold'>
                          NEXT
                        </Text>
                      </Button>
                    </LightMode>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel maxW='800px'>
            <Card>
              <CardHeader mb='32px'>
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Pricing
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction='column' w='100%'>
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
                          placeholder='USD'
                          color='gray.400'
                          defaultValue={0}
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
                        borderRadius='8px'
                        direction='row'
                        p='12px'
                        wrap='wrap'
                        bg={useColorModeValue('none', 'navy.900')}
                        border={useColorModeValue('1px solid #E2E8F0', 'none')}
                        _focus={{ borderColor: 'teal.300' }}
                        minH='40px'
                        cursor='text'
                      >
                        {skills.map((skill) => {
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
                  <Flex justify='space-between'>
                    <Button
                      variant='no-effects'
                      bg={bgPrevButton}
                      alignSelf='flex-end'
                      mt='24px'
                      w='100px'
                      h='35px'
                      onClick={() => socialsTab.current.click()}
                    >
                      <Text fontSize='xs' color='gray.700' fontWeight='bold'>
                        PREV
                      </Text>
                    </Button>
                    <LightMode>
                      <Button
                        variant='dark'
                        alignSelf='flex-end'
                        mt='24px'
                        w='100px'
                        h='35px'
                      >
                        <Text fontSize='xs' color='#fff' fontWeight='bold'>
                          SEND
                        </Text>
                      </Button>
                    </LightMode>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default NewProduct;
