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
import { AddIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Grid,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import EventCalendar from 'components/Calendars/EventCalendar';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { ClockIcon, DocumentIcon, WalletIcon } from 'components/Icons/Icons';
import { VSeparator } from 'components/Separator/Separator';
import React from 'react';
import { FaPalette, FaShip } from 'react-icons/fa';
import { calendarDataCalendar } from 'variables/calendar';
import {
  lineChartDataCalendar,
  lineChartOptionsCalendar,
} from 'variables/charts';

function Calendar() {
  const textColor = useColorModeValue('gray.700', 'white');
  const iconBlue = useColorModeValue('blue.500', 'white');
  const iconBoxColor = useColorModeValue('gray.100', 'blue.500');
  const bgCard = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'navy.800'
  );

  return (
    <Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
      <Flex w='100%' align='flex-end' justify='flex-end' mb='24px'>
        <Flex
          ms='auto'
          align='center'
          justify='center'
          me='25px'
          mb={{ sm: '16px', md: '50px' }}
        >
          <Flex direction='column' me='25px'>
            <Text fontSize='sm' color='white' fontWeight='bold' mb='8px'>
              Team Members:
            </Text>
            <AvatarGroup size='sm'>
              <Avatar
                borderColor={useColorModeValue('blue.500', 'navy.900')}
                src={avatar1}
              />
              <Avatar
                borderColor={useColorModeValue('blue.500', 'navy.900')}
                src={avatar2}
              />
              <Avatar
                borderColor={useColorModeValue('blue.500', 'navy.900')}
                src={avatar3}
              />
            </AvatarGroup>
          </Flex>
          <VSeparator h='56px' me='25px' />
          <IconButton
            w='40px'
            h='40px'
            bg={useColorModeValue('white', 'blue.500')}
            aria-label='Search database'
            icon={
              <AddIcon
                w='12px'
                h='12px'
                color={useColorModeValue('blue.500', 'white')}
              />
            }
          />
        </Flex>
      </Flex>
      <Grid templateColumns={{ sm: '1fr', lg: '2fr 1fr' }} gap='24px'>
        <Card minH='570px'>
          <CardHeader mb='6px'>
            <Flex direction='column'>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='6px'>
                Calendar
              </Text>
              <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                Wednesday, 2022
              </Text>
            </Flex>
          </CardHeader>
          <CardBody position='relative' display='block' height='100%'>
            <EventCalendar
              initialDate='2022-10-01'
              calendarData={calendarDataCalendar}
            />
          </CardBody>
        </Card>
        <Stack
          direction={{ sm: 'column', md: 'row', lg: 'column' }}
          spacing='24px'
        >
          <Card>
            <CardHeader>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='28px'>
                Upcoming events
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction='column' spacing='20px'>
                <Flex align='center'>
                  <IconBox h={'50px'} w={'50px'} bg={iconBoxColor} me='16px'>
                    <Icon
                      as={WalletIcon}
                      h={'22px'}
                      w={'22px'}
                      color={iconBlue}
                    />
                  </IconBox>
                  <Flex direction='column'>
                    <Text color={textColor} fontSize='sm' fontWeight='bold'>
                      Cyber Week
                    </Text>
                    <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                      27 March 2020, at 12:30 PM
                    </Text>
                  </Flex>
                </Flex>
                <Flex align='center'>
                  <IconBox h={'50px'} w={'50px'} bg={iconBoxColor} me='16px'>
                    <Icon
                      as={ClockIcon}
                      h={'22px'}
                      w={'22px'}
                      color={iconBlue}
                    />
                  </IconBox>
                  <Flex direction='column'>
                    <Text color={textColor} fontSize='sm' fontWeight='bold'>
                      Meeting with Marry
                    </Text>
                    <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                      22 March 2020, at 10:00 PM
                    </Text>
                  </Flex>
                </Flex>
                <Flex align='center' mb='22px'>
                  <IconBox h={'50px'} w={'50px'} bg={iconBoxColor} me='16px'>
                    <Icon
                      as={DocumentIcon}
                      h={'22px'}
                      w={'22px'}
                      color={iconBlue}
                    />
                  </IconBox>
                  <Flex direction='column'>
                    <Text color={textColor} fontSize='sm' fontWeight='bold'>
                      Book Deposit Hall
                    </Text>
                    <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                      25 March 2022, at 9:30 AM
                    </Text>
                  </Flex>
                </Flex>
                <Flex align='center' mb='22px'>
                  <IconBox h={'50px'} w={'50px'} bg={iconBoxColor} me='16px'>
                    <Icon as={FaShip} h={'22px'} w={'22px'} color={iconBlue} />
                  </IconBox>
                  <Flex direction='column'>
                    <Text color={textColor} fontSize='sm' fontWeight='bold'>
                      Shipment Deal UK
                    </Text>
                    <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                      25 March 2022, at 2:00 PM
                    </Text>
                  </Flex>
                </Flex>
                <Flex align='center' mb='22px'>
                  <IconBox h={'50px'} w={'50px'} bg={iconBoxColor} me='16px'>
                    <Icon
                      as={FaPalette}
                      h={'22px'}
                      w={'22px'}
                      color={iconBlue}
                    />
                  </IconBox>
                  <Flex direction='column'>
                    <Text color={textColor} fontSize='sm' fontWeight='bold'>
                      Verify Dashboard Color Palette
                    </Text>
                    <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                      26 March 2022, at 9:00 AM
                    </Text>
                  </Flex>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
          <Card
            px='0px'
            pb='0px'
            bg={bgCard}
            minH='230px'
            alignSelf='flex-start'
          >
            <CardHeader px='22px'>
              <Flex direction='column'>
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                  Productivity
                </Text>
                <Text color='#fff' fontSize='sm' fontWeight='normal'>
                  <Text as='span' color='green.400' fontWeight='bold'>
                    +4%
                  </Text>
                  <Text as='span' fontWeight='bold'>
                    {' '}
                    more{' '}
                  </Text>
                  in 2022
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Box w='100%'>
                <LineChart
                  chartData={lineChartDataCalendar}
                  chartOptions={lineChartOptionsCalendar}
                />
              </Box>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
    </Flex>
  );
}

export default Calendar;
