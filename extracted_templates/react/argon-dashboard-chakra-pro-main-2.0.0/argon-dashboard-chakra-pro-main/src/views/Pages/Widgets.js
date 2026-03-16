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
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Progress,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import BackgroundCard1 from 'assets/img/BackgroundCard1.png';
import BgMusicCard from 'assets/img/BgMusicCard.png';
import BgMusicCardDark from 'assets/img/bgMusicCardDark.png';
import {
  ClockIcon,
  DocumentIcon,
  RocketIcon,
  SettingsIcon,
  WalletIcon,
} from 'components/Icons/Icons';
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
import { BsBatteryCharging, BsMusicNoteBeamed } from 'react-icons/bs';
// Custom components
import EventCalendar from 'components/Calendars/EventCalendar';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { HSeparator } from 'components/Separator/Separator';
import TimelineRow from 'components/Tables/TimelineRow';
import React, { useState } from 'react';
import {
  FaCheckCircle,
  FaLightbulb,
  FaPaypal,
  FaPlay,
  FaRegLightbulb,
  FaShare,
  FaUser,
  FaWallet,
} from 'react-icons/fa';
import { RiArrowDropRightLine, RiMastercardFill } from 'react-icons/ri';
import { calendarDataWidgets } from 'variables/calendar';
import {
  lineChartDataWidgets1,
  lineChartDataWidgets2,
  lineChartDataWidgets3,
  lineChartOptionsWidgets1,
  lineChartOptionsWidgets2,
  lineChartOptionsWidgets3,
} from 'variables/charts';
import { timelineData } from 'variables/general';

