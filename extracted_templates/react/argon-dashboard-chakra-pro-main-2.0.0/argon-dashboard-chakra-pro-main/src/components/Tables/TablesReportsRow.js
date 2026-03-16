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
  Avatar,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BsCircleFill } from "react-icons/bs";

function TablesReportsRow(props) {
  const {
    image,
    name,
    email,
    domain,
    review,
    employed,
    id,
    isLast,
    paddingY,
  } = props;
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const mainColor = useColorModeValue("gray.500", "white");

  return (
    <Tr border="none">
      <Td
        borderColor={borderColor}
        minW={{ sm: "220px", xl: "180px", "2xl": "220px" }}
        ps="0px"
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Flex
          align="center"
          py={paddingY ? paddingY : ".8rem"}
          minWidth="100%"
          flexWrap="nowrap"
        >
          <Avatar
            src={image}
            borderRadius="12px"
            me={{ sm: "18px", xl: "6px", "2xl": "18px" }}
          />
          <Text
            fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "150px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Flex direction="column">
          <Text
            fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
            color={mainColor}
            fontWeight="bold"
          >
            {domain}
          </Text>
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "120px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Flex align="center">
          <Icon
            as={BsCircleFill}
            w="8px"
            h="8px"
            color={
              review === "Positive"
                ? "teal.300"
                : review === "Negative"
                ? "red.500"
                : "gray.700"
            }
            me="6px"
          />
          <Text
            color={secondaryColor}
            fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          >
            {review}
          </Text>
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "200px", lg: "170px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {email}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "170px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {employed}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "170px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {id}
        </Text>
      </Td>
    </Tr>
  );
}

export default TablesReportsRow;
