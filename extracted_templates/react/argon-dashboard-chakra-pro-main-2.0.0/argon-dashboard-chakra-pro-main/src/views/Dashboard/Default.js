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
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import avatar10 from 'assets/img/avatars/avatar10.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import avatar4 from 'assets/img/avatars/avatar4.png';
import avatar5 from 'assets/img/avatars/avatar5.png';
import handBg from 'assets/img/hand-background.png';
import teamsImage from 'assets/img/teams-image.png';
// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { BitcoinLogo } from 'components/Icons/Icons';
// Custom icons
import {
  AdobexdLogo,
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  JiraLogo,
  RocketIcon,
  SettingsIcon,
  SlackLogo,
  SpotifyLogo,
  WalletIcon,
} from 'components/Icons/Icons.js';
import { HSeparator } from 'components/Separator/Separator';
import TablesReportsRow from 'components/Tables/TablesReportsRow';
import TablesTableRow from 'components/Tables/TablesTableRow';
import React from 'react';
import { AiFillLike, AiOutlinePlus } from 'react-icons/ai';
import {
  FaChevronDown,
  FaChevronUp,
  FaCommentDots,
  FaUser,
} from 'react-icons/fa';
import { IoMdShareAlt } from 'react-icons/io';
import { IoBulb } from 'react-icons/io5';
import { RiArrowDropRightLine } from 'react-icons/ri';
import {
  lineChartDataDefault,
  lineChartOptionsDefault,
} from 'variables/charts';
import { tablesReportsData, tablesTableData } from 'variables/general';

