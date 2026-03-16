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
  Button,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import bgCardReports from "assets/img/background-card-reports.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import { CartIcon, RocketIcon } from "components/Icons/Icons";
import TablesReportsRow from "components/Tables/TablesReportsRow";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { tablesReportsData } from "variables/general";

function Reports() {
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("blue.900", "blue.500");
  const bgProgress = useColorModeValue("gray.200", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();

  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap="24px" mb="24px">
        <Grid
          templateColumns={{ md: "repeat(2, 1fr)" }}
          templateRows={{ md: "repeat(2, 1fr)" }}
          gap="24px"
        >
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                  <Menu isOpen={isOpen1} onClose={onClose1}>
                    <MenuButton onClick={onOpen1} alignSelf="flex-start">
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color={iconColor}
                        w="20px"
                        h="20px"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Action</MenuItem>
                      <MenuItem>Another action</MenuItem>
                      <MenuItem>Something else here</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      1600
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Users Active
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +55%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={RocketIcon} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                  <Menu isOpen={isOpen2} onClose={onClose2}>
                    <MenuButton onClick={onOpen2} alignSelf="flex-start">
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color={iconColor}
                        w="20px"
                        h="20px"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Action</MenuItem>
                      <MenuItem>Another action</MenuItem>
                      <MenuItem>Something else here</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      357
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Click Events
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +124%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={CartIcon} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                  <Menu isOpen={isOpen3} onClose={onClose3}>
                    <MenuButton onClick={onOpen3} alignSelf="flex-start">
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color={iconColor}
                        w="20px"
                        h="20px"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Action</MenuItem>
                      <MenuItem>Another action</MenuItem>
                      <MenuItem>Something else here</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      2340
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Purchases
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +14%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            bgPosition="cover"
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={AiFillLike} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                  <Menu isOpen={isOpen4} onClose={onClose4}>
                    <MenuButton onClick={onOpen4} alignSelf="flex-start">
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color={iconColor}
                        w="20px"
                        h="20px"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Action</MenuItem>
                      <MenuItem>Another action</MenuItem>
                      <MenuItem>Something else here</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      940
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Likes
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +90%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
        <Card>
          <CardHeader mb="24px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Reviews
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              <Stack direction="column" spacing="28px" w="100%" mb="40px">
                <Flex direction="column">
                  <Flex justify="space-between" mb="8px">
                    <Text fontSize="md" color="gray.400" fontWeight="500">
                      Positive Reviews
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="500">
                      80%
                    </Text>
                  </Flex>
                  <Progress
                    colorScheme="blue"
                    size="xs"
                    bg={bgProgress}
                    value={80}
                    borderRadius="15px"
                  ></Progress>
                </Flex>
                <Flex direction="column">
                  <Flex justify="space-between" mb="8px">
                    <Text fontSize="md" color="gray.400" fontWeight="500">
                      Neutral Reviews
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="500">
                      17%
                    </Text>
                  </Flex>
                  <Progress
                    bg={bgProgress}
                    colorScheme="gray"
                    size="xs"
                    value={17}
                    borderRadius="15px"
                  ></Progress>
                </Flex>
                <Flex direction="column">
                  <Flex justify="space-between" mb="8px">
                    <Text fontSize="md" color="gray.400" fontWeight="500">
                      Negative Reviews
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="500">
                      3%
                    </Text>
                  </Flex>
                  <Progress
                    bg={bgProgress}
                    colorScheme="red"
                    size="xs"
                    value={3}
                    borderRadius="15px"
                  ></Progress>
                </Flex>
              </Stack>
              <Flex
                justify="space-between"
                w="100%"
                direction={{ sm: "column", lg: "row" }}
              >
                <Text
                  color="gray.500"
                  fontSize="md"
                  maxW={{ lg: "65%" }}
                  mb={{ sm: "16px", lg: "0px" }}
                >
                  More than{" "}
                  <Text as="span" color={textColor} fontWeight="bold">
                    1,500,000 developers
                  </Text>{" "}
                  used Creative Tim's products and over{" "}
                  <Text as="span" color={textColor} fontWeight="bold">
                    700,000 projects
                  </Text>{" "}
                  were created.
                </Text>
                <Button variant="dark" p="12px 24px" alignSelf="flex-end">
                  VIEW ALL REVIEWS
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Card overflowX={{ sm: "scroll", lg: "hidden" }}>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px" color="gray.400">
                <Th ps="0px" color="gray.400" borderColor={borderColor}>
                  Name
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Function
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Review
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Email
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Employed
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Id
                </Th>
              </Tr>
            </Thead>
            <Tbody pb="0px">
              {tablesReportsData.map((row, index, arr) => {
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
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Reports;
