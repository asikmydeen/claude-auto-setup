import React from "react";
import {
  Flex,
  Text,
  Stack,
  Grid,
  Image,
  Button,
  Icon,
  Input,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { HSeparator, VSeparator } from "components/Separator/Separator";

import Map from "components/Map/Map";

import bgAutomotiveCard from "assets/img/automotive-background-card.png";
import tesla from "assets/img/tesla.png";
import drake from "assets/img/drake.png";

import { FaMap, FaPlay, FaPowerOff } from "react-icons/fa";
import {
  AiFillCar,
  AiOutlineSearch,
  AiFillBackward,
  AiFillForward,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsBatteryCharging } from "react-icons/bs";
import { IoIosSpeedometer, IoIosMusicalNotes } from "react-icons/io";
import { IoHeadsetSharp, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { CgAppleWatch } from "react-icons/cg";
import { SpotifyLogo } from "components/Icons/Icons";

const Automotive = () => {

  const bgCard = useColorModeValue("linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)", "navy.800")

  return (
    <Flex direction="column" pt={{ base: "150px" }}>
      <Card
        bgImage={bgAutomotiveCard}
        bgSize="cover"
        p={{ sm: "22px", lg: "60px 40px", xl: "100px 80px" }}
      >
        <Flex
          justify="space-between"
          align={{ sm: "center", lg: "normal" }}
          w="100%"
          direction={{ sm: "column", lg: "row" }}
        >
          <Flex direction="column" my={{ sm: "10px", lg: "0px" }}>
            <Text color="white" fontSize="2xl" fontWeight="bold">
              Since Last Charge
            </Text>
            <HSeparator mt="11px" mb="25px" />
            <Stack
              direction="row"
              spacing="30px"
              justify={{ sm: "center", lg: "normal" }}
            >
              <Flex direction="column">
                <Text color="white" fontSize="xs">
                  Distance
                </Text>
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  145{" "}
                  <Text
                    as="span"
                    fontSize="10px"
                    display="inline-block"
                    transform="translateY(-50%)"
                  >
                    KM
                  </Text>
                </Text>
              </Flex>
              <Flex direction="column">
                <Text color="white" fontSize="xs">
                  Average Energy
                </Text>
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  300{" "}
                  <Text
                    as="span"
                    fontSize="10px"
                    display="inline-block"
                    transform="translateY(-50%)"
                  >
                    KW
                  </Text>
                </Text>
              </Flex>
            </Stack>
          </Flex>
          <Flex
            direction="column"
            textAlign="center"
            my={{ sm: "10px", lg: "0px" }}
          >
            <Image
              src={tesla}
              minW={{ md: "300px", lg: "450px" }}
              mt={{ lg: "-170px" }}
              mb="30px"
              display={{ sm: "none", md: "block" }}
            />
            <Text color="white" fontSize="lg" fontWeight="bold">
              Available Range{"  "}
              <Text as="span" fontSize="2xl">
                70{" "}
                <Text
                  as="span"
                  fontSize="10px"
                  display="inline-block"
                  transform="translateY(-50%)"
                >
                  %
                </Text>
              </Text>
            </Text>
          </Flex>
          <Flex direction="column" my={{ sm: "10px", lg: "0px" }}>
            <Text color="white" fontSize="2xl" fontWeight="bold">
              Nearest Charger
            </Text>
            <HSeparator mt="11px" mb="25px" />

            <Flex direction="row">
              <Text color="white" fontSize="xs" fontWeight="bold" me="52px">
                Miclan, DW <br />
                891 Limarenda road
              </Text>
              <Button
                p="9px"
                borderRadius="50%"
                variant="no-effects"
                bg="rgba(255, 255, 255, 0.15)"
                border="1px solid #fff"
              >
                <Icon as={FaMap} color="white" w="14px" h="14px" />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        my="20px"
        gap="20px"
      >
        <Flex
          align="center"
          p="18px"
          justify="space-between"
          bg="linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
          borderRadius="20px"
        >
          <Flex direction="column" me="auto">
            <Text fontSize="xs" color="white" mb="3px">
              Today's Trip
            </Text>
            <Text color="#fff" fontSize="lg" fontWeight="bold">
              143 KM
            </Text>
          </Flex>
          <IconBox bg="white" w="45px" h="45px">
            <Icon as={AiFillCar} color="blue.500" w="22px" h="22px" />
          </IconBox>
        </Flex>
        <Flex
          align="center"
          p="18px"
          justify="space-between"
          bg="linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
          borderRadius="20px"
        >
          <Flex direction="column" me="auto">
            <Text fontSize="xs" color="white" mb="3px">
              Battery Health
            </Text>
            <Text color="#fff" fontSize="lg" fontWeight="bold">
              99%
            </Text>
          </Flex>
          <IconBox bg="white" w="45px" h="45px">
            <Icon as={BsBatteryCharging} color="blue.500" w="22px" h="22px" />
          </IconBox>
        </Flex>
        <Flex
          align="center"
          p="18px"
          justify="space-between"
          bg="linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
          borderRadius="20px"
        >
          <Flex direction="column" me="auto">
            <Text fontSize="xs" color="white" mb="3px">
              Average Speed
            </Text>
            <Text color="#fff" fontSize="lg" fontWeight="bold">
              56 KM/h
            </Text>
          </Flex>
          <IconBox bg="white" w="45px" h="45px">
            <Icon as={IoIosSpeedometer} color="blue.500" w="22px" h="22px" />
          </IconBox>
        </Flex>
        <Flex
          align="center"
          p="18px"
          justify="space-between"
          bg="linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
          borderRadius="20px"
        >
          <Flex direction="column" me="auto">
            <Text fontSize="xs" color="white" mb="3px">
              Music Volume
            </Text>
            <Text color="#fff" fontSize="lg" fontWeight="bold">
              15 / 100
            </Text>
          </Flex>
          <IconBox bg="white" w="45px" h="45px">
            <Icon as={IoIosMusicalNotes} color="blue.500" w="22px" h="22px" />
          </IconBox>
        </Flex>
      </Grid>
      <Card
        bg={bgCard}
        px="0px"
      >
        <Flex
          direction={{ sm: "column", md: "row" }}
          justify="space-between"
          align="center"
          px="22px"
        >
          <Flex align="center">
            <Icon
              as={AiOutlineSearch}
              color="white"
              w="20px"
              h="20px"
              me="8px"
            />
            <Input
              placeholder="Search anything..."
              border={{}}
              _hover={{}}
              _focus={{}}
              color="white"
            />
          </Flex>
          <Stack direction="row" spacing="10px" align="center">
            <Icon as={IoHeadsetSharp} color="white" w="18px" h="18px" />
            <Icon as={FaPlay} color="white" w="18px" h="18px" />
            <Icon as={FaPowerOff} color="white" w="18px" h="18px" />
            <Icon as={CgAppleWatch} color="white" w="18px" h="18px" />
            <Text color="white" fontWeight="bold" fontSize="2xl">
              10:45
            </Text>
          </Stack>
        </Flex>
        <HSeparator my="22px" />
        <Flex
          direction={{ sm: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb="20px"
          px="22px"
        >
          <Flex align="center">
            <Text color="white" fontSize="2xl" fontWeight="bold" me="10px">
              11:43
            </Text>
            <Text color="gray.400" fontSize="xs" fontWeight="bold">
              Estimated arrival time
            </Text>
          </Flex>
          <VSeparator
            h="30px"
            bg="white"
            display={{ sm: "none", md: "block" }}
          />
          <Flex align="center">
            <Text color="white" fontSize="2xl" fontWeight="bold" me="10px">
              2.4{" "}
              <Text
                as="span"
                color="white"
                fontSize="10px"
                display="inline-block"
                transform="translateY(-50%)"
              >
                KM
              </Text>
            </Text>
            <Text color="gray.400" fontSize="xs" fontWeight="bold">
              Turn Right in 2.4 miles
            </Text>
          </Flex>
          <VSeparator
            h="30px"
            bg="white"
            display={{ sm: "none", md: "block" }}
          />
          <Flex align="center">
            <Text color="white" fontSize="2xl" fontWeight="bold" me="10px">
              6.7{" "}
              <Text
                as="span"
                color="white"
                fontSize="10px"
                display="inline-block"
                transform="translateY(-50%)"
              >
                KM
              </Text>
            </Text>
            <Text color="gray.400" fontSize="xs" fontWeight="bold">
              Distance to Starbucks
            </Text>
          </Flex>
        </Flex>
        <Map />
        <Flex
          direction={{ sm: "column", lg: "row" }}
          justify="space-between"
          align="center"
          my="20px"
          px="22px"
        >
          <Stack direction="row" spacing="15px" align="center">
            <Box position="relative">
              <Image src={drake} w="70px" h="70px" borderRadius="50%" />
              <SpotifyLogo
                w="25px"
                h="25px"
                position="absolute"
                right="-10px"
                transform="translateY(-70%)"
              />
            </Box>
            <Flex direction="column">
              <Text color="white" fontSize="sm" fontWeight="bold">
                Life Is Good (feat. Drake)
              </Text>
              <Text color="gray.400" fontSize="sm">
                Future, Drake - Hip-Hop
              </Text>
            </Flex>
          </Stack>
          <Stack direction="row" spacing="18px" my={{ sm: "15px", lg: "0px" }}>
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              borderRadius="50px"
              w="45px"
              h="45px"
            >
              <Icon as={AiFillBackward} color="#fff" w="26px" h="26px" />
            </Button>
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              borderRadius="50px"
              w="45px"
              h="45px"
            >
              <Icon as={FaPlay} color="#fff" w="18px" h="18px" />
            </Button>
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              borderRadius="50px"
              w="45px"
              h="45px"
            >
              <Icon as={AiFillForward} color="#fff" w="26px" h="26px" />
            </Button>
          </Stack>
          <Flex align="center">
            <Flex direction="column" me="80px">
              <Text color="gray.400" fontSize="xs" fontWeight="bold">
                Volume
              </Text>
              <RangeSlider
                aria-label={["max"]}
                colorScheme="blue"
                defaultValue={[30]}
                borderRadius="20px"
                w={{ sm: "130px", md: "250px", lg: "200px" }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
            </Flex>
            <Stack direction="row" spacing="12px" align="center">
              <Icon
                as={AiOutlineUnorderedList}
                color="white"
                w="18px"
                h="18px"
              />
              <Icon
                as={IoChatbubbleEllipsesSharp}
                color="white"
                w="18px"
                h="18px"
              />
            </Stack>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Automotive;
