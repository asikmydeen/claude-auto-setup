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

import {
  Box,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TimelineRow(props) {
  const {
    logo,
    title,
    titleColor,
    date,
    color,
    index,
    tags,
    description,
    arrLength,
    isDark,
  } = props;
  const textColor = useColorModeValue("gray.700", "white.300");
  const { colorMode } = useColorMode();

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
      <Flex direction="column" h="100%">
        <Icon
          as={logo}
          color={isDark && colorMode === "dark" ? "white" : color}
          h={"30px"}
          w={"26px"}
          pe="6px"
          zIndex="1"
          position="relative"
          right={document.documentElement.dir === "rtl" ? "-8px" : ""}
          left={document.documentElement.dir === "rtl" ? "" : "-8px"}
        />
        <Box
          w="2px"
          bg="gray.200"
          minH={
            index === arrLength - 1
              ? "15px"
              : description
              ? { sm: "200px", md: "130px", lg: "150px", "2xl": "130px" }
              : "35px"
          }
        ></Box>
      </Flex>
      <Flex direction="column" justifyContent="flex-start" h="100%">
        <Text
          fontSize="sm"
          color={titleColor !== undefined ? titleColor : textColor}
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text
          fontSize="sm"
          color={isDark && colorMode === "dark" ? "white" : "gray.400"}
          fontWeight="normal"
          mb="14px"
        >
          {date}
        </Text>
        {description !== undefined ? (
          <Text
            fontSize="sm"
            color={isDark && colorMode === "dark" ? "white" : "gray.400"}
            fontWeight="normal"
            mb="6px"
            maxW="70%"
          >
            {description}
          </Text>
        ) : null}
        {tags !== undefined ? (
          <Stack direction="row" spacing="6px">
            {tags.map((tag, index) => {
              return (
                <Tag
                  bg={
                    isDark && colorMode === "dark" && tag.bgTag === "blue.500"
                      ? "white"
                      : tag.bgTag
                  }
                  fontSize="xs"
                  size="lg"
                  color={
                    isDark && colorMode === "dark" && tag.bgTag === "blue.500"
                      ? "blue.500"
                      : "white"
                  }
                  mb="16px"
                  borderRadius="8px"
                  alignSelf="flex-start"
                  key={index}
                >
                  {tag.titleTag}
                </Tag>
              );
            })}
          </Stack>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default TimelineRow;
