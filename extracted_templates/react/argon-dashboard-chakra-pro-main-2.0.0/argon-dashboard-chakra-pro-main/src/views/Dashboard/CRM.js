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

import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Portal,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import CRMimage from 'assets/img/CRM-image.png';
import peopleImage from 'assets/img/people-image.png';
import EventCalendar from 'components/Calendars/EventCalendar';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { DocumentIcon, RocketIcon, SettingsIcon } from 'components/Icons/Icons';
import TransactionRow from 'components/Tables/TransactionRow';
import React, { useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { calendarDataCRM } from 'variables/calendar';
import {
  lineChartDataCRM1,
  lineChartDataCRM2,
  lineChartOptionsCRM1,
  lineChartOptionsCRM2,
} from 'variables/charts';
import { revenueCRM, transactionsCRM } from 'variables/general';

function CRM() {
  const textColor = useColorModeValue('gray.700', 'white');
  const secondaryColor = useColorModeValue('gray.500', 'white');
  const iconBlue = useColorModeValue('gray.800', 'blue.500');
  const iconBoxInside = useColorModeValue('white', 'white');
  const overlayRef = useRef();

  return (
    <Flex direction='column' pt={{ sm: '120px', md: '75px' }}>
      <Grid
        templateColumns={{ sm: '1fr', lg: '1.6fr 1fr', xl: '2fr 1fr' }}
        templateRows='1fr'
        gap='24px'
        mb={{ lg: '24px' }}
      >
        <Grid
          templateColumns='auto'
          templateRows={{ sm: '1fr auto', lg: '1fr 2.5fr' }}
          gap='24px'
        >
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            spacing='24px'
            maxH={{ lg: '220px' }}
          >
            <Card px='0px' pb='0px'>
              <CardHeader px='22px'>
                <Stat>
                  <StatLabel fontSize='xs' color='gray.400'>
                    Visitors
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' me='4px' color={textColor}>
                      $5,927
                    </StatNumber>
                    <StatHelpText
                      color='green.400'
                      size='sm'
                      alignSelf='flex-end'
                      fontWeight='bold'
                      mb='0px'
                    >
                      +55%
                    </StatHelpText>
                  </Flex>
                </Stat>
              </CardHeader>
              <Flex direction='column'>
                <Box w='100%' h='100%'>
                  <LineChart
                    chartData={lineChartDataCRM1}
                    chartOptions={lineChartOptionsCRM1}
                  />
                </Box>
              </Flex>
            </Card>
            <Card px='0px' pb='0px'>
              <CardHeader px='22px'>
                <Stat>
                  <StatLabel fontSize='xs' color='gray.400'>
                    Income
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' me='4px' color={textColor}>
                      $130,912
                    </StatNumber>
                    <StatHelpText
                      color='green.400'
                      size='sm'
                      alignSelf='flex-end'
                      fontWeight='bold'
                      mb='0px'
                    >
                      +90%
                    </StatHelpText>
                  </Flex>
                </Stat>
              </CardHeader>
              <Flex direction='column'>
                <Box w='100%'>
                  <LineChart
                    chartData={lineChartDataCRM2}
                    chartOptions={lineChartOptionsCRM2}
                  />
                </Box>
              </Flex>
            </Card>
            <Card p='0px'>
              <Button
                p='0px'
                w='100%'
                h='100%'
                bg='transparent'
                color='gray.500'
                borderRadius='15px'
              >
                <Flex
                  direction='column'
                  justifyContent='center'
                  align='center'
                  h='120px'
                >
                  <Icon
                    as={FaPlus}
                    w='30px'
                    h='30px'
                    mb='12px'
                    color={secondaryColor}
                  />
                  <Text fontSize='lg' fontWeight='bold' color={secondaryColor}>
                    New Tab
                  </Text>
                </Flex>
              </Button>
            </Card>
          </Stack>
          <Card w={{ sm: '100%' }} h='575px'>
            <CardHeader pt='6px' mb='8px'>
              <Flex direction='column'>
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Calendar
                </Text>
                <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                  Wednesday, 2022
                </Text>
              </Flex>
            </CardHeader>
            <Flex
              direction='column'
              position='relative'
              display='block'
              height='100%'
            >
              <EventCalendar
                initialDate='2022-10-01'
                calendarData={calendarDataCRM}
              />
            </Flex>
          </Card>
        </Grid>
        <Stack direction='column' spacing='24px'>
          <Card w={{ sm: '100%' }} minH={{ lg: '300px' }}>
            <Flex
              direction='column'
              backgroundImage={peopleImage}
              bgPosition='center'
              bgRepeat='no-repeat'
              w='100%'
              h='100%'
              minH={{ sm: '200px', lg: '100%' }}
              bgSize='cover'
              position='relative'
              borderRadius='15px'
            >
              <Box
                bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'
                w='100%'
                position='absolute'
                h='100%'
                borderRadius='inherit'
                ref={overlayRef}
              ></Box>
              <Portal containerRef={overlayRef}>
                <Flex
                  flexDirection='column'
                  color='white'
                  p='24px 20px 4px 20px'
                  lineHeight='1.6'
                  h={{ md: '190px', lg: '240px' }}
                >
                  <Text fontSize='lg' fontWeight='bold' pb='6px'>
                    Hello John!
                  </Text>
                  <Text fontSize='sm' fontWeight='normal' w={{ lg: '92%' }}>
                    Wealth creation is a revolutionary recent positive-sum game.
                    It is all about who takes the opportunity first.
                  </Text>
                  <Spacer />
                  <Flex
                    align='center'
                    mt={{ sm: '20px', lg: '40px', xl: '80px' }}
                  >
                    <Button
                      ps='0px'
                      pb={{ xl: '22px' }}
                      variant='no-effects'
                      bg='transparent'
                    >
                      <Text
                        fontSize='sm'
                        fontWeight='bold'
                        _hover={{ me: '4px' }}
                        color='#fff'
                        transition='all .5s ease'
                      >
                        Read more
                      </Text>
                      <Icon
                        as={BsArrowRight}
                        w='12px'
                        h='12px'
                        fontSize='xl'
                        transition='all .5s ease'
                        mx='4px'
                        color='#fff'
                        cursor='pointer'
                        _hover={{ transform: 'translateX(20%)' }}
                      />
                    </Button>
                  </Flex>
                </Flex>
              </Portal>
            </Flex>
          </Card>
          <Stack
            direction={{ sm: 'column', md: 'row', lg: 'column' }}
            maxW={{ md: '100%' }}
            spacing='24px'
          >
            <Card>
              <CardHeader>
                <Text fontSize='lg' text={textColor} fontWeight='bold'>
                  Invoices
                </Text>
              </CardHeader>
              <Flex direction='column' w='100%' pt='28px'>
                <Stack direction='column' spacing='24px' w='100%'>
                  <Flex align='center' w='100%'>
                    <Flex align='center'>
                      <IconBox h={'40px'} w={'40px'} bg={iconBlue} me='18px'>
                        <RocketIcon
                          h={'20px'}
                          w={'20px'}
                          color={iconBoxInside}
                        />
                      </IconBox>
                      <Flex direction='column'>
                        <Text fontSize='sm' fontWeight='bold' color={textColor}>
                          Devices
                        </Text>
                        <Text color='gray.400' fontSize='xs'>
                          250 in stock,{' '}
                          <Text as='span' fontWeight='bold'>
                            346+ sold
                          </Text>
                        </Text>
                      </Flex>
                    </Flex>
                    <Spacer />
                    <Button variant='no-effects' px='0px'>
                      <Icon
                        as={RiArrowDropRightLine}
                        color='gray.400'
                        w='30px'
                        h='30px'
                        cursor='pointer'
                        transition='all .25s ease'
                        _hover={{ transform: 'translateX(25%)' }}
                      />
                    </Button>
                  </Flex>
                  <Flex align='center' w='100%'>
                    <Flex align='center'>
                      <IconBox h={'40px'} w={'40px'} bg={iconBlue} me='18px'>
                        <SettingsIcon
                          h={'20px'}
                          w={'20px'}
                          color={iconBoxInside}
                        />
                      </IconBox>
                      <Flex direction='column'>
                        <Text fontSize='sm' fontWeight='bold' color={textColor}>
                          Tickets
                        </Text>
                        <Text color='gray.400' fontSize='xs'>
                          123 closed,{' '}
                          <Text as='span' fontWeight='bold'>
                            15 open
                          </Text>
                        </Text>
                      </Flex>
                    </Flex>
                    <Spacer />
                    <Button variant='no-effects' px='0px'>
                      <Icon
                        as={RiArrowDropRightLine}
                        color='gray.400'
                        w='30px'
                        h='30px'
                        cursor='pointer'
                        transition='all .25s ease'
                        _hover={{ transform: 'translateX(25%)' }}
                      />
                    </Button>
                  </Flex>
                  <Flex align='center' w='100%'>
                    <Flex align='center'>
                      <IconBox h={'40px'} w={'40px'} bg={iconBlue} me='18px'>
                        <DocumentIcon
                          h={'20px'}
                          w={'20px'}
                          color={iconBoxInside}
                        />
                      </IconBox>
                      <Flex direction='column'>
                        <Text fontSize='sm' fontWeight='bold' color={textColor}>
                          Error logs
                        </Text>
                        <Text color='gray.400' fontSize='xs'>
                          1 is active,{' '}
                          <Text as='span' fontWeight='bold'>
                            40 closed
                          </Text>
                        </Text>
                      </Flex>
                    </Flex>
                    <Spacer />
                    <Button variant='no-effects' px='0px'>
                      <Icon
                        as={RiArrowDropRightLine}
                        color='gray.400'
                        w='30px'
                        h='30px'
                        cursor='pointer'
                        transition='all .25s ease'
                        _hover={{ transform: 'translateX(25%)' }}
                      />
                    </Button>
                  </Flex>
                </Stack>
              </Flex>
            </Card>
            <Card maxH={{ md: '130px', lg: '100%' }}>
              <Flex
                direction={{ sm: 'column', md: 'row', lg: 'row' }}
                align='center'
              >
                <Box
                  minW={{
                    sm: '80px',
                    lg: '100px',
                    xl: '130px',
                    '2xl': '170px',
                  }}
                  h={{ sm: '80px', lg: '100px', xl: '130px', '2xl': '170px' }}
                  me={{ md: '36px' }}
                  mb={{ sm: '12px', md: '0px' }}
                >
                  <Image src={CRMimage} w='100%' h='100%' borderRadius='15px' />
                </Box>

                <Flex
                  direction='column'
                  justify='center'
                  align={{ sm: 'center', md: 'flex-start' }}
                >
                  <Text
                    fontWeight='bold'
                    textAlign={{ sm: 'center', md: 'start' }}
                    color={secondaryColor}
                    fontSize={{ sm: 'sm', md: 'xs', lg: 'sm' }}
                    mb={{ sm: '10px', lg: '22px' }}
                  >
                    Today's Martina's Birthday. Wish her the best of luck!
                  </Text>
                  <Button
                    h={{ sm: '32px' }}
                    variant='primary'
                    p={{ sm: '0px 32px', lg: '6px 22px' }}
                  >
                    SEND MESSAGE
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Stack>
        </Stack>
      </Grid>
      <Stack
        direction={{ sm: 'column', lg: 'row' }}
        spacing='24px'
        mt={{ sm: '24px', lg: '0px' }}
      >
        <Card>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: 'column', lg: 'row' }}
                justify={{ sm: 'center', lg: 'space-between' }}
                align={{ sm: 'center' }}
                w='100%'
                my={{ md: '12px' }}
              >
                <Text
                  color={textColor}
                  fontSize={{ sm: 'lg', md: 'xl', lg: 'lg' }}
                  fontWeight='bold'
                >
                  Your Transactions
                </Text>
                <Flex align='center'>
                  <Icon
                    as={FaRegCalendarAlt}
                    color='gray.400'
                    fontSize='md'
                    me='6px'
                  ></Icon>
                  <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
                    23 - 30 March 2022
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <Flex direction='column'>
            <Flex direction='column' w='100%' justify='center'>
              {transactionsCRM.map((row, index) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                    key={index}
                  />
                );
              })}
            </Flex>
          </Flex>
        </Card>
        <Card>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: 'column', lg: 'row' }}
                justify={{ sm: 'center', lg: 'space-between' }}
                align={{ sm: 'center' }}
                w='100%'
                my={{ md: '12px' }}
              >
                <Text
                  color={textColor}
                  fontSize={{ sm: 'lg', md: 'xl', lg: 'lg' }}
                  fontWeight='bold'
                >
                  Revenue
                </Text>
                <Flex align='center'>
                  <Icon
                    as={FaRegCalendarAlt}
                    color='gray.400'
                    fontSize='md'
                    me='6px'
                  ></Icon>
                  <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
                    23 - 30 March 2022
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <Flex direction='column'>
            <Flex direction='column' w='100%' justify='center'>
              {revenueCRM.map((row, index) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                    key={index}
                  />
                );
              })}
            </Flex>
          </Flex>
        </Card>
      </Stack>
    </Flex>
  );
}

export default CRM;