export default function Default() {
  // Chakra Color Mode
  const iconBlue = useColorModeValue('blue.500', 'blue.500');
  const iconBoxInside = useColorModeValue('white', 'white');
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardColor = useColorModeValue('gray.800', 'navy.800');
  const bgBox = useColorModeValue('gray.800', 'blue.500');

  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'
                >
                  Today's Money
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    $53,897
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius='50%' h={'45px'} w={'45px'} bg={iconBlue}>
                <WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                +3.48%{' '}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'
                >
                  Today's Users
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    $3,200
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius='50%' h={'45px'} w={'45px'} bg={iconBlue}>
                <GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                +5.2%{' '}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'
                >
                  New Clients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    +2,503
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius='50%' h={'45px'} w={'45px'} bg={iconBlue}>
                <DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='red.500' fontWeight='bold'>
                -2.82%{' '}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'
            >
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'
                >
                  Total Sales
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    $173,000
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius='50%' h={'45px'} w={'45px'} bg={iconBlue}>
                <CartIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                +8.12%{' '}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: '1fr', xl: '1fr 2fr' }}
        templateRows={{ xl: 'auto auto' }}
        maxW={{ sm: '1fr' }}
        gap='20px'
        mb='20px'
      >
        <Card
          p='40px'
          bgImage={handBg}
          minH={{ sm: '350px', lg: '500px' }}
          bgSize='cover'
          bgPosition='50%'
          bgRepeat='no-repeat'
        >
          <Flex direction='column' justifyContent='flex-end' h='100%'>
            <IconBox bg='white' w='38px' h='38px' mb='16px'>
              <Icon as={IoBulb} color='blue.500' w='17px' h='17px' />
            </IconBox>
            <Text fontSize='2xl' color='white' fontWeight='bold'>
              Get started with Argon
            </Text>
            <Text color='white' maxW={{ xl: '80%' }}>
              Start your development process with an innovative admin dashboard!
            </Text>
          </Flex>
        </Card>
        <Card p='28px 10px 0px 0px' mb={{ sm: '26px', lg: '0px' }}>
          <Flex direction='column' mb='20px' ps='22px' alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
              Sales Overview
            </Text>
            <Text fontSize='sm' fontWeight='medium' color='gray.400'>
              <Text as='span' color='green.400' fontWeight='bold'>
                (+5%) more
              </Text>{' '}
              in 2022
            </Text>
          </Flex>
          <Box w='100%' h={{ sm: '300px', xl: '100%' }} ps='8px'>
            <LineChart
              chartData={lineChartDataDefault}
              chartOptions={lineChartOptionsDefault}
            />
          </Box>
        </Card>
        <Card>
          <Flex direction='column'>
            <Text color={textColor} fontSize='lg' fontWeight='bold' mb='28px'>
              Team Members
            </Text>
            <Stack direction='column' spacing='20px'>
              <Flex justify='space-between' align='center' py='4px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar2}
                    borderRadius='12px'
                    w='50px'
                    h='50px'
                    me='14px'
                  />
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontSize='sm'
                      fontWeight='bold'
                      mb='4px'
                    >
                      Esthera Jackson
                    </Text>
                    <Badge
                      bg='green.100'
                      color='green.400'
                      fontSize='sm'
                      px='10px'
                      w='fit-content'
                      h='25px'
                      borderRadius='8px'
                    >
                      Online
                    </Badge>
                  </Flex>
                </Flex>
                <Button variant='outlined' w='70px'>
                  ADD
                </Button>
              </Flex>
              <Flex justify='space-between' align='center' py='4px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar3}
                    borderRadius='12px'
                    w='50px'
                    h='50px'
                    me='14px'
                  />
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontSize='sm'
                      fontWeight='bold'
                      mb='4px'
                    >
                      Esthera Jackson
                    </Text>
                    <Badge
                      bg={useColorModeValue('red.100', 'red.50')}
                      color={useColorModeValue('red.400', 'red.500')}
                      fontSize='sm'
                      px='10px'
                      w='fit-content'
                      h='25px'
                      textTransform='capitalise'
                      borderRadius='8px'
                    >
                      In meeting
                    </Badge>
                  </Flex>
                </Flex>
                <Button variant='outlined' w='70px'>
                  ADD
                </Button>
              </Flex>
              <Flex justify='space-between' align='center' py='4px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar4}
                    borderRadius='12px'
                    w='50px'
                    h='50px'
                    me='14px'
                  />
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontSize='sm'
                      fontWeight='bold'
                      mb='4px'
                    >
                      Esthera Jackson
                    </Text>
                    <Badge
                      bg={useColorModeValue('gray.100', 'navy.700')}
                      color={useColorModeValue('gray.400', 'white')}
                      fontSize='sm'
                      px='10px'
                      w='fit-content'
                      h='25px'
                      borderRadius='8px'
                    >
                      Offline
                    </Badge>
                  </Flex>
                </Flex>
                <Button variant='outlined' w='70px'>
                  ADD
                </Button>
              </Flex>
              <Flex justify='space-between' align='center' py='4px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar5}
                    borderRadius='12px'
                    w='50px'
                    h='50px'
                    me='14px'
                  />
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontSize='sm'
                      fontWeight='bold'
                      mb='4px'
                    >
                      Esthera Jackson
                    </Text>
                    <Badge
                      bg='green.100'
                      color='green.400'
                      fontSize='sm'
                      px='10px'
                      w='fit-content'
                      h='25px'
                      borderRadius='8px'
                    >
                      Online
                    </Badge>
                  </Flex>
                </Flex>
                <Button variant='outlined' w='70px'>
                  ADD
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Card>
        <Grid templateColumns={{ sm: '1fr', xl: 'repeat(2, 1fr)' }} gap='20px'>
          <Card>
            <Flex direction='column'>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='14px'>
                To Do List
              </Text>
              <Stack direction='column' spacing='14px'>
                <Flex
                  justify='space-between'
                  align='center'
                  borderBottom='1px solid'
                  borderColor={borderColor}
                  py='12px'
                >
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontWeight='bold'
                      fontSize='sm'
                      mb='3.5px'
                    >
                      Call with Dave
                    </Text>
                    <Text color='gray.400' fontSize='sm'>
                      09:30 AM
                    </Text>
                  </Flex>
                  <Checkbox colorScheme='blue' defaultChecked size='lg' />
                </Flex>
                <Flex
                  justify='space-between'
                  align='center'
                  borderBottom='1px solid'
                  borderColor={borderColor}
                  py='12px'
                >
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontWeight='bold'
                      fontSize='sm'
                      mb='3.5px'
                    >
                      Brunch Meeting
                    </Text>
                    <Text color='gray.400' fontSize='sm'>
                      11:00 AM
                    </Text>
                  </Flex>
                  <Checkbox colorScheme='blue' size='lg' />
                </Flex>
                <Flex
                  justify='space-between'
                  align='center'
                  borderBottom='1px solid'
                  borderColor={borderColor}
                  pt='12px'
                >
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontWeight='bold'
                      fontSize='sm'
                      mb='3.5px'
                    >
                      Argon Dashboard Launch
                    </Text>
                    <Text color='gray.400' fontSize='sm'>
                      02:00 PM
                    </Text>
                  </Flex>
                  <Checkbox colorScheme='blue' size='lg' />
                </Flex>
                <Flex justify='space-between' align='center' py='14px'>
                  <Flex direction='column'>
                    <Text
                      color={textColor}
                      fontWeight='bold'
                      fontSize='sm'
                      mb='3.5px'
                    >
                      Winter Hackaton
                    </Text>
                    <Text color='gray.400' fontSize='sm'>
                      11:30 AM
                    </Text>
                  </Flex>
                  <Checkbox colorScheme='blue' defaultChecked size='lg' />
                </Flex>
              </Stack>
            </Flex>
          </Card>
          <Card>
            <Flex direction='column' w='100%'>
              <Text color={textColor} fontSize='lg' fontWeight='bold' mb='14px'>
                Progress Track
              </Text>
              <Stack direction='column' spacing='14px' w='100%'>
                <Flex
                  align='center'
                  borderBottom='1px solid'
                  borderColor={borderColor}
                  py='16px'
                >
                  <JiraLogo w='40px' h='40px' me='18px' />
                  <Flex direction='column' w='100%'>
                    <Text
                      fontSize='sm'
                      color={textColor}
                      fontWeight='bold'
                      mb='10px'
                    >
                      React Material Dashboard
                    </Text>
                    <Progress colorScheme='blue' size='xs' value={70} />
                  </Flex>
                </Flex>
                <Flex
                  align='center'
                  borderBottom='1px solid'
                  borderColor={borderColor}
                  py='16px'
                >
                  <AdobexdLogo w='40px' h='40px' me='18px' />
                  <Flex direction='column' w='100%'>
                    <Text
                      fontSize='sm'
                      color={textColor}
                      fontWeight='bold'
                      mb='10px'
                    >
                      Argon Design System
                    </Text>
                    <Progress colorScheme='pink' size='xs' value={40} />
                  </Flex>
                </Flex>
                <Flex
                  align='center'
                  borderBottom='1px solid'
                  borderColor={borderColor}
                  py='16px'
                >
                  <SpotifyLogo w='40px' h='40px' me='18px' />
                  <Flex direction='column' w='100%'>
                    <Text
                      fontSize='sm'
                      color={textColor}
                      fontWeight='bold'
                      mb='10px'
                    >
                      VueJs Now UI Kit PRO
                    </Text>
                    <Progress colorScheme='green' size='xs' value={70} />
                  </Flex>
                </Flex>
                <Flex align='center' pt='14px'>
                  <SlackLogo w='40px' h='40px' me='18px' />
                  <Flex direction='column' w='100%'>
                    <Text
                      fontSize='sm'
                      color={textColor}
                      fontWeight='bold'
                      mb='10px'
                    >
                      Soft UI Dashboard
                    </Text>
                    <Progress colorScheme='purple' size='xs' value={70} />
                  </Flex>
                </Flex>
              </Stack>
            </Flex>
          </Card>
        </Grid>
      </Grid>
      <Grid
        templateColumns={{ sm: '320px', md: '1fr', xl: '1fr 2fr' }}
        gap='20px'
      >
        <Card alignSelf={{ lg: 'flex-start', '2xl': 'stretch' }}>
          <Flex justify='space-between' align='center' w='100%'>
            <Flex>
              <Box>
                <Avatar
                  src={avatar4}
                  w='40px'
                  h='40px'
                  borderRadius='12px'
                  me='15px'
                />
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color={textColor} fontWeight='bold'>
                  Esthera Jackson
                </Text>
                <Text fontSize='sm' color='gray.500' fontWeight='normal'>
                  3 days ago
                </Text>
              </Flex>
            </Flex>
            <Button variant='primary' p='8px 32px'>
              <Flex align='center' color='#fff' justifyContent='center'>
                <Icon
                  as={AiOutlinePlus}
                  w='18px'
                  h='18px'
                  fontWeight='bold'
                  me='4px'
                />
                FOLLOW
              </Flex>
            </Button>
          </Flex>
          <HSeparator my='16px' />
          <Flex direction='column'>
            <Text color='gray.400' fontWeight='normal' fontSize='md' mb='24px'>
              Personal profiles are the perfect way for you to grab their
              attention and persuade recruiters to continue reading your CV
              because you’re telling them from the off exactly why they should
              hire you.
            </Text>
            <Image
              src={teamsImage}
              minW={{ sm: '270px' }}
              h='auto'
              borderRadius='12px'
            />
            <Flex justify='space-between' align='center' my='6px'>
              <Stack spacing='20px' direction='row' my='18px'>
                <Flex align='center' color='gray.500'>
                  <Icon
                    as={AiFillLike}
                    w='18px'
                    h='18px'
                    me='4px'
                    cursor='pointer'
                  />
                  <Text fontSize='md'>1502</Text>
                </Flex>
                <Flex align='center' color='gray.500'>
                  <Icon
                    as={FaCommentDots}
                    w='18px'
                    h='18px'
                    me='4px'
                    cursor='pointer'
                  />
                  <Text fontSize='md'>36</Text>
                </Flex>
                <Flex align='center' color='gray.500'>
                  <Icon
                    as={IoMdShareAlt}
                    w='18px'
                    h='18px'
                    me='4px'
                    cursor='pointer'
                  />
                  <Text fontSize='md'>12</Text>
                </Flex>
              </Stack>
              <Flex
                align='center'
                display={{ sm: 'none', md: 'flex' }}
                direction='row'
              >
                <AvatarGroup size='xs' me='6px'>
                  <Avatar src={avatar2} />
                  <Avatar src={avatar3} />
                  <Avatar src={avatar4} />
                  <Avatar src={avatar5} />
                </AvatarGroup>
                <Text color='gray.500' fontWeight='normal' fontSize='sm'>
                  and 30+ more
                </Text>
              </Flex>
            </Flex>
            <HSeparator mb='26px' />
            <Flex mb='30px'>
              <Box>
                <Avatar src={avatar10} w='50px' h='50px' me='15px' />
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color={textColor} fontWeight='bold'>
                  Michael Lewis
                </Text>
                <Text
                  color='gray.500'
                  fontWeight='normal'
                  fontSize='md'
                  mt='6px'
                  mb='14px'
                >
                  I always felt like I could do anything. That’s the main thing
                  people are controlled by! Thoughts- their perception of
                  themselves!
                </Text>
                <Flex>
                  <Flex align='center' color='gray.500' me='21px'>
                    <Icon
                      as={AiFillLike}
                      w='18px'
                      h='18px'
                      me='4px'
                      cursor='pointer'
                    />
                    <Text fontSize='md'>3 likes</Text>
                  </Flex>
                  <Flex align='center' color='gray.500'>
                    <Icon
                      as={IoMdShareAlt}
                      w='18px'
                      h='18px'
                      me='4px'
                      cursor='pointer'
                    />
                    <Text fontSize='md'>2 shares</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex mb='30px'>
              <Box>
                <Avatar src={avatar10} w='50px' h='50px' me='15px' />
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color={textColor} fontWeight='bold'>
                  Jessica Stones
                </Text>
                <Text
                  color='gray.500'
                  fontWeight='normal'
                  fontSize='md'
                  mt='6px'
                  mb='14px'
                >
                  Society has put up so many boundaries, so many limitations on
                  what’s right and wrong that it’s almost impossible to get a
                  pure thought out. It’s like a little kid, a little boy.
                </Text>
                <Flex>
                  <Flex align='center' color='gray.500' me='21px'>
                    <Icon
                      as={AiFillLike}
                      w='18px'
                      h='18px'
                      me='4px'
                      cursor='pointer'
                    />
                    <Text fontSize='md'>10 likes</Text>
                  </Flex>
                  <Flex align='center' color='gray.500'>
                    <Icon
                      as={IoMdShareAlt}
                      w='18px'
                      h='18px'
                      me='4px'
                      cursor='pointer'
                    />
                    <Text fontSize='md'>1 share</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex mb='30px'>
              <Box>
                <Avatar src={avatar10} w='50px' h='50px' me='15px' />
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color={textColor} fontWeight='bold'>
                  Anthony Joshua
                </Text>
                <Text
                  color='gray.500'
                  fontWeight='normal'
                  fontSize='md'
                  mt='6px'
                  mb='14px'
                >
                  It's all about work ! Great ideas mean nothing if they aren't
                  realised by hungry, desiring people.
                </Text>
                <Flex>
                  <Flex align='center' color='gray.500' me='21px'>
                    <Icon
                      as={AiFillLike}
                      w='18px'
                      h='18px'
                      me='4px'
                      cursor='pointer'
                    />
                    <Text fontSize='md'>42 likes</Text>
                  </Flex>
                  <Flex align='center' color='gray.500'>
                    <Icon
                      as={IoMdShareAlt}
                      w='18px'
                      h='18px'
                      me='4px'
                      cursor='pointer'
                    />
                    <Text fontSize='md'>6 shares</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex align='center'>
              <Box>
                <Avatar src={avatar4} w='50px' h='50px' me='15px' />
              </Box>
              <Input placeholder='Write your comment...' variant='main' />
            </Flex>
          </Flex>
        </Card>
        <Grid
          templateColumns={{ sm: '320px', md: '1fr' }}
          templateRows='repeat(3, auto)'
          gap='20px'
        >
          <Card overflowX={{ sm: 'scroll', lg: 'hidden' }} pb='0px'>
            <CardBody>
              <Table variant='simple' color={textColor}>
                <Thead>
                  <Tr my='.8rem' pl='0px' color='gray.400'>
                    <Th
                      pl='0px'
                      borderColor={borderColor}
                      color='gray.400'
                      px={{ xl: '0px', '2xl': '20px' }}
                    >
                      Author
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color='gray.400'
                      px={{ xl: '0px', '2xl': '20px' }}
                    >
                      Function
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color='gray.400'
                      px={{ xl: '0px', '2xl': '20px' }}
                    >
                      Review
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color='gray.400'
                      px={{ xl: '0px', '2xl': '20px' }}
                    >
                      Employed
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color='gray.400'
                      px={{ xl: '0px', '2xl': '20px' }}
                    >
                      Date
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color='gray.400'
                      px={{ xl: '0px', '2xl': '20px' }}
                    >
                      Id
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tablesReportsData
                    .filter((_, idx) => idx < 4)
                    .map((row, index, arr) => {
                      return (
                        <TablesReportsRow
                          name={row.name}
                          image={row.image}
                          email={row.email}
                          domain={row.domain}
                          review={row.review}
                          employed={row.employed}
                          id={row.id}
                          isLast={index === arr.length - 1 ? true : false}
                          paddingY={'0px'}
                          key={index}
                        />
                      );
                    })}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
          <Grid
            templateColumns={{
              sm: '320px',
              md: '1fr 1fr',
              xl: 'repeat(2, 1fr)',
            }}
            gap='20px'
          >
            <Card bg={cardColor} py='40px'>
              <Flex direction='column'>
                <Text color='white' mb='18px' fontSize='4xl' fontWeight='bold'>
                  <Text as='span' fontSize='lg'>
                    ${' '}
                  </Text>
                  3,300
                </Text>
                <Text color='gray.200' mb='10px'>
                  Your current balance
                </Text>
                <Text color='gray.200' fontSize='xl' mb='30px'>
                  <Text as='span' color='green.400' fontWeight='bold'>
                    +15%{' '}
                  </Text>
                  ($250)
                </Text>
                <Button variant='light' mb='36px'>
                  ADD CREDIT
                </Button>
                <Grid templateColumns='repeat(2, 1fr)' gap='20px'>
                  <Flex direction='column'>
                    <Text
                      color='gray.200'
                      fontSize='sm'
                      fontWeight='bold'
                      mb='4px'
                    >
                      Orders: 60%
                    </Text>
                    <Progress colorScheme='blue' value={60} size='xs' />
                  </Flex>
                  <Flex direction='column'>
                    <Text
                      color='gray.200'
                      fontSize='sm'
                      fontWeight='bold'
                      mb='4px'
                    >
                      Sales: 40%
                    </Text>
                    <Progress colorScheme='green' value={40} size='xs' />
                  </Flex>
                </Grid>
              </Flex>
            </Card>
            <Card
              bg='linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)'
              py='40px'
            >
              <Flex direction='column'>
                <Flex justify='space-between' align='center' w='100%' mb='45px'>
                  <BitcoinLogo w='67px' h='14px' />
                  <Badge
                    bg='green.100'
                    color='green.400'
                    fontSize='sm'
                    px='10px'
                    w='fit-content'
                    h='25px'
                    borderRadius='8px'
                  >
                    Active
                  </Badge>
                </Flex>
                <Text color='gray.200' mb='10px'>
                  Address
                </Text>
                <Text fontSize='xl' color='white' fontWeight='bold' mb='65px'>
                  0yx8Wkasd8uWpa083Jj81qZhs923K21
                </Text>
                <Flex justify='space-between' w='100%'>
                  <Flex direction='column'>
                    <Text color='gray.200' mb='10px'>
                      Name
                    </Text>
                    <Text color='white' fontWeight='bold' fontSize='lg'>
                      John Snow
                    </Text>
                  </Flex>
                  <Stack direction='row' spacing='6px'>
                    <IconBox bg='white' w='40px' h='40px'>
                      <Icon
                        as={FaChevronDown}
                        color='blue.500'
                        w='20px'
                        h='20px'
                      />
                    </IconBox>
                    <IconBox bg='white' w='40px' h='40px'>
                      <Icon
                        as={FaChevronUp}
                        color='blue.500'
                        w='20px'
                        h='20px'
                      />
                    </IconBox>
                    <IconBox bg='white' w='40px' h='40px'>
                      <Icon
                        as={IoMdShareAlt}
                        color='blue.500'
                        w='20px'
                        h='20px'
                      />
                    </IconBox>
                  </Stack>
                </Flex>
              </Flex>
            </Card>
          </Grid>
          <Card px='0px'>
            <CardHeader px='22px' mb='32px'>
              <Text color={textColor} fontSize='lg' fontWeight='bold'>
                Sales by Country
              </Text>
            </CardHeader>
            <CardBody overflowX={{ sm: 'scroll', md: 'hidden' }}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th
                      color='gray.400'
                      fontSize='10px'
                      borderColor={borderColor}
                    >
                      Country:
                    </Th>
                    <Th
                      color='gray.400'
                      fontSize='10px'
                      borderColor={borderColor}
                    >
                      Sales:
                    </Th>
                    <Th
                      color='gray.400'
                      fontSize='10px'
                      borderColor={borderColor}
                    >
                      Value:
                    </Th>
                    <Th
                      color='gray.400'
                      fontSize='10px'
                      borderColor={borderColor}
                    >
                      Bounce:
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td minW='180px' borderColor={borderColor}>
                      <Stack direction='row' spacing='16px'>
                        <Text>🇺🇸</Text>
                        <Text color={textColor} fontSize='sm' fontWeight='bold'>
                          United States
                        </Text>
                      </Stack>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        2500
                      </Text>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        $214,000
                      </Text>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        40,22%
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderColor={borderColor}>
                      <Stack direction='row' spacing='16px'>
                        <Text>🇩🇪</Text>
                        <Text color={textColor} fontSize='sm' fontWeight='bold'>
                          Germany
                        </Text>
                      </Stack>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        3900
                      </Text>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        $446,700
                      </Text>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        19,22%
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderColor={borderColor}>
                      <Stack direction='row' spacing='16px'>
                        <Text>🇬🇧</Text>
                        <Text color={textColor} fontSize='sm' fontWeight='bold'>
                          Great Britain
                        </Text>
                      </Stack>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        1300
                      </Text>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        $121,900
                      </Text>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        39,22%
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td border='none'>
                      <Stack direction='row' spacing='16px'>
                        <Text>🇧🇷</Text>
                        <Text color={textColor} fontSize='sm' fontWeight='bold'>
                          Brasil
                        </Text>
                      </Stack>
                    </Td>
                    <Td border='none'>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        920
                      </Text>
                    </Td>
                    <Td border='none'>
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        $52,100
                      </Text>
                    </Td>
                    <Td border='none'>
                      {' '}
                      <Text color={textColor} fontSize='sm' fontWeight='bold'>
                        29,9%
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
      <Grid
        templateColumns={{ sm: '1fr', xl: '2.5fr 1fr' }}
        gap='20px'
        mt='20px'
      >
        <Card overflowX={{ sm: 'scroll', xl: 'hidden' }} pb='0px'>
          <CardBody>
            <Table variant='simple' color={textColor}>
              <Thead>
                <Tr my='.8rem' pl='0px' color='gray.400'>
                  <Th pl='0px' borderColor={borderColor} color='gray.400'>
                    Author
                  </Th>
                  <Th borderColor={borderColor} color='gray.400'>
                    Function
                  </Th>
                  <Th borderColor={borderColor} color='gray.400'>
                    Status
                  </Th>
                  <Th borderColor={borderColor} color='gray.400'>
                    Employed
                  </Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {tablesTableData.map((row, index, arr) => {
                  return (
                    <React.Fragment key={index}>
                      <TablesTableRow
                        name={row.name}
                        logo={row.logo}
                        email={row.email}
                        subdomain={row.subdomain}
                        domain={row.domain}
                        status={row.status}
                        date={row.date}
                        paddingY={'0px'}
                        isLast={index === arr.length - 1 ? true : false}
                      />
                    </React.Fragment>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Text fontSize='lg' text={textColor} fontWeight='bold'>
              Categories
            </Text>
          </CardHeader>
          <CardBody w='100%' pt='28px'>
            <Stack direction='column' spacing='24px' w='100%'>
              <Flex align='center' w='100%' py='14px'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={bgBox} me='18px'>
                    <RocketIcon h={'20px'} w={'20px'} color={iconBoxInside} />
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
              <Flex align='center' w='100%' py='14px'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={bgBox} me='18px'>
                    <SettingsIcon h={'20px'} w={'20px'} color={iconBoxInside} />
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
              <Flex align='center' w='100%' py='14px'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={bgBox} me='18px'>
                    <DocumentIcon h={'20px'} w={'20px'} color={iconBoxInside} />
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
              <Flex align='center' w='100%' py='14px'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={bgBox} me='18px'>
                    <Icon
                      as={FaUser}
                      h={'20px'}
                      w={'20px'}
                      color={iconBoxInside}
                    />
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
              <Flex align='center' w='100%' py='14px'>
                <Flex align='center'>
                  <IconBox h={'40px'} w={'40px'} bg={bgBox} me='18px'>
                    <SettingsIcon h={'20px'} w={'20px'} color={iconBoxInside} />
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
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
