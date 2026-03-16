import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import bgWeather from "assets/img/BgMusicCard.png";
import bgWeatherDark from "assets/img/bgMusicCardDark.png";
import smartHome from "assets/img/smart-home.png";
import sunBehindCloud from "assets/img/sun-behind-cloud.png";
import Card from "components/Card/Card";
import BarChart from "components/Charts/BarChart";
import { HSeparator } from "components/Separator/Separator";
import VisxPieChart from "components/VisxPieChart/VisxPieChart";
import CircularSlider from "react-circular-slider-svg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiWater, BiWifi } from "react-icons/bi";
import { BsFillRecordCircleFill, BsThermometerHigh } from "react-icons/bs";
import { FaPlus, FaSnowflake } from "react-icons/fa";
import { IoBulbOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  barChartDataSmartHome,
  barChartOptionsSmartHome,
} from "variables/charts";
import { rooms } from "variables/general";

const SmartHome = () => {
  const { colorMode } = useColorMode();
  const [temperature, setTemperature] = useState(21);
  const [activeButton, setActiveButton] = useState({
    kitchen: true,
    living: false,
    attic: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("gray.700", "white");
  const bgButtonGroup = useColorModeValue("gray.50", "navy.700");
  const bgActiveButton = useColorModeValue("#fff", "navy.800");
  const arcBackgroundColor = useColorModeValue("#EDF2F7", "#0B1437");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("gray.400", "white");
  const bgIcon = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "navy.800"
  );

  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1.5fr 1fr" }} gap='20px'>
        <Card>
          <Flex
            direction={{ sm: "column", md: "row" }}
            justify='space-between'
            align={{ md: "center" }}
            mb='16px'>
            <Text
              color={textColor}
              fontSize='lg'
              fontWeight='bold'
              mb={{ sm: "12px", md: "0px" }}>
              Cameras
            </Text>
            <Flex align='center'>
              <Flex bg={bgButtonGroup} borderRadius='10px' p='6px' me='10px'>
                <Button
                  variant='no-effects'
                  w={{ sm: "fit-content", xl: "135px" }}
                  h='40px'
                  fontSize='xs'
                  boxShadow={
                    activeButton.kitchen
                      ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                      : "none"
                  }
                  bg={activeButton.kitchen ? bgActiveButton : "transparent"}
                  onClick={() =>
                    setActiveButton({
                      kitchen: true,
                      living: false,
                      attic: false,
                    })
                  }>
                  KITCHEN
                </Button>
                <Button
                  variant='no-effects'
                  w={{ sm: "fit-content", xl: "135px" }}
                  h='40px'
                  fontSize='xs'
                  boxShadow={
                    activeButton.living
                      ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                      : "none"
                  }
                  bg={activeButton.living ? bgActiveButton : "transparent"}
                  onClick={() =>
                    setActiveButton({
                      kitchen: false,
                      living: true,
                      attic: false,
                    })
                  }>
                  LIVING
                </Button>
                <Button
                  variant='no-effects'
                  w={{ sm: "fit-content", xl: "135px" }}
                  h='40px'
                  fontSize='xs'
                  boxShadow={
                    activeButton.attic
                      ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                      : "none"
                  }
                  bg={activeButton.attic ? bgActiveButton : "transparent"}
                  onClick={() =>
                    setActiveButton({
                      kitchen: false,
                      attic: true,
                      living: false,
                    })
                  }>
                  ATTIC
                </Button>
              </Flex>
              <Menu isOpen={isOpen} onClose={onClose}>
                <MenuButton onClick={onOpen}>
                  <Icon
                    as={IoEllipsisVerticalSharp}
                    color='gray.400'
                    w='20px'
                    h='20px'
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Action</MenuItem>
                  <MenuItem>Another action</MenuItem>
                  <MenuItem>Something else here</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Flex
            p='20px'
            justify='flex-end'
            borderRadius='15px'
            bgImage={smartHome}
            minH='390px'>
            <Flex
              p='6px 12px'
              align='center'
              h='fit-content'
              bg='rgba(255, 255, 255, 0.4)'
              borderRadius='8px'>
              <Icon
                as={BsFillRecordCircleFill}
                color='red.500'
                w='10px'
                h='10px'
                me='4px'
              />
              <Text color={textColor} fontSize='10px' fontWeight='bold'>
                RECORDING
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Flex direction='column' justify='space-between' h='100%'>
          <Card
            bgImage={colorMode === "light" ? bgWeather : bgWeatherDark}
            minH='140px'
            bgSize='cover'
            mb={{ sm: "20px", lg: "0px" }}>
            <Flex align='center' justify='space-between' h='100%'>
              <Flex direction='column'>
                <Text color='white' fontSize='xs' mb='3px'>
                  Weather Today
                </Text>
                <Text color='white' fontSize='lg' fontWeight='bold'>
                  San Francisco - 34°C
                </Text>
              </Flex>
              <Flex direction='column' align='center'>
                <Image src={sunBehindCloud} w='65px' h='65px' />
                <Text color='white' fontSize='xs' fontWeight='bold'>
                  Cloudly
                </Text>
              </Flex>
            </Flex>
          </Card>
          <Grid
            templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
            gap='20px'>
            <Card display='flex' justify='center' align='center' minH='155px'>
              <Flex direction='column'>
                <Text color='blue.500' fontSize='3xl' fontWeight='bold'>
                  23{" "}
                  <Text as='span' fontSize='sm'>
                    °C
                  </Text>
                </Text>
                <Text color={textColor} fontSize='lg' fontWeight='bold'>
                  Living Room
                </Text>
                <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                  Temperature
                </Text>
              </Flex>
            </Card>
            <Card display='flex' justify='center' align='center' minH='155px'>
              <Flex direction='column'>
                <Text color='blue.500' fontSize='3xl' fontWeight='bold'>
                  44{" "}
                  <Text as='span' fontSize='sm'>
                    %
                  </Text>
                </Text>
                <Text color={textColor} fontSize='lg' fontWeight='bold'>
                  Outside
                </Text>
                <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                  Humidity
                </Text>
              </Flex>
            </Card>
            <Card display='flex' justify='center' align='center' minH='155px'>
              <Flex direction='column'>
                <Text color='blue.500' fontSize='3xl' fontWeight='bold'>
                  87{" "}
                  <Text as='span' fontSize='sm'>
                    m³
                  </Text>
                </Text>
                <Text color={textColor} fontSize='lg' fontWeight='bold'>
                  Water
                </Text>
                <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                  Consumption
                </Text>
              </Flex>
            </Card>
            <Card display='flex' justify='center' align='center' minH='155px'>
              <Flex direction='column'>
                <Text color='blue.500' fontSize='3xl' fontWeight='bold'>
                  593{" "}
                  <Text as='span' fontSize='sm'>
                    GB
                  </Text>
                </Text>
                <Text color={textColor} fontSize='lg' fontWeight='bold'>
                  Internet
                </Text>
                <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                  All Devices
                </Text>
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Grid>
      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "1.5fr 1fr 1fr",
          xl: "2fr 1fr 1fr",
        }}
        gap='20px'
        my='20px'>
        <Card gridColumn={{ md: "1 / 3", lg: "auto" }}>
          <Flex justify='space-between' align='center' mb='30px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Consumption by Room
            </Text>
            <Icon
              as={AiOutlineInfoCircle}
              w='20px'
              h='20px'
              color={textColor}
            />
          </Flex>
          <Flex direction={{ sm: "column", md: "row" }} align='center'>
            <Box mb={{ sm: "12px", lg: "0px" }} color='red'>
              <VisxPieChart data={rooms} title={"473.1"} width={200} />
            </Box>
            <Stack
              direction='column'
              spacing='10px'
              ms={{ md: "50px", lg: "10px", xl: "50px" }}
              w='100%'>
              {rooms.map((room, index, arr) => {
                return (
                  <Flex
                    justify='space-between'
                    align='center'
                    key={index}
                    py='6px'
                    w='100%'
                    borderBottom={
                      index === arr.length - 1 ? "none" : "1px solid"
                    }
                    borderColor={borderColor}>
                    <Flex align='center'>
                      <Box
                        borderRadius='6px'
                        bg={room.color}
                        w='20px'
                        h='20px'
                        me='12px'
                      />
                      <Text color={textColor} fontWeight='bold' fontSize='xs'>
                        {room.name}
                      </Text>
                    </Flex>
                    <Text
                      color='gray.400'
                      fontSize='xs'
                      fontWeight='bold'>{`${room.percentage} %`}</Text>
                  </Flex>
                );
              })}
            </Stack>
          </Flex>
        </Card>
        <Card>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Consumption per Day
          </Text>
          <BarChart
            chartData={barChartDataSmartHome}
            chartOptions={barChartOptionsSmartHome}
          />
        </Card>
        <Card>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Device Limit
          </Text>
          <Flex
            direction='column'
            align='center'
            alignSelf='center'
            textAlign='center'
            position='relative'>
            <CircularSlider
              startAngle={45}
              endAngle={315}
              handleSize={6}
              minValue={16}
              maxValue={32}
              size={220}
              arcColor='#3182CE'
              arcBackgroundColor={arcBackgroundColor}
              handle1={{
                value: temperature,
                onChange: (v) => setTemperature(Math.round(v)),
              }}
            />
            <Text
              color={textColor}
              fontSize='32px'
              fontWeight='bold'
              position='absolute'
              top='35%'>{`${temperature} °C`}</Text>

            <Stack direction='row' spacing='16px'>
              <Text fontSize='xs' color='gray.400' fontWeight='bold'>
                16°C
              </Text>
              <Text fontSize='xs' color='gray.400' fontWeight='bold'>
                Temperature
              </Text>
              <Text fontSize='xs' color='gray.400' fontWeight='bold'>
                32°C
              </Text>
            </Stack>
          </Flex>
        </Card>
      </Grid>
      <HSeparator my='40px' />
      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap='20px'>
        <Card minH='210px'>
          <Flex direction='column' justify='space-between' h='100%'>
            <Flex justify='space-between' align='center' mb='auto'>
              <Text fontSize='xs' color='gray.400'>
                OFF
              </Text>
              <Switch colorScheme='blue' />
            </Flex>
            <Flex direction='column'>
              <Icon as={BiWater} color='gray.400' w='62px' h='62px' mb='10px' />
              <Text color={textColor} fontWeight='bold' mb='3px'>
                Humidity
              </Text>
              <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                Inactive since: 2 days
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card minH='210px' bg={bgIcon}>
          <Flex direction='column' justify='space-between' h='100%'>
            <Flex justify='space-between' align='center' mb='auto'>
              <Text fontSize='xs' color='gray.400'>
                ON
              </Text>
              <Switch colorScheme='blue' defaultChecked />
            </Flex>
            <Flex direction='column'>
              <Icon
                as={BsThermometerHigh}
                color={iconColor}
                w='62px'
                h='62px'
                mb='10px'
              />
              <Text color='white' fontWeight='bold' mb='3px'>
                Temperature
              </Text>
              <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                Active
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card minH='210px'>
          <Flex direction='column' justify='space-between' h='100%'>
            <Flex justify='space-between' align='center' mb='auto'>
              <Text fontSize='xs' color='gray.400'>
                OFF
              </Text>
              <Switch colorScheme='blue' />
            </Flex>
            <Flex direction='column'>
              <Icon
                as={FaSnowflake}
                color={iconColor}
                w='62px'
                h='62px'
                mb='10px'
              />
              <Text color={textColor} fontWeight='bold' mb='3px'>
                Air Conditioner
              </Text>
              <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                Inactive since: 1 hour
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card minH='210px'>
          <Flex direction='column' justify='space-between' h='100%'>
            <Flex justify='space-between' align='center' mb='auto'>
              <Text fontSize='xs' color='gray.400'>
                OFF
              </Text>
              <Switch colorScheme='blue' />
            </Flex>
            <Flex direction='column'>
              <Icon
                as={IoBulbOutline}
                color={iconColor}
                w='62px'
                h='62px'
                mb='10px'
              />
              <Text color={textColor} fontWeight='bold' mb='3px'>
                Lights
              </Text>
              <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                Inactive since: 27 min
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card minH='210px' bg={bgIcon}>
          <Flex direction='column' justify='space-between' h='100%'>
            <Flex justify='space-between' align='center' mb='auto'>
              <Text fontSize='xs' color='gray.400'>
                ON
              </Text>
              <Switch colorScheme='blue' defaultChecked />
            </Flex>
            <Flex direction='column'>
              <Icon as={BiWifi} color={iconColor} w='62px' h='62px' mb='10px' />
              <Text color='white' fontWeight='bold' mb='3px'>
                Wi-Fi
              </Text>
              <Text color='gray.400' fontSize='xs' fontWeight='bold'>
                Active
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card minH='210px' cursor='pointer'>
          <Flex direction='column' align='center' justify='center' h='100%'>
            <Icon as={FaPlus} color={iconColor} w='30px' h='30px' mb='11px' />
            <Text
              fontSize={{ sm: "lg", lg: "md", xl: "lg" }}
              color={iconColor}
              fontWeight='bold'>
              New Device
            </Text>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
};

export default SmartHome;
