/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Checkbox,
} from "antd";
import signinbg from "../../images/info-rocket-ill.png";

import Header_Pro from "../../pages/Header_Pro";

const { Title } = Typography;
const { Header, Content } = Layout;

export default class Illustration extends Component {
  componentDidMount() {
    console.log("illl....");
  }
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <>
          <Layout className="layout-default layout-sign-up-cover layout-sign-up-illustration bg-white">
            <Header>
              <Header_Pro />
            </Header>
            <Content className="sign-in ">
              <Row
                gutter={[24, 0]}
                className="row-main ant-row-flex ant-row-flex-space-around ant-row-flex-middle"
              >
                <Col
                  className="col-form mr-auto"
                  xs={{ span: 24, offset: 0 }}
                  lg={{ span: 6, offset: 2 }}
                  md={{ span: 12 }}
                >
                  <Title className="mb-15">Sign Up</Title>
                  <Title className="font-regular text-muted" level={5}>
                    Enter your email and password to register
                  </Title>
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="row-col"
                  >
                    <Form.Item
                      className="username"
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      className="username"
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                      className="username"
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                      name="remember"
                      className="aligin-center"
                      valuePropName="checked"
                    >
                      <Checkbox defaultChecked={true}>
                        I agree to the{" "}
                        <a href="#" className="font-bold text-dark">
                          Terms and Conditions
                        </a>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        SIGN UP
                      </Button>
                    </Form.Item>
                    <p className="font-semibold text-muted">
                      Don't have an account?{" "}
                      <Link to="#" className="text-dark font-bold">
                        Sign Up
                      </Link>
                    </p>
                  </Form>
                </Col>
                <Col
                  className="col-img12 text-center"
                  style={{ padding: 12 }}
                  xs={{ span: 24 }}
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                >
                  <div>
                    <div className="img">
                      <img src={signinbg} alt="" className="inline-block" />
                    </div>
                    <h4 className="text-white h4">Your journey starts here</h4>
                    <p className="text-white">
                      Just as it takes a company to sustain a product, it takes
                      a community to sustain a protocol.
                    </p>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </>
      </>
    );
  }
}
