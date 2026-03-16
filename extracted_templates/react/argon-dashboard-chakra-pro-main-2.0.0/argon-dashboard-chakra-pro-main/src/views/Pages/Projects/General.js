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

import React from 'react';

// Chakra imports
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Flex,
  Grid,
  Icon,
  Progress,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import avatar4 from 'assets/img/avatars/avatar4.png';
import basicDark from 'assets/img/BgMusicCard.png';
import basicBlue from 'assets/img/basic-auth.png';
import { BsCircleFill } from 'react-icons/bs';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  HomeIcon,
  WalletIcon,
} from 'components/Icons/Icons';
// Custom components
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import DonutChart from 'components/Charts/DonutChart';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { HSeparator } from 'components/Separator/Separator';
import {
  donutChartDataGeneral,
  donutChartOptionsGeneral,
  lineChartDataGeneral,
  lineChartOptionsGeneral,
} from 'variables/charts';

function General() {
  const { colorMode } = useColorMode();

  const textColor = useColorModeValue('gray.700', 'white');
  const iconBoxInside = useColorModeValue('white', 'white');
  const iconBlue = useColorModeValue('blue.500', 'blue.500');
  const bgSalaryCard = useColorModeValue('gray.50', 'navy.900');
  const bgButton = useColorModeValue('gray.700', 'blue.500');

  return (
    <Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
      <Grid
        templateColumns={{
          sm: '1fr',
          lg: '0.5fr 1.5fr 1fr',
          xl: '1fr 1.7fr 1.5fr',
        }}
        gap='24px'
        mb='24px'
      >
        <Card
          bgImage={colorMode === 'light' ? basicDark : basicBlue}
          bgSize='cover'
          bgPosition='50%'
        >
          <Flex
            p={{ sm: '24px 52px', lg: '12px 26px', xl: '24px 52px' }}
            direction='column'
            align='center'
            justify='center'
            w='100%'
            h='100%'
          >
            <Text color='#fff' fontSize='2xl' fontWeight='normal'>
              Earnings
            </Text>
            <Text color='#fff' fontSize='5xl' fontWeight='bold' mb='12px'>
              $15,800
            </Text>
            <Badge
              bg='rgba(255, 255, 255, 0.3)'
              mb='26px'
              color='#fff'
              w='150px'
              borderRadius='8px'
              display='flex'
              justify='center'
              align='center'
            >
              <Text
                textAlign='center'
                py='6px'
                fontSize='11px'
                w='100%'
                h='100%'
                alignSelf='center'
              >
                +15% SINCE LAST WEEK
              </Text>
            </Badge>
            <Button
              variant={colorMode === 'light' ? 'primary' : 'light'}
              py='16px'
              w='155px'
              h='25px'
            >
              VIEW MORE
            </Button>
          </Flex>
        </Card>
        <Grid
          templateColumns={{
            sm: '1fr',
            md: 'repeat(2, 1fr)',
          }}
          templateRows='repeat(2, 1fr)'
          gap='24px'
        >
          <Card px={{ lg: '8px', xl: '22px' }}>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              h='100%'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='.1rem'
                >
                  Today's Money
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor}>
                    $53,000
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='green.400'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'
                  >
                    +55%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={bgButton}>
                <WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </Card>
          <Card px={{ lg: '8px', xl: '22px' }}>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              h='100%'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='.1rem'
                >
                  New Clients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor}>
                    +$3,052
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='red.500'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'
                  >
                    -14%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={bgButton}>
                <DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </Card>
          <Card px={{ lg: '8px', xl: '22px' }}>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              h='100%'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='.1rem'
                >
                  Today's Users
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor}>
                    $2,300
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='green.400'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'
                  >
                    +5%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={bgButton}>
                <GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </Card>
          <Card px={{ lg: '8px', xl: '22px' }}>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              h='100%'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='.1rem'
                >
                  Total Sales
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor}>
                    $173,000
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='green.400'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'
                  >
                    +8%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox h={'45px'} w={'45px'} bg={bgButton}>
                <CartIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </Card>
        </Grid>
        <Card>
          <CardHeader mb='28px'>
            <Flex>
              <Avatar
                src={avatar4}
                w='40px'
                h='40px'
                mr='15px'
                borderRadius='12px'
              />
              <Flex direction='column'>
                <Text color={textColor} fontSize='md' fontWeight='bold'>
                  Esthera Jackson
                </Text>
                <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                  2h ago
                </Text>
              </Flex>
            </Flex>
          </CardHeader>

          <Flex direction='column' w='100%'>
            <Flex direction='column' maxW='400px' mb='32px'>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='4px'>
                I need a Ruby developer for my new website.
              </Text>
              <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                The website was initially built in PHP, I need a professional
                ruby programmer to shift it.
              </Text>
            </Flex>
            <Flex
              justify='space-between'
              w='100%'
              bg={bgSalaryCard}
              borderRadius='12px'
              p='20px 25px'
              direction={{ sm: 'row' }}
            >
              <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                ${' '}
                <Text
                  as='span'
                  fontSize='2xl'
                  color={textColor}
                  fontWeight='bold'
                >
                  3,000
                </Text>{' '}
                / month
              </Text>
              <Button
                variant='outlined'
                w={{ sm: '75px', md: '125px', lg: '75px', xl: '125px' }}
                h='35px'
              >
                APPLY
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: '1fr', lg: '1.85fr 1fr', xl: '70% 30%' }}
        gap='24px'
      >
        <Card p={{ sm: '16px', md: '22px' }} maxW={{ sm: '330px', md: '100%' }}>
          <CardHeader>
            <Flex justify='space-between' w='100%'>
              <Text color={textColor} fontSize='lg' fontWeight='bold'>
                To do List
              </Text>
              <Text color='gray.400' fontSize='md' fontWeight='normal'>
                23 - 30 March 2020
              </Text>
            </Flex>
          </CardHeader>

          <Flex
            direction='column'
            w='100%'
            overflowX={{ sm: 'scroll', md: 'hidden' }}
          >
            <HSeparator my='14px' />
            <Flex>
              <Flex
                bgColor='blue.500'
                borderRadius='12px'
                minWidth='3px'
                h='100%'
              />
              <Flex direction='column' p='12px 22px' w='100%'>
                <Flex justify='space-between' mb='18px'>
                  <Flex align='center'>
                    <Checkbox
                      me='16px'
                      colorScheme='blue'
                      size='lg'
                      defaultIsChecked
                    />
                    <Text color={textColor} fontSize='md' fontWeight='bold'>
                      Check status
                    </Text>
                  </Flex>
                  <Icon
                    as={IoEllipsisHorizontalSharp}
                    color='gray.400'
                    w='20px'
                    h='20px'
                    cursor='pointer'
                  />
                </Flex>
                <Stack
                  direction='row'
                  spacing={{
                    sm: '20px',
                    md: '100px',
                    lg: '80px',
                    xl: '180px',
                  }}
                  ms={{ sm: '0px', md: '36px', lg: '0px', xl: '36px' }}
                >
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Date
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      22 July 2022
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Project
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      2414_VR4sf3#
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Company
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      Creative Tim
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
            <HSeparator my='14px' />
            <Flex>
              <Flex
                bgColor='orange.300'
                borderRadius='12px'
                minWidth='3px'
                h='100%'
              />
              <Flex direction='column' p='12px 22px' w='100%'>
                <Flex justify='space-between' mb='18px'>
                  <Flex align='center'>
                    <Checkbox me='16px' colorScheme='blue' size='lg' />
                    <Text color={textColor} fontSize='md' fontWeight='bold'>
                      Management discussion
                    </Text>
                  </Flex>
                  <Icon
                    as={IoEllipsisHorizontalSharp}
                    color='gray.400'
                    w='20px'
                    h='20px'
                    cursor='pointer'
                  />
                </Flex>
                <Stack
                  direction='row'
                  spacing={{
                    sm: '20px',
                    md: '100px',
                    lg: '80px',
                    xl: '180px',
                  }}
                  ms={{ sm: '0px', md: '36px', lg: '0px', xl: '36px' }}
                >
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Date
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      22 July 2022
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Project
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      4411_8sIsdd23
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Company
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      Apple
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
            <HSeparator my='14px' />
            <Flex>
              <Flex
                bgColor='pink.300'
                borderRadius='12px'
                minWidth='3px'
                h='100%'
              />
              <Flex direction='column' p='12px 22px' w='100%'>
                <Flex justify='space-between' mb='18px'>
                  <Flex align='center'>
                    <Checkbox me='16px' colorScheme='blue' size='lg' />
                    <Text color={textColor} fontSize='md' fontWeight='bold'>
                      New channel distribution
                    </Text>
                  </Flex>
                  <Icon
                    as={IoEllipsisHorizontalSharp}
                    color='gray.400'
                    w='20px'
                    h='20px'
                    cursor='pointer'
                  />
                </Flex>
                <Stack
                  direction='row'
                  spacing={{
                    sm: '20px',
                    md: '100px',
                    lg: '80px',
                    xl: '180px',
                  }}
                  ms={{ sm: '0px', md: '36px', lg: '0px', xl: '36px' }}
                >
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Date
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      22 July 2022
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Project
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      827d_kdl33D1s
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Company
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      Microsoft
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
            <HSeparator my='14px' />
            <Flex>
              <Flex
                bgColor='purple.500'
                borderRadius='12px'
                minWidth='3px'
                h='100%'
              />{' '}
              <Flex direction='column' p='12px 22px' w='100%'>
                <Flex justify='space-between' mb='18px'>
                  <Flex align='center'>
                    <Checkbox
                      me='16px'
                      colorScheme='blue'
                      size='lg'
                      defaultIsChecked
                    />
                    <Text color={textColor} fontSize='md' fontWeight='bold'>
                      IOS App development
                    </Text>
                  </Flex>
                  <Icon
                    as={IoEllipsisHorizontalSharp}
                    color='gray.400'
                    w='20px'
                    h='20px'
                    cursor='pointer'
                  />
                </Flex>
                <Stack
                  direction='row'
                  spacing={{
                    sm: '20px',
                    md: '100px',
                    lg: '80px',
                    xl: '180px',
                  }}
                  ms={{ sm: '0px', md: '36px', lg: '0px', xl: '36px' }}
                >
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Date
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      22 July 2022
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Project
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      88s1_349DA2sa
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Company
                    </Text>
                    <Text color='gray.500' fontWeight='bold' fontSize='md'>
                      Facebook
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Flex direction='column'>
          <Card
            mb='24px'
            maxW={{ sm: '330px', md: '100%' }}
            px={{ sm: '0px', lg: '22px' }}
          >
            <CardHeader>
              <Flex direction='column' w='100%'>
                <Flex
                  justify='space-between'
                  w='100%'
                  px={{ sm: '22px', lg: '0px' }}
                >
                  <Flex align='center'>
                    <IconBox h={'45px'} w={'45px'} bg={iconBlue} me='16px'>
                      <HomeIcon h={'24px'} w={'24px'} color={iconBoxInside} />
                    </IconBox>
                    <Flex direction='column'>
                      <Text color='gray.400' fontWeight='normal' fontSize='md'>
                        Tasks
                      </Text>
                      <Text color={textColor} fontWeight='bold' fontSize='xl'>
                        480
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction='column' alignSelf='flex-end' minW='125px'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      60%
                    </Text>
                    <Progress
                      colorScheme='blue'
                      size='sm'
                      borderRadius='15px'
                      value={60}
                    />
                  </Flex>
                </Flex>
                <LineChart
                  chartData={lineChartDataGeneral}
                  chartOptions={lineChartOptionsGeneral}
                />
              </Flex>
            </CardHeader>
          </Card>
          <Card maxW={{ sm: '330px', md: '100%' }}>
            <Flex justify='space-between' w='100%' minH='190px'>
              <Flex direction='column'>
                <Flex align='center'>
                  <IconBox h={'45px'} w={'45px'} bg={iconBlue} me='16px'>
                    <DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />
                  </IconBox>
                  <Flex direction='column'>
                    <Text color='gray.400' fontWeight='normal' fontSize='md'>
                      Projects
                    </Text>
                    <Text color={textColor} fontWeight='bold' fontSize='xl'>
                      115
                    </Text>
                  </Flex>
                </Flex>
                <Flex direction='column' mt='36px'>
                  <Flex align='center'>
                    <Icon
                      as={BsCircleFill}
                      color='blue.500'
                      w='10px'
                      h='10px'
                      me='8px'
                    />
                    <Text color={textColor} fontWeight='normal' fontSize='md'>
                      Done
                    </Text>
                  </Flex>
                  <Flex align='center'>
                    <Icon
                      as={BsCircleFill}
                      color='gray.400'
                      w='10px'
                      h='10px'
                      me='8px'
                    />
                    <Text color={textColor} fontWeight='normal' fontSize='md'>
                      In progress
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <DonutChart
                chartData={donutChartDataGeneral}
                chartOptions={donutChartOptionsGeneral}
              />
            </Flex>
          </Card>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default General;