function Widgets() {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const { colorMode } = useColorMode();

  const textColor = useColorModeValue('gray.700', 'white');
  const iconBlue = useColorModeValue('blue.500', 'white');
  const secondaryIconBlue = useColorModeValue('gray.100', 'blue.500');
  const iconBoxInside = useColorModeValue('white', 'blue.500');
  const bgCard = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'navy.800'
  );
  const iconBoxColor = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'blue.500'
  );

  return (
    <Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
      <Grid
        templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 2fr' }}
        templateRows='1fr'
        gap='24px'
        mb='24px'
      >
        <Stack direction='column' spacing='24px'>
          <Card bg={bgCard}>
            <Flex justify='space-between' w='100%' align='center'>
              <Flex direction='column'>
                <Text fontSize='sm' color='#fff' fontWeight='normal' mb='2px'>
                  Battery Health
                </Text>
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                  99%
                </Text>
              </Flex>
              <IconBox h={'45px'} w={'45px'} bg={iconBoxInside}>
                <Icon
                  as={BsBatteryCharging}
                  h={'24px'}
                  w={'24px'}
                  color={iconBlue}
                />
              </IconBox>
            </Flex>
          </Card>
          <Card bg={bgCard}>
            <Flex justify='space-between' w='100%' align='center'>
              <Flex direction='column'>
                <Text fontSize='sm' color='#fff' fontWeight='normal' mb='2px'>
                  Music Volume
                </Text>
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                  15/100
                </Text>
              </Flex>
              <IconBox h={'45px'} w={'45px'} bg={iconBoxInside}>
                <Icon
                  as={BsMusicNoteBeamed}
                  h={'24px'}
                  w={'24px'}
                  color={iconBlue}
                />
              </IconBox>
            </Flex>
          </Card>
        </Stack>
        <Card px='0px' maxH='230px' pb='0px'>
          <CardHeader px='22px'>
            <Stat me='auto'>
              <StatLabel fontSize='xs' color='gray.400' fontWeight='normal'>
                Income
              </StatLabel>
              <Flex>
                <StatNumber fontSize='lg' color={textColor}>
                  $130,912
                </StatNumber>
                <StatHelpText
                  alignSelf='flex-end'
                  justifySelf='flex-end'
                  m='0px'
                  ps='4px'
                  color='green.400'
                  fontWeight='bold'
                  fontSize='sm'
                >
                  +90%
                </StatHelpText>
              </Flex>
            </Stat>
          </CardHeader>

          <Box w='100%'>
            <LineChart
              chartData={lineChartDataWidgets1}
              chartOptions={lineChartOptionsWidgets1}
            />
          </Box>
        </Card>
        <Card
          px='0px'
          maxH='230px'
          pb='0px'
          gridColumn={{ md: '1 / 3', lg: 'auto' }}
        >
          <CardHeader px='22px'>
            <Flex justify='space-between' w='100%'>
              <Flex align='center'>
                <IconBox h={'45px'} w={'45px'} bg='blue.500' me='16px'>
                  <Icon
                    as={FaCheckCircle}
                    h={'24px'}
                    w={'24px'}
                    color='white'
                  />
                </IconBox>
                <Flex direction='column'>
                  <Text color='gray.400' fontSize='xs' fontWeight='normal'>
                    Tasks
                  </Text>
                  <Text color={textColor} fontSize='lg' fontWeight='bold'>
                    480
                  </Text>
                </Flex>
              </Flex>
              <Flex direction='column' minW='125px' alignSelf='flex-end'>
                <Text color='gray.400' fontWeight='normal' fontSize='xs'>
                  60%
                </Text>
                <Progress
                  colorScheme='blue'
                  borderRadius='15px'
                  h='6px'
                  value={60}
                />
              </Flex>
            </Flex>
          </CardHeader>

          <Box w='100%'>
            <LineChart
              chartData={lineChartDataWidgets2}
              chartOptions={lineChartOptionsWidgets2}
            />
          </Box>
        </Card>
      </Grid>
      <Grid
        templateColumns={{
          sm: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap='24px'
        mb='24px'
      >
        <Card>
          <CardHeader mb='16px'>
            <Flex direction='column'>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='4px'>
                Upcoming events
              </Text>
              <Text color='gray.400' fontSize='sm' fontWeight='bold'>
                Joined
              </Text>
            </Flex>
          </CardHeader>

          <Flex direction='column'>
            <Flex align='center' mb='22px'>
              <IconBox h={'45px'} w={'45px'} bg={secondaryIconBlue} me='16px'>
                <Icon as={WalletIcon} h={'24px'} w={'24px'} color={iconBlue} />
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
              <IconBox h={'45px'} w={'45px'} bg={secondaryIconBlue} me='16px'>
                <Icon as={ClockIcon} h={'24px'} w={'24px'} color={iconBlue} />
              </IconBox>
              <Flex direction='column'>
                <Text color={textColor} fontSize='sm' fontWeight='bold'>
                  Meeting with Marry
                </Text>
                <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                  24 March 2020, at 10:00 PM
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing='24px'>
          <Card p='16px' display='flex' align='center' justify='center'>
            <Flex direction='column' align='center' w='100%' py='14px'>
              <IconBox h={'60px'} w={'60px'} bg='blue.500'>
                <Icon h={'24px'} w={'24px'} color='white' as={FaWallet} />
              </IconBox>
              <Flex
                direction='column'
                m='14px'
                justify='center'
                textAlign='center'
                align='center'
                w='100%'
              >
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Salary
                </Text>
                <Text
                  mb='24px'
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='semibold'
                >
                  Belong Interactive
                </Text>
                <HSeparator />
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                +$2000
              </Text>
            </Flex>
          </Card>
          <Card p='16px' display='flex' align='center' justify='center'>
            <Flex
              direction='column'
              align='center'
              justify='center'
              w='100%'
              py='14px'
            >
              <IconBox h={'60px'} w={'60px'} bg='blue.500'>
                <Icon h={'24px'} w={'24px'} color='white' as={FaPaypal} />
              </IconBox>
              <Flex
                direction='column'
                m='14px'
                justify='center'
                textAlign='center'
                align='center'
                w='100%'
              >
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Paypal
                </Text>
                <Text
                  mb='24px'
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='semibold'
                >
                  Freelance Payment
                </Text>
                <HSeparator />
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                $455.00
              </Text>
            </Flex>
          </Card>
        </Stack>
        <Card
          backgroundImage={
            colorMode === 'light'
              ? BackgroundCard1
              : 'linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)'
          }
          backgroundRepeat='no-repeat'
          background='cover'
          bgPosition='10%'
          p='16px'
          h={{ sm: '220px', xl: '100%' }}
          gridColumn={{ md: '1 / 3', lg: 'auto' }}
        >
          <Flex
            direction='column'
            color='white'
            h='100%'
            p='0px 10px 20px 10px'
            w='100%'
          >
            <Flex justify='space-between' align='center'>
              <Text fontWeight='bold'>Argon x Chakra UI</Text>
              <Icon as={RiMastercardFill} w='48px' h='auto' color='gray.400' />
            </Flex>
            <Spacer />
            <Flex direction='column'>
              <Box>
                <Text fontSize='xl' letterSpacing='2px' fontWeight='bold'>
                  7812 2139 0823 XXXX
                </Text>
              </Box>
              <Flex mt='14px'>
                <Flex direction='column' me='34px'>
                  <Text fontSize='xs'>VALID THRU</Text>
                  <Text fontSize='xs' fontWeight='bold'>
                    05/24
                  </Text>
                </Flex>
                <Flex direction='column'>
                  <Text fontSize='xs'>CVV</Text>
                  <Text fontSize='xs' fontWeight='bold'>
                    09X
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Grid>
      <Grid
        templateColumns={{
          sm: '1fr',
          md: '1fr 1fr',
          lg: '1.5fr 1fr 1.2fr 1fr 1fr',
        }}
        gap='24px'
        mb='24px'
      >
        <Card>
          <CardHeader mb='24px'>
            <Flex justify='space-between' w='100%' align='center'>
              <Text color={textColor} fontWeight='bold' fontSize='lg'>
                Full Body
              </Text>
              <Badge
                bg={colorMode === 'light' ? 'red.100' : 'red.500'}
                color={colorMode === 'light' ? 'red.500' : 'white'}
                w='85px'
                py='6px'
                borderRadius='12px'
                textAlign='center'
              >
                MODERATE
              </Badge>
            </Flex>
          </CardHeader>

          <Text color='gray.400' fontWeight='normal' fontSize='sm'>
            What matters is the people who are sparked by it. And the people who
            are liked.
          </Text>
        </Card>
        <Card>
          <CardHeader mb='22px'>
            <Flex justify='space-between' align='center' w='100%'>
              <Text fontSize='xs' color='gray.400' fontWeight='bold'>
                {toggleSwitch ? 'ON' : 'OFF'}
              </Text>
              <Switch
                colorScheme='blue'
                onChange={() => setToggleSwitch(!toggleSwitch)}
              />
            </Flex>
          </CardHeader>

          <Flex direction='column'>
            <Icon
              as={toggleSwitch ? FaLightbulb : FaRegLightbulb}
              w='52px'
              h='52px'
              color='gray.400'
              mb='16px'
            />
            <Text color={textColor} fontWeight='bold'>
              Lights
            </Text>
          </Flex>
        </Card>
        <Card px='0px' pb='0px' gridColumn={{ md: '1 / 3', lg: 'auto' }}>
          <CardHeader px='22px'>
            <Stat me='auto'>
              <StatLabel fontSize='xs' color='gray.400' fontWeight='normal'>
                Calories
              </StatLabel>
              <Flex>
                <StatNumber fontSize='lg' color={textColor}>
                  187
                </StatNumber>
                <StatHelpText
                  alignSelf='flex-end'
                  justifySelf='flex-end'
                  m='0px'
                  ps='4px'
                  color='green.400'
                  fontWeight='bold'
                  fontSize='sm'
                >
                  +5%
                </StatHelpText>
              </Flex>
            </Stat>
          </CardHeader>

          <Box w='100%' maxH='100px'>
            <LineChart
              chartData={lineChartDataWidgets3}
              chartOptions={lineChartOptionsWidgets3}
            />
          </Box>
        </Card>
        <Card>
          <Flex direction='column'>
            <IconBox h={'45px'} w={'45px'} bg='blue.500' mb='24px'>
              <Icon as={FaShare} h={'24px'} w={'24px'} color='white' />
            </IconBox>
            <Flex direction='column'>
              <Text color={textColor} fontSize='2xl' fontWeight='bold'>
                754
                <Text as='span' color='gray.400' fontSize='sm' ms='2px'>
                  m
                </Text>
              </Text>
              <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                New York City
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <CardHeader mb='42px'>
            <Text color='gray.400' fontSize='xs' fontWeight='normal'>
              STEPS
            </Text>
          </CardHeader>

          <Stat>
            <StatNumber
              color={textColor}
              fontWeight='bold'
              fontSize='2xl'
              mb='6px'
            >
              11.4K
            </StatNumber>
            <StatHelpText
              bg='green.100'
              color='green'
              w='fit-content'
              borderRadius='12px'
              fontSize='10px'
              p='6px 12px'
            >
              +4.3%
            </StatHelpText>
          </Stat>
        </Card>
      </Grid>
      <Grid templateColumns={{ sm: '1fr', lg: '1fr .5fr .7fr' }} gap='24px'>
        <Card minH='550px'>
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
          <Box position='relative' display='block' height='100%'>
            <EventCalendar
              initialDate='2022-10-01'
              calendarData={calendarDataWidgets}
            />
          </Box>
        </Card>
        <Stack direction='column' spacing='24px'>
          <Card>
            <Text fontSize='lg' text={textColor} fontWeight='bold'>
              Categories
            </Text>

            <Stack direction='column' spacing='24px' w='100%' pt='28px'>
              <Flex align='center' w='100%'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={iconBoxColor} me='18px'>
                    <RocketIcon h={'20px'} w={'20px'} color='white' />
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
                  <IconBox h={'40px'} w={'40px'} bg={iconBoxColor} me='18px'>
                    <SettingsIcon h={'20px'} w={'20px'} color='white' />
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
                  <IconBox h={'40px'} w={'40px'} bg={iconBoxColor} me='18px'>
                    <DocumentIcon h={'20px'} w={'20px'} color='white' />
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
              <Flex align='center' w='100%'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={iconBoxColor} me='18px'>
                    <Icon as={FaUser} h={'20px'} w={'20px'} color='white' />
                  </IconBox>
                  <Flex direction='column'>
                    <Text fontSize='sm' fontWeight='bold' color={textColor}>
                      Happy Users
                    </Text>
                    <Text color='gray.400' fontSize='xs'>
                      <Text as='span' fontWeight='bold'>
                        +430
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
          </Card>
          <Card
            bgImage={colorMode === 'light' ? BgMusicCard : BgMusicCardDark}
            bgRepeat='no-repeat'
          >
            <Flex direction='column' w='100%' mb='60px'>
              <Text color='#fff' fontWeight='bold' fontSize='lg'>
                Some Kind of Blues
              </Text>
              <Text color='#fff' fontWeight='normal' fontSize='sm'>
                Deftones
              </Text>
            </Flex>

            <Stack direction='row' spacing='18px'>
              <Button
                variant='outline'
                colorScheme='whiteAlpha'
                borderRadius='50px'
                w='45px'
                h='45px'
              >
                <Icon as={AiFillBackward} color='#fff' w='26px' h='26px' />
              </Button>
              <Button
                variant='outline'
                colorScheme='whiteAlpha'
                borderRadius='50px'
                w='45px'
                h='45px'
              >
                <Icon as={FaPlay} color='#fff' w='18px' h='18px' />
              </Button>
              <Button
                variant='outline'
                colorScheme='whiteAlpha'
                borderRadius='50px'
                w='45px'
                h='45px'
              >
                <Icon as={AiFillForward} color='#fff' w='26px' h='26px' />
              </Button>
            </Stack>
          </Card>
        </Stack>
        <Card pb='0px'>
          <CardHeader mb='34px'>
            <Flex direction='column'>
              <Text
                fontSize='lg'
                color={textColor}
                fontWeight='bold'
                pb='.5rem'
              >
                Orders overview
              </Text>
              <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                <Text fontWeight='bold' as='span' color='green.500'>
                  +30%
                </Text>{' '}
                this month.
              </Text>
            </Flex>
          </CardHeader>
          <Flex direction='column' ms='8px' position='relative'>
            {timelineData.map((row, index, arr) => {
              return (
                <TimelineRow
                  logo={row.logo}
                  title={row.title}
                  date={row.date}
                  color={row.color}
                  index={index}
                  arrLength={arr.length}
                  key={index}
                />
              );
            })}
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Widgets;
