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

import React from 'react';

// Chakra imports
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  LightMode,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import { IoIosArrowDown } from 'react-icons/io';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import SearchTable2 from 'components/Tables/SearchTable2';
import { columnsData2 } from 'variables/columnsData';
import tableData2 from 'variables/tableData2.json';

function OrderList() {
  return (
    <Flex direction='column' pt={{ sm: '125px', md: '75px' }}>
      <Flex
        direction={{ sm: 'column', md: 'row' }}
        justify='space-between'
        align='center'
        w='100%'
        mb='24px'
      >
        <Button
          variant='no-effects'
          bg={useColorModeValue('gray.700', 'white')}
          w='125px'
          h='35px'
          color={useColorModeValue('white', 'gray.700')}
          fontSize='xs'
          fontWeight='bold'
          alignSelf={{ sm: 'flex-start', lg: null }}
          mb={{ sm: '12px', md: '0px' }}
        >
          NEW ORDER
        </Button>
        <Stack
          direction='row'
          spacing='10px'
          alignSelf={{ sm: 'flex-start', lg: 'auto' }}
        >
          <Menu>
            <LightMode>
              <MenuButton
                as={Button}
                variant='light'
                rightIcon={<IoIosArrowDown />}
                color='gray.700'
                w='125px'
                h='35px'
                fontSize='xs'
              >
                FILTERS
              </MenuButton>
            </LightMode>
            <MenuList bg={useColorModeValue('white', 'navy.800')}>
              <MenuItem color='gray.500'>Status: Paid</MenuItem>
              <MenuItem color='gray.500'>Status: Refunded</MenuItem>
              <MenuItem color='gray.500'>Status: Canceled</MenuItem>
              <MenuDivider />
              <MenuItem color='red.300'>Remove filter</MenuItem>
            </MenuList>
          </Menu>
          <LightMode>
            <Button
              variant='light'
              bg={useColorModeValue('white', 'blue.500')}
              color={useColorModeValue('gray.700', 'white')}
              _hover={useColorModeValue({}, { bg: 'blue.600' })}
              _active={useColorModeValue({}, { bg: 'blue.400' })}
              _focus={useColorModeValue({}, { bg: 'blue.500' })}
              w='125px'
              h='35px'
              fontSize='xs'
              fontWeight='bold'
            >
              EXPORT CSV
            </Button>
          </LightMode>
        </Stack>
      </Flex>
      <Card px='0px'>
        <CardBody>
          <SearchTable2 tableData={tableData2} columnsData={columnsData2} />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default OrderList;
