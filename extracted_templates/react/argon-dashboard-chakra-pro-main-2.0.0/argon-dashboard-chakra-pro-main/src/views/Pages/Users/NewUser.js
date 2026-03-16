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

import React, { useRef, useState } from "react";

// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
// Assets
import { BsCircleFill } from "react-icons/bs";

function NewUser() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgTextarea = useColorModeValue("white", "navy.900");
  const borderColor = useColorModeValue("gray.200", "transparent");
  const placeholderColor = useColorModeValue("gray.300", "gray.400");
  const [activeBullets, setActiveBullets] = useState({
    userInfo: true,
    address: false,
    socials: false,
    profile: false,
  });

  const userInfoTab = useRef();
  const addressTab = useRef();
  const socialsTab = useRef();
  const profileTab = useRef();

  return (
    <Flex
      direction="column"
      minH="89vh"
      align="center"
      pt={{ sm: "120px", md: "75px" }}
    >
      <Tabs variant="unstyled" mt="24px">
        <TabList display="flex" align="center" justifyContent="center">
          <Tab
            ref={userInfoTab}
            _focus={{}}
            w={{ sm: "80px", md: "200px" }}
            onClick={() =>
              setActiveBullets({
                userInfo: true,
                address: false,
                socials: false,
                profile: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "80px", md: "200px" },
                height: "3px",
                bg: activeBullets.address ? "white" : "blue.300",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.userInfo ? "6px" : "4px", md: null },
                position: "absolute",
                bottom: activeBullets.userInfo ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.userInfo ? "white" : "blue.300"}
                w={activeBullets.userInfo ? "16px" : "12px"}
                h={activeBullets.userInfo ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.userInfo ? "white" : "blue.300"}
                fontWeight={activeBullets.userInfo ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
              >
                User Info
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={addressTab}
            _focus={{}}
            w={{ sm: "80px", md: "200px" }}
            onClick={() =>
              setActiveBullets({
                userInfo: true,
                address: true,
                socials: false,
                profile: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "80px", md: "200px" },
                height: "3px",
                bg: activeBullets.socials ? "white" : "blue.300",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.address ? "6px" : "4px", md: null },
                position: "absolute",
                bottom: activeBullets.address ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.address ? "white" : "blue.300"}
                w={activeBullets.address ? "16px" : "12px"}
                h={activeBullets.address ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.address ? "white" : "gray.300"}
                fontWeight={activeBullets.address ? "bold" : "normal"}
                transition="all .3s ease"
                _hover={{ color: "white" }}
                display={{ sm: "none", md: "block" }}
              >
                Address
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={socialsTab}
            _focus={{}}
            w={{ sm: "80px", md: "200px" }}
            onClick={() =>
              setActiveBullets({
                userInfo: true,
                address: true,
                socials: true,
                profile: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "80px", md: "200px" },
                height: "3px",
                bg: activeBullets.profile ? "white" : "blue.300",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.socials ? "6px" : "4px", md: null },
                position: "absolute",
                bottom: activeBullets.socials ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.socials ? "white" : "blue.300"}
                w={activeBullets.socials ? "16px" : "12px"}
                h={activeBullets.socials ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.socials ? "white" : "gray.300"}
                fontWeight={activeBullets.socials ? "bold" : "normal"}
                transition="all .3s ease"
                _hover={{ color: "white" }}
                display={{ sm: "none", md: "block" }}
              >
                Socials
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={profileTab}
            _focus={{}}
            w={{ sm: "80px", md: "200px" }}
            onClick={() =>
              setActiveBullets({
                userInfo: true,
                address: true,
                socials: true,
                profile: true,
              })
            }
          >
            <Flex direction="column" justify="center" align="center">
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.profile ? "white" : "blue.300"}
                w={activeBullets.profile ? "16px" : "12px"}
                h={activeBullets.profile ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.profile ? "white" : "gray.300"}
                fontWeight={activeBullets.profile ? "bold" : "normal"}
                transition="all .3s ease"
                _hover={{ color: "white" }}
                display={{ sm: "none", md: "block" }}
              >
                Profile
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="3px"
                  >
                    About Me
                  </Text>
                  <Text color="gray.400" fontWeight="normal" fontSize="sm">
                    Mandatory Informations
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Grid
                    templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
                    templateRows={{ md: "repeat(2, 1fr)" }}
                    gap="24px"
                  >
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        First Name
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Michael"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Last Name
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Jackson"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Company
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Simmmple"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Email address
                      </FormLabel>
                      <Input
                        variant="main"
                        type="email"
                        placeholder="eg. example@yahoo.com"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Password
                      </FormLabel>
                      <Input
                        variant="main"
                        type="password"
                        placeholder="******"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Repeat Password
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="******"
                        fontSize="xs"
                      />
                    </FormControl>
                  </Grid>
                  <Button
                    variant="dark"
                    alignSelf="flex-end"
                    mt="24px"
                    w="100px"
                    h="35px"
                    onClick={() => addressTab.current.click()}
                  >
                    NEXT
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="3px"
                >
                  Address
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px">
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Address 1
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Street 120"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Address 2
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Street 220"
                        fontSize="xs"
                      />
                    </FormControl>
                    <Grid
                      templateColumns={{ sm: "1fr 1fr", lg: "2fr 1fr 1fr" }}
                      gap="30px"
                    >
                      <FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          City
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="eg. Tokyo"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          State
                        </FormLabel>
                        <Input variant="main" placeholder="..." fontSize="xs" />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          ZIP
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="7 letters"
                          fontSize="xs"
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="light"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => userInfoTab.current.click()}
                    >
                      PREV
                    </Button>
                    <Button
                      variant="dark"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => socialsTab.current.click()}
                    >
                      NEXT
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="3px"
                >
                  Socials
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Grid
                    templateColumns="1fr"
                    templateRows="repeat(3, 1fr)"
                    gap="24px"
                  >
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Twitter Handle
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="@Argon"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Facebook Account
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="http://..."
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Instagram Account
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="http://..."
                        fontSize="xs"
                      />
                    </FormControl>
                  </Grid>
                  <Flex justify="space-between">
                    <Button
                      variant="light"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => addressTab.current.click()}
                    >
                      PREV
                    </Button>
                    <Button
                      variant="dark"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => profileTab.current.click()}
                    >
                      NEXT
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="3px"
                >
                  Profile
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="24px">
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Public Email
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Use an address you don't use frequently"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Bio
                      </FormLabel>
                      <Textarea
                        placeholder="Say a few words about who you are or what you are working on."
                        minH="120px"
                        bg={bgTextarea}
                        borderColor={borderColor}
                        _placeholder={{ color: placeholderColor }}
                        fontSize="xs"
                      />
                    </FormControl>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="light"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => socialsTab.current.click()}
                    >
                      PREV
                    </Button>
                    <Button variant="primary" mt="24px" w="100px" h="35px">
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        SEND
                      </Text>
                    </Button>
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

export default NewUser;
