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

import { useColorMode } from '@chakra-ui/react';
import { PinInput } from 'react-input-pin-code';

export function PinInputLight(props) {
  const { variant, children, ...rest } = props;
  const { colorMode } = useColorMode();
  return (
    <>
      {colorMode == 'light' ? (
        <PinInput
          length={4}
          values={[]}
          initialValue=''
          inputStyle={{ background: 'white' }}
          onChange={() => {}}
          type={'number'}
          inputMode='number'
          style={{ padding: '10px' }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      ) : (
        <PinInput
          length={4}
          values={[]}
          initialValue=''
          inputStyle={{ background: '#1B254B' }}
          onChange={() => {}}
          type={'number'}
          inputMode='number'
          style={{ padding: '10px' }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      )}
    </>
  );
}

export function PinInputDark(props) {
  const { variant, children, ...rest } = props;
  const { colorMode } = useColorMode();
  return (
    <>
      {colorMode === 'light' ? (
        <PinInput
          length={4}
          values={[]}
          initialValue={''}
          inputStyle={{ background: 'white' }}
          onChange={() => {}}
          type={'number'}
          inputMode='number'
          style={{ padding: '10px' }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      ) : (
        <PinInput
          length={4}
          initialValue=''
          values={[]}
          inputStyle={{ background: '#111C44' }}
          onChange={() => {}}
          type={'number'}
          inputMode='number'
          style={{ padding: '10px' }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      )}
    </>
  );
}
