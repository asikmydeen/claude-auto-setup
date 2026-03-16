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
import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import ReactQuill from 'react-quill';

const CustomToolbar = () => (
  <Box bg={useColorModeValue('transparent', 'navy.900')}>
    <Box
      id='toolbar'
      borderTopStartRadius='8px'
      borderTopEndRadius='8px'
      borderBottom='0px solid transparent !important'
    >
      <select
        className='ql-header'
        defaultValue={''}
        onChange={(e) => e.persist()}
      >
        <option value='1'></option>
        <option value='2'></option>
      </select>
      <Button
        display='flex !important'
        justifyContent='center !important'
        alignItems='center !important'
        me='5px !important'
        className='ql-bold'
      ></Button>
      <Button
        display='flex !important'
        justifyContent='center !important'
        alignItems='center !important'
        me='5px !important'
        className='ql-italic'
      ></Button>
      <Button
        display='flex !important'
        justifyContent='center !important'
        alignItems='center !important'
        me='5px !important'
        className='ql-underline'
      ></Button>
      <Button
        display='flex !important'
        justifyContent='center !important'
        alignItems='center !important'
        me='5px !important'
        className='ql-list'
        value='ordered'
      ></Button>
      <Button
        display='flex !important'
        justifyContent='center !important'
        alignItems='center !important'
        className='ql-list'
        value='bullet'
      ></Button>
    </Box>
  </Box>
);

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className='text-editor'>
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
        />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Editor.modules = {
  toolbar: {
    container: '#toolbar',
  },
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];
