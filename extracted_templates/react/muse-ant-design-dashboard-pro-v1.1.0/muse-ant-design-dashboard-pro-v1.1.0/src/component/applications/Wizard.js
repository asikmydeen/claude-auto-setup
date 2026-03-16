import React, { Component } from "react";
import {
  Steps,
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Avatar,
  Radio,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import avatar from "../images/team-2.jpg";
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class Wizard extends Component {
  state = {
    current: 0,
  };
  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  next = () => {
    this.setState({
      current: this.state.current + 1,
    });
  };

  prev = () => {
    this.setState({
      current: this.state.current - 1,
    });
  };
  render() {
    const setting = [
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="tools"
        className="svg-inline--fa fa-tools "
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20px"
      >
        <path
          fill="currentColor"
          d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"
        ></path>
      </svg>,
    ];
    const cubes = [
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="cube"
        className="svg-inline--fa fa-cube fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20px"
      >
        <path
          fill="currentColor"
          d="M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 68.4l192 72v1.1l-192 78-192-78v-1.1l192-72zm32 356V275.5l160-65v133.9l-160 80z"
        ></path>
      </svg>,
    ];

    const roket = [
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="rocket"
        className="svg-inline--fa fa-rocket fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20"
      >
        <path
          fill="currentColor"
          d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z"
        ></path>
      </svg>,
    ];
    const { current } = this.state;
    return (
      <>
        <div className="mx-auto mt-50" style={{ maxWidth: "800px" }}>
          <div className="mb-50">
            <h3 className="mt-25 text-center h3 ">Build Your Profile</h3>
            <h5 className="text-center font-regular h5">
              This information will let us know more about you.
            </h5>
            <Steps
              className="my-50"
              progressDot
              current={current}
              onChange={this.onChange}
              items={[
                { title: "About", key: "about" },
                { title: "Account", key: "account" },
                { title: "Address", key: "address" },
              ]}
            ></Steps>
          </div>
          <div className="mb-24">
            {current === 0 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <>
                    <h5 className="font-regular text-center ">
                      Let's start with the basic information
                    </h5>
                    <p className="font-regular text-center">
                      Let us know your name and email address. Use an address
                      you don't mind other users contacting you at
                    </p>
                  </>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col lg={8} md={8} span={24} className="text-center">
                      <div className="avatar-upload">
                        <Avatar size={110} shape="square" src={avatar} alt="" />
                        <Button type="ghost">
                          <EditOutlined />
                        </Button>
                      </div>
                    </Col>
                    <Col lg={16} span={24} md={16}>
                      <Row gutter={[24, 0]}>
                        <Col span={24}>
                          <Form.Item label="First Name" colon={false}>
                            <Input placeholder="eg. Prior" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Last Name" colon={false}>
                            <Input placeholder="eg. Prior" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Email Address" colon={false}>
                            <Input
                              type="email"
                              placeholder="eg. soft@dashboard.com"
                            />
                          </Form.Item>
                        </Col>

                        <Col span={24} className="text-right">
                          <Button
                            onClick={this.next}
                            type="primary"
                            className="px-25"
                          >
                            NEXT
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}
            {current === 1 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <>
                    <h5 className="font-regular text-center ">
                      What are you doing? (checkboxes)
                    </h5>
                    <p className="font-regular text-center">
                      Give us more details about you. What do you enjoy doing in
                      your spare time?
                    </p>
                  </>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={24} md={20} lg={18} className="mx-auto">
                      <Radio.Group
                        defaultValue="a"
                        style={{ width: "100%" }}
                        className="ant-group-box text-center"
                      >
                        <Row gutter={[48, 0]}>
                          <Col span={8}>
                            <Radio.Button value="a">{setting}</Radio.Button>
                            <h6>Design</h6>
                          </Col>
                          <Col span={8}>
                            <Radio.Button value="b">{cubes}</Radio.Button>
                            <h6>Code</h6>
                          </Col>
                          <Col span={8}>
                            <Radio.Button value="c">{roket}</Radio.Button>
                            <h6>Develop</h6>
                          </Col>
                        </Row>
                      </Radio.Group>
                    </Col>
                    <Col span={12}>
                      <Button onClick={this.prev} className="px-25">
                        PREV
                      </Button>
                    </Col>

                    <Col span={12} className="text-right">
                      <Button
                        onClick={this.next}
                        type="primary"
                        className="px-25"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}

            {current === 2 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <>
                    <h5 className="font-regular text-center ">
                      Are you living in a nice area?
                    </h5>
                    <p className="font-regular text-center">
                      One thing I love about the later sunsets is the chance to
                      go for a walk through the neighborhood woods before dinner
                    </p>
                  </>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={24} lg={16}>
                      <Form.Item label="Street Name" colon={false}>
                        <Input placeholder="eg. Street 111" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={8}>
                      <Form.Item label="Street No" colon={false}>
                        <Input placeholder="eeg. Street 221" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={14}>
                      <Form.Item label="City" colon={false}>
                        <Input placeholder="eg. Tokyo" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={10}>
                      <Form.Item label="Country" colon={false}>
                        <Select
                          size="large"
                          defaultValue="Argentina"
                          onChange={handleChange}
                        >
                          <Option value="Argentina">Argentina</Option>
                          <Option value="Albania">Albania</Option>

                          <Option value="Algeria">Algeria</Option>
                          <Option value="Andorra">Andorra</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24} className="text-right">
                      <Button type="primary" className="px-25">
                        SEND
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}
          </div>
        </div>
      </>
    );
  }
}
