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
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import BasicTable from "components/Tables/BasicTable";
import SearchTable1 from "components/Tables/SearchTable1";
import React from "react";
import { columnsData1 } from "variables/columnsData";
import tableData1 from "variables/tableData1.json";

function DataTables() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      <Card px="0px" mb="24px">
        <CardHeader px="22px" mb="24px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Datatable Simple
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              A lightweight, extendable, dependency-free javascript HTML table
              plugin.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <BasicTable tableData={tableData1} columnsData={columnsData1} />
        </CardBody>
      </Card>
      <Card px="0px">
        <CardHeader px="22px" mb="24px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Datatable Search
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              A lightweight, extendable, dependency-free javascript HTML table
              plugin.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <SearchTable1 tableData={tableData1} columnsData={columnsData1} />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default DataTables;
