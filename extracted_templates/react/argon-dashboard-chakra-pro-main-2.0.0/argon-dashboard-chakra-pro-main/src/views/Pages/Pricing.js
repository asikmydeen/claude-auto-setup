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

import React, { useState } from "react";
// Chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import basic from "assets/img/basic-auth.png";
import deloitteLogo from "assets/svg/deloitte-logo.svg";
import georgiaLogo from "assets/svg/georgia-logo.svg";
import googleLogo from "assets/svg/google-logo.svg";
import microsoftLogo from "assets/svg/microsoft-logo.svg";
import msnLogo from "assets/svg/msn-logo.svg";
import zohoLogo from "assets/svg/zoho-logo.svg";
import Card from "components/Card/Card";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Pricing() {
  const [activeButton, setActiveButton] = useState({
    monthly: true,
    yearly: false,
  });

  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.500", "white");
  const borderColor = useColorModeValue("border.200", "border.600");
  const bgActiveButton = useColorModeValue("#fff", "blue.500");
  const bgButtonGroup = useColorModeValue("gray.50", "navy.800");
  const bgTimesIcon = useColorModeValue("gray.700", "white");

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", xl: "50vh" }}
        w={{ sm: "calc(100vw - 25px)", md: "calc(100vw - 25px)" }}
        borderRadius={{ sm: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={basic}
        bgSize="cover"
        mx={{ sm: "auto" }}
        mt={{ sm: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="38px"
      >
        <Text fontSize="3xl" color="white" fontWeight="bold">
          See our pricing
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          maxW="300px"
        >
          You have Free Unlimited Updates and Premium Support on each package.
        </Text>
        <Flex bg={bgButtonGroup} p="6px" borderRadius="12px">
          <Button
            variant="no-effects"
            w="135px"
            h="40px"
            fontSize="xs"
            boxShadow={
              activeButton.monthly
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            bg={activeButton.monthly ? bgActiveButton : "transparent"}
            onClick={() => setActiveButton({ monthly: true, yearly: false })}
          >
            MONTHLY
          </Button>
          <Button
            variant="no-effects"
            w="135px"
            h="40px"
            fontSize="xs"
            boxShadow={
              activeButton.yearly ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : "none"
            }
            bg={activeButton.yearly ? bgActiveButton : "transparent"}
            onClick={() => setActiveButton({ monthly: false, yearly: true })}
          >
            YEARLY
          </Button>
        </Flex>
        <Stack
          direction={{ sm: "column", lg: "row" }}
          spacing="20px"
          mt="50px"
          mb="80px"
        >
          <Card
            boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.1)"}
            w={{ sm: "300px", md: "650px", lg: "300px" }}
          >
            <Flex direction="column" mb="30px" w="100%" align="center">
              <Tag size="sm">STARTER</Tag>
              <Text color={textColor} fontSize="5xl" fontWeight="bold">
                {activeButton.monthly ? "$59" : "$119"}
              </Text>
            </Flex>

            <Flex direction="column" w="100%">
              <Stack direction="column" spacing="16px" w="100%" mb="35px">
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    2 Team Members
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    20GB Cloud Storage
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaTimesCircle}
                    mr="8px"
                    color={bgTimesIcon}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Integration Help
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaTimesCircle}
                    mr="8px"
                    color={bgTimesIcon}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Sketch Files
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaTimesCircle}
                    mr="8px"
                    color={bgTimesIcon}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    API Access
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaTimesCircle}
                    mr="8px"
                    color={bgTimesIcon}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Complete Documentation
                  </Text>
                </Flex>
              </Stack>
              <Button variant="dark">JOIN NOW</Button>
            </Flex>
          </Card>
          <Card
            boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.1)"}
            w={{ sm: "300px", md: "650px", lg: "300px" }}
          >
            <Flex direction="column" w="100%" mb="30px" align="center">
              <Tag size="sm">PREMIUM</Tag>
              <Text color={textColor} fontSize="5xl" fontWeight="bold">
                {activeButton.monthly ? "$89" : "$159"}
              </Text>
            </Flex>

            <Flex direction="column" w="100%">
              <Stack direction="column" spacing="16px" w="100%" mb="35px">
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    10 Team Members
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    40GB Cloud Storage
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Integration Help
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Sketch Files
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaTimesCircle}
                    mr="8px"
                    color={bgTimesIcon}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    API Access
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaTimesCircle}
                    mr="8px"
                    color={bgTimesIcon}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Complete Documentation
                  </Text>
                </Flex>
              </Stack>
              <Button variant="primary">TRY PREMIUM</Button>
            </Flex>
          </Card>
          <Card
            boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.1)"}
            w={{ sm: "300px", md: "650px", lg: "300px" }}
          >
            <Flex direction="column" mb="30px" w="100%" align="center">
              <Tag size="sm">ENTERPRISE</Tag>
              <Text color={textColor} fontSize="5xl" fontWeight="bold">
                {activeButton.monthly ? "$99" : "$399"}
              </Text>
            </Flex>

            <Flex direction="column" w="100%">
              <Stack direction="column" spacing="16px" w="100%" mb="35px">
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Unlimited Team Members
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    100GB Cloud Storage
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Integration Help
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Sketch Files
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    API Access
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon
                    w="20px"
                    h="20px"
                    as={FaCheckCircle}
                    mr="8px"
                    color="blue.500"
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="md">
                    Complete Documentation
                  </Text>
                </Flex>
              </Stack>
              <Button variant="dark">JOIN NOW</Button>
            </Flex>
          </Card>
        </Stack>
        <Flex direction="column" mb="110px" justify="center" align="center">
          <Text
            color="gray.300"
            fontWeight="bold"
            fontSize="md"
            mb={{ sm: "32px", xl: "16px" }}
            maxW={{ sm: "250px", md: "100%" }}
            textAlign="center"
          >
            More than 50+ brands trust Chakra Soft UI
          </Text>
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 6 }}
            rows={{ sm: 3, md: 2, lg: 1 }}
            spacingX={{ sm: "65px", lg: "40px", xl: "65px" }}
            spacingY={{ sm: "30px" }}
          >
            <Image src={googleLogo} alignSelf="center" justifySelf="center" />
            <Image src={msnLogo} alignSelf="center" justifySelf="center" />
            <Image
              src={microsoftLogo}
              alignSelf="center"
              justifySelf="center"
            />
            <Image src={zohoLogo} alignSelf="center" justifySelf="center" />
            <Image src={georgiaLogo} alignSelf="center" justifySelf="center" />
            <Image src={deloitteLogo} alignSelf="center" justifySelf="center" />
          </SimpleGrid>
        </Flex>
        <Flex direction="column" mb={{ sm: "20px", lg: "60px" }}>
          <Flex direction="column" align="center" justify="center">
            <Text
              color={textColor}
              fontWeight="bold"
              fontSize={{ sm: "3xl", md: "4xl" }}
              mb="12px"
            >
              Frequently Asked Questions
            </Text>
            <Text
              color="gray.400"
              fontSize="md"
              fontWeight="normal"
              maxW={{ sm: "300px", lg: "500px" }}
            >
              A lot of people don't appreciate the moment until it’s passed. I'm
              not trying my hardest, and I'm not trying to do
            </Text>
          </Flex>
        </Flex>
        <Accordion
          allowToggle
          w={{ sm: "300px", md: "650px", xl: "930px" }}
          mb="16px"
        >
          <AccordionItem border="none">
            <AccordionButton
              _focus={{}}
              _hover={{}}
              p="40px 0px 20px 0px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Box flex="1" textAlign="left">
                <Text color={secondaryColor} fontWeight="bold" fontSize="lg">
                  How do I order?
                </Text>
              </Box>
              <AccordionIcon color={secondaryColor} />
            </AccordionButton>
            <AccordionPanel p="18px 0px 40px 0px">
              <Text
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                textAlign="left"
                alignSelf="flex-start"
                justifySelf="flex-start"
              >
                We’re not always in the position that we want to be at. We’re
                constantly growing. We’re constantly making mistakes. We’re
                constantly trying to express ourselves and actualize our dreams.
                If you have the opportunity to play this game of life you need
                to appreciate every moment. A lot of people don’t appreciate the
                moment until it’s passed.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none">
            <AccordionButton
              _focus={{}}
              _hover={{}}
              p="40px 0px 20px 0px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Box flex="1" textAlign="left">
                <Text color={secondaryColor} fontWeight="bold" fontSize="lg">
                  How can i make the payment?
                </Text>
              </Box>
              <AccordionIcon color={secondaryColor} />
            </AccordionButton>
            <AccordionPanel p="18px 0px 40px 0px">
              <Text
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                textAlign="left"
                alignSelf="flex-start"
                justifySelf="flex-start"
              >
                It really matters and then like it really doesn’t matter. What
                matters is the people who are sparked by it. And the people who
                are like offended by it, it doesn’t matter. Because it's about
                motivating the doers. Because I’m here to follow my dreams and
                inspire other people to follow their dreams, too. We’re not
                always in the position that we want to be at. We’re constantly
                growing. We’re constantly making mistakes. We’re constantly
                trying to express ourselves and actualize our dreams. If you
                have the opportunity to play this game of life you need to
                appreciate every moment. A lot of people don’t appreciate the
                moment until it’s passed.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none">
            <AccordionButton
              _focus={{}}
              _hover={{}}
              p="40px 0px 20px 0px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Box flex="1" textAlign="left">
                <Text color={secondaryColor} fontWeight="bold" fontSize="lg">
                  How much time does it take to receive the order?
                </Text>
              </Box>
              <AccordionIcon color={secondaryColor} />
            </AccordionButton>
            <AccordionPanel p="18px 0px 40px 0px">
              <Text
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                textAlign="left"
                alignSelf="flex-start"
                justifySelf="flex-start"
              >
                The time is now for it to be okay to be great. People in this
                world shun people for being great. For being a bright color. For
                standing out. But the time is now to be okay to be the greatest
                you. Would you believe in what you believe in, if you were the
                only one who believed it? If everything I did failed - which it
                doesn't, it actually succeeds - just the fact that I'm willing
                to fail is an inspiration. People are so scared to lose that
                they don't even try. Like, one thing people can't say is that
                I'm not trying, and I'm not trying my hardest, and I'm not
                trying to do the best way I know how.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none">
            <AccordionButton
              _focus={{}}
              _hover={{}}
              p="40px 0px 20px 0px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Box flex="1" textAlign="left">
                <Text color={secondaryColor} fontWeight="bold" fontSize="lg">
                  Can I resell the products?
                </Text>
              </Box>
              <AccordionIcon color={secondaryColor} />
            </AccordionButton>
            <AccordionPanel p="18px 0px 40px 0px">
              <Text
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                textAlign="left"
                alignSelf="flex-start"
                justifySelf="flex-start"
              >
                I always felt like I could do anything. That’s the main thing
                people are controlled by! Thoughts- their perception of
                themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you won’t do
                anything. I was taught I could do everything. If everything I
                did failed - which it doesn't, it actually succeeds - just the
                fact that I'm willing to fail is an inspiration. People are so
                scared to lose that they don't even try. Like, one thing people
                can't say is that I'm not trying, and I'm not trying my hardest,
                and I'm not trying to do the best way I know how.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none">
            <AccordionButton
              _focus={{}}
              _hover={{}}
              p="40px 0px 20px 0px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Box flex="1" textAlign="left">
                <Text color={secondaryColor} fontWeight="bold" fontSize="lg">
                  Where do I find the shipping details?
                </Text>
              </Box>
              <AccordionIcon color={secondaryColor} />
            </AccordionButton>
            <AccordionPanel p="18px 0px 40px 0px">
              <Text
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                textAlign="left"
                alignSelf="flex-start"
                justifySelf="flex-start"
              >
                There’s nothing I really wanted to do in life that I wasn’t able
                to get good at. That’s my skill. I’m not really specifically
                talented at anything except for the ability to learn. That’s
                what I do. That’s what I’m here for. Don’t be afraid to be wrong
                because you can’t learn anything from a compliment. I always
                felt like I could do anything. That’s the main thing people are
                controlled by! Thoughts- their perception of themselves! They're
                slowed down by their perception of themselves. If you're taught
                you can’t do anything, you won’t do anything. I was taught I
                could do everything.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
}

export default Pricing;
