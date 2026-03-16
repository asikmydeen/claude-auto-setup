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
  Button,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar7 from "assets/img/avatars/avatar7.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import {
  AdobexdLogo,
  AtlassianLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import React, { useReducer } from "react";
import { BsPlus } from "react-icons/bs";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp, IoEllipsisVerticalSharp } from "react-icons/io5";

const reducer = (state, action) => {
  if (action.type === "SWITCH_ACTIVE") {
    if (action.payload === "overview") {
      const newState = {
        overview: true,
        teams: false,
        projects: false,
      };
      return newState;
    } else if (action.payload === "teams") {
      const newState = {
        overview: false,
        teams: true,
        projects: false,
      };
      return newState;
    } else if (action.payload === "projects") {
      const newState = {
        overview: false,
        teams: false,
        projects: true,
      };
      return newState;
    }
  }
  return state;
};

function Projects() {
  const [state, dispatch] = useReducer(reducer, {
    overview: false,
    teams: false,
    projects: true,
  });

  const { colorMode } = useColorMode();

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

  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const bgIconBox = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "navy.700"
  );
  const secondaryColor = useColorModeValue("gray.500", "white");

  return (
    <Flex direction="column" mt={{ sm: "150px", md: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="330px"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            src={avatar5}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              Alec Thompson
            </Text>
            <Text fontSize={{ sm: "sm", md: "md" }} color="gray.400">
              alec@simmmple.com
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        >
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ sm: "100%", lg: "135px" }}
              bg={
                state.overview
                  ? colorMode === "dark"
                    ? "navy.900"
                    : "#fff"
                  : null
              }
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              boxShadow={
                state.overview ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : null
              }
              cursor="pointer"
              transition="all .5s ease"
              onClick={() =>
                dispatch({ type: "SWITCH_ACTIVE", payload: "overview" })
              }
            >
              <Icon color={textColor} as={FaCube} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                OVERVIEW
              </Text>
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              mx={{ lg: "1rem" }}
              cursor="pointer"
              boxShadow={
                state.teams ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : null
              }
              bg={
                state.teams
                  ? colorMode === "dark"
                    ? "navy.900"
                    : "#fff"
                  : null
              }
              transition="all .5s ease"
              onClick={() =>
                dispatch({ type: "SWITCH_ACTIVE", payload: "teams" })
              }
            >
              <Icon color={textColor} as={IoDocumentsSharp} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                TEAMS
              </Text>
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              cursor="pointer"
              boxShadow={
                state.projects ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : null
              }
              bg={
                state.projects
                  ? colorMode === "dark"
                    ? "navy.900"
                    : "#fff"
                  : null
              }
              transition="all .5s ease"
              onClick={() =>
                dispatch({ type: "SWITCH_ACTIVE", payload: "projects" })
              }
            >
              <Icon color={textColor} as={FaPenFancy} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                PROJECTS
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" mb="44px" mt={{ sm: "16px", lg: "0px" }}>
        <Text fontSize="xl" color="white" fontWeight="bold" mb="16px">
          Some of Our Awesome Projects
        </Text>
        <Text fontSize="sm" color="white" fontWeight="normal">
          This is the paragraph where you can write more details about your
          projects. Keep you user engaged by providing meaningful information.
        </Text>
      </Flex>
      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, auto)",
          lg: "repeat(3, auto)",
        }}
        templateRows={{ md: "repeat(3, auto)", lg: "repeat(2, auto)" }}
        gap="30px"
      >
        <Card minH="100%" alignSelf="flex-start" minH="100%">
          <CardHeader mb="18px">
            <Flex justify="space-between" w="100%">
              <Flex>
                <IconBox bg={bgIconBox} w="70px" h="70px" me="22px">
                  <SlackLogo
                    w="40px"
                    h="40px"
                    alignSelf="center"
                    justifySelf="center"
                    transform="translate(5%)"
                  />
                </IconBox>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="8px"
                  >
                    Slack Bot
                  </Text>
                  <AvatarGroup size="xs">
                    <Avatar src={avatar1} />
                    <Avatar src={avatar2} />
                    <Avatar src={avatar3} />
                    <Avatar src={avatar4} />
                    <Avatar src={avatar7} />
                  </AvatarGroup>
                </Flex>
              </Flex>
              <Menu isOpen={isOpen1} onClose={onClose1}>
                <MenuButton onClick={onOpen1} alignSelf="flex-start">
                  <Icon
                    as={IoEllipsisVerticalSharp}
                    color="gray.400"
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
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                If everything I did failed - which it doesn't, I think that it
                actually succeeds.
              </Text>
              <HSeparator my="22px" />
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    5
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Participants
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    02.03.22
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Due Date
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="100%" alignSelf="flex-start">
          <CardHeader mb="18px">
            <Flex justify="space-between" w="100%">
              <Flex>
                <IconBox bg={bgIconBox} w="70px" h="70px" me="22px">
                  <SpotifyLogo
                    w="40px"
                    h="40px"
                    alignSelf="center"
                    justifySelf="center"
                    transform="translate(5%)"
                  />
                </IconBox>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="8px"
                  >
                    Premium Support
                  </Text>
                  <AvatarGroup size="xs">
                    <Avatar src={avatar2} />
                    <Avatar src={avatar3} />
                    <Avatar src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
              <Menu isOpen={isOpen2} onClose={onClose2}>
                <MenuButton onClick={onOpen2} alignSelf="flex-start">
                  <Icon
                    as={IoEllipsisVerticalSharp}
                    color="gray.400"
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
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                Pink is obviously a better color. Everyone’s born confident, and
                everything’s taken away from you.
              </Text>
              <HSeparator my="22px" />
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    3
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Participants
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    22.11.22
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Due Date
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="100%" alignSelf="flex-start">
          <CardHeader mb="18px">
            <Flex justify="space-between" w="100%">
              <Flex>
                <IconBox bg={bgIconBox} w="70px" h="70px" me="22px">
                  <AdobexdLogo
                    w="40px"
                    h="40px"
                    alignSelf="center"
                    justifySelf="center"
                    transform="translate(5%)"
                  />
                </IconBox>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="8px"
                  >
                    Design Tools
                  </Text>
                  <AvatarGroup size="xs">
                    <Avatar src={avatar1} />
                    <Avatar src={avatar2} />
                    <Avatar src={avatar3} />
                    <Avatar src={avatar4} />
                    <Avatar src={avatar2} />
                  </AvatarGroup>
                </Flex>
              </Flex>
              <Menu isOpen={isOpen3} onClose={onClose3}>
                <MenuButton onClick={onOpen3} alignSelf="flex-start">
                  <Icon
                    as={IoEllipsisVerticalSharp}
                    color="gray.400"
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
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                Constantly growing. We’re constantly making mistakes from which
                we learn and improve.
              </Text>
              <HSeparator my="22px" />
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    4
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Participants
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    06.03.21
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Due Date
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="100%" alignSelf="flex-start">
          <CardHeader mb="18px">
            <Flex justify="space-between" w="100%">
              <Flex>
                <IconBox bg={bgIconBox} w="70px" h="70px" me="22px">
                  <AtlassianLogo
                    w="40px"
                    h="40px"
                    alignSelf="center"
                    justifySelf="center"
                  />
                </IconBox>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="8px"
                  >
                    Looking Great
                  </Text>
                  <AvatarGroup size="xs">
                    <Avatar src={avatar3} />
                    <Avatar src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
              <Menu isOpen={isOpen4} onClose={onClose4}>
                <MenuButton onClick={onOpen4} alignSelf="flex-start">
                  <Icon
                    as={IoEllipsisVerticalSharp}
                    color="gray.400"
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
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                You have the opportunity to play this game of life you need to
                appreciate every moment.
              </Text>
              <HSeparator my="22px" />
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    6
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Participants
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    14.03.24
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Due Date
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="100%" alignSelf="flex-start">
          <CardHeader mb="18px">
            <Flex justify="space-between" w="100%">
              <Flex>
                <IconBox bg={bgIconBox} w="70px" h="70px" me="22px">
                  <JiraLogo
                    w="40px"
                    h="40px"
                    alignSelf="center"
                    justifySelf="center"
                  />
                </IconBox>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="8px"
                  >
                    Developer First
                  </Text>
                  <AvatarGroup size="xs">
                    <Avatar src={avatar2} />
                    <Avatar src={avatar3} />
                    <Avatar src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
              <Menu isOpen={isOpen5} onClose={onClose5}>
                <MenuButton onClick={onOpen5} alignSelf="flex-start">
                  <Icon
                    as={IoEllipsisVerticalSharp}
                    color="gray.400"
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
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                For standing out. But the time is now to be okay to be the
                greatest you.
              </Text>
              <HSeparator my="22px" />
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    4
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Participants
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    02.03.22
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="normal">
                    Due Date
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="100%">
          <CardBody h="100%">
            <Flex w="100%" h="100%">
              <Button variant="no-effects" w="100%" h="100%">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  color={secondaryColor}
                >
                  <Icon
                    as={BsPlus}
                    w="30px"
                    h="30px"
                    mb="12px"
                    fontWeight="bold"
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    Create a New Project
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Projects;
