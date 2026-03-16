/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Layout, Button,  Card, Form, Input, Checkbox } from "antd";
import logo1 from "../images/logos-facebook.svg";
import logo2 from "../images/logo-apple.svg";
import logo3 from "../images/Google__G__Logo.svg.png";

import { Link } from "react-router-dom";

import Footer_Pro from "./Footer_Pro";
import Header_Pro from "./Header_Pro";

const { Header, Footer, Content } = Layout;

export default class SignUp extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up ">
          <Header>
            <Header_Pro />
          </Header>

          <Content className="p-0">
            <div className="sign-up-header">
              <div className="content">
                <h1 className="mb-3 font-bold mbt-5">Sign Up</h1>
                <p className="text-lg" style={{ lineHeight: "24px" }}>
                  Use these awesome forms to login or create new account in your
                  project.
                </p>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={
                <h5 className="font-semibold text-center">Register With</h5>
              }
              bordered="false"
              bodyStyle={{ paddingTop: "0px" }}
            >
              <div className="sign-up-gateways">
                <Button type="false">
                  <img src={logo1} alt="" />
                </Button>
                <Button type="false">
                  <img src={logo2} alt="" />
                </Button>
                <Button type="false">
                  <img src={logo3} alt="" />
                </Button>
              </div>
              <div className="divider my-25">
                <hr className="gradient-line" />
                <p className="font-semibold text-muted">
                  <span className="label">Or</span>
                </p>
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="Name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Passwoed" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Content>
          <Footer>
            <Footer_Pro />
          </Footer>
        </div>
      </>
    );
  }
}
