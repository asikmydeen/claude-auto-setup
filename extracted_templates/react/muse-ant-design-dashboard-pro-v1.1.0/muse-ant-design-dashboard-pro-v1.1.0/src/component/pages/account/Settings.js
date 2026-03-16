/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  Tabs,
  Card,
  Row,
  Col,
  Anchor,
  Avatar,
  Switch,
  Form,
  Input,
  Button,
  Select,
  Tag,
  Affix,
} from "antd";
import {
  AppstoreFilled,
  SnippetsFilled,
  SafetyCertificateFilled,
  DashboardFilled,
  NotificationFilled,
  WalletFilled,
  DeleteFilled,
  DesktopOutlined,
  MobileOutlined,
  ArrowRightOutlined,
  UpOutlined,
  UnlockFilled,
} from "@ant-design/icons";
import profilavatar from "../../images/face-1.jpg";
import slack from "../../images/slack.svg";
import spotify from "../../images/spotify.svg";
import atlassian from "../../images/atlassian.svg";
import asana from "../../images/asana.svg";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
function callback(key) {
  console.log(key);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

const { Link } = Anchor;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const items = [
  {
    key: "1",
    label: `Messages`,
    children: (
      <Row gutter={[24, 24]}>
        <Col lg={6} span={24}>
          <Affix offsetTop={10}>
            <Card className="header-solid" bordered={false}>
              <Anchor className="fixed" affix={false}>
                <Link
                  href="#profile"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <AppstoreFilled className="text-lg text-gray-6" />
                      <h4>Profile</h4>
                    </div>,
                  ]}
                />

                <Link
                  href="#basic-info"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <SnippetsFilled className="text-lg text-gray-6" />
                      <h4>Basic Info</h4>
                    </div>,
                  ]}
                />
                <Link
                  href="#change-password"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <UnlockFilled className="text-lg text-gray-6" />
                      <h4>Change Password</h4>
                    </div>,
                  ]}
                />
                <Link
                  href="#2fa"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <SafetyCertificateFilled className="text-lg text-gray-6" />
                      <h4>2FA</h4>
                    </div>,
                  ]}
                />
                <Link
                  href="#accounts"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <DashboardFilled className="text-lg text-gray-6" />
                      <h4>Accounts</h4>
                    </div>,
                  ]}
                />
                <Link
                  href="#notifications"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <NotificationFilled className="text-lg text-gray-6" />
                      <h4>Notifications</h4>
                    </div>,
                  ]}
                />
                <Link
                  href="#sessions"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <WalletFilled className="text-lg text-gray-6" />
                      <h4>Sessions</h4>
                    </div>,
                  ]}
                />
                <Link
                  href="#delete-account"
                  title={[
                    <div className="ant-anchor-link-menu" key={0}>
                      <DeleteFilled className="text-lg text-gray-6" />
                      <h4>Delete Account</h4>
                    </div>,
                  ]}
                />
              </Anchor>
            </Card>
          </Affix>
        </Col>

        <Col span={24} lg={18} id="my-scroll-layout">
          <Card
            id="profile"
            className="card-profile-head"
            bordered={false}
            bodyStyle={{ display: "none" }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]}>
                <Col span={24} md={12} className="col-info">
                  <Avatar.Group>
                    <Avatar size={74} shape="square" src={profilavatar} />

                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">Sarah Jacob</h4>
                      <p>CEO / Co-Founder</p>
                    </div>
                  </Avatar.Group>
                </Col>
                <Col
                  span={24}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <small className="font-regular mr-5">
                    Switch to invisible
                  </small>
                  <Switch defaultChecked onChange={onChange} />
                </Col>
              </Row>
            }
          ></Card>

          <Card
            id="basic-info"
            className="mb-24 header-solid"
            bordered={false}
            title={[
              <h5 className="mb-0" key={0}>
                Basic Info
              </h5>,
            ]}
          >
            <Form layout="vertical">
              <Row gutter={[24, 0]}>
                <Col span={24} lg={12}>
                  <Form.Item label="First Name" colon={false}>
                    <Input placeholder="Michael" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="Last Name" colon={false}>
                    <Input placeholder="Prior" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={8}>
                  <Form.Item label="I'm" colon={false}>
                    <Select
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      size="large"
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} lg={6}>
                  <Form.Item label="Birth Date" colon={false}>
                    <Select defaultValue="January" size="large">
                      <Select.Option value="January">January</Select.Option>
                      <Select.Option value="February">February</Select.Option>
                      <Select.Option value=" March ">March</Select.Option>
                      <Select.Option value="april">april</Select.Option>
                      <Select.Option value="May">May</Select.Option>
                      <Select.Option value="June">June</Select.Option>
                      <Select.Option value="July">July</Select.Option>
                      <Select.Option value="August">August</Select.Option>
                      <Select.Option value="September">September</Select.Option>
                      <Select.Option value="Octuber">Octuber</Select.Option>
                      <Select.Option value="November">November</Select.Option>
                      <Select.Option value="December">December</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} lg={6}>
                  <Form.Item label="Day" colon={false}>
                    <Select
                      showArrow
                      placeholder="Select a day"
                      size="large"
                      optionFilterProp="children"
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Select.Option value="3">3</Select.Option>
                      <Select.Option value="4">4</Select.Option>
                      <Select.Option value="5">5</Select.Option>
                      <Select.Option value="6">6</Select.Option>
                      <Select.Option value="7">7</Select.Option>
                      <Select.Option value="8">8</Select.Option>
                      <Select.Option value="9">9</Select.Option>
                      <Select.Option value="10">10</Select.Option>
                      <Select.Option value="11">11</Select.Option>
                      <Select.Option value="12">12</Select.Option>
                      <Select.Option value="12">13</Select.Option>
                      <Select.Option value="14">14</Select.Option>
                      <Select.Option value="15">15</Select.Option>
                      <Select.Option value="16">16</Select.Option>
                      <Select.Option value="17">17</Select.Option>
                      <Select.Option value="18">18</Select.Option>
                      <Select.Option value="19">19</Select.Option>
                      <Select.Option value="20">20</Select.Option>
                      <Select.Option value="21">21</Select.Option>
                      <Select.Option value="22">22</Select.Option>
                      <Select.Option value="23">23</Select.Option>
                      <Select.Option value="24">24</Select.Option>
                      <Select.Option value="25">25</Select.Option>
                      <Select.Option value="26">26</Select.Option>
                      <Select.Option value="27">27</Select.Option>
                      <Select.Option value="28">28</Select.Option>
                      <Select.Option value="29">29</Select.Option>
                      <Select.Option value="30">30</Select.Option>
                      <Select.Option value="31">31</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} lg={4}>
                  <Form.Item label="Year" colon={false}>
                    <Select placeholder="Select a day" size="large">
                      <Select.Option value="1990">1990</Select.Option>
                      <Select.Option value="1991">1991</Select.Option>
                      <Select.Option value="1992">1992</Select.Option>
                      <Select.Option value="1993">1993</Select.Option>
                      <Select.Option value="1994">1994</Select.Option>
                      <Select.Option value="1995">1995</Select.Option>
                      <Select.Option value="1996">1996</Select.Option>
                      <Select.Option value="1997">1997</Select.Option>
                      <Select.Option value="1998">1998</Select.Option>
                      <Select.Option value="1999">1999</Select.Option>
                      <Select.Option value="2000">2000</Select.Option>
                      <Select.Option value="2001">2001</Select.Option>
                      <Select.Option value="2002">2002</Select.Option>
                      <Select.Option value="2003">2003</Select.Option>
                      <Select.Option value="2004">2004</Select.Option>
                      <Select.Option value="2005">2005</Select.Option>
                      <Select.Option value="2007">2007</Select.Option>
                      <Select.Option value="2008">2008</Select.Option>
                      <Select.Option value="2009">2009</Select.Option>
                      <Select.Option value="2010">2010</Select.Option>
                      <Select.Option value="2011">2011</Select.Option>
                      <Select.Option value="2012">2012</Select.Option>
                      <Select.Option value="2013">2013</Select.Option>
                      <Select.Option value="2014">2014</Select.Option>
                      <Select.Option value="2015">2015</Select.Option>
                      <Select.Option value="2016">2016</Select.Option>
                      <Select.Option value="2017">2017</Select.Option>
                      <Select.Option value="2018">2018</Select.Option>
                      <Select.Option value="2019">2019</Select.Option>
                      <Select.Option value="2020">2020</Select.Option>
                      <Select.Option value="2021">2021</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="Email" colon={false}>
                    <Input placeholder="soft@gmail.com" type="email" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="Confirmation Email" colon={false}>
                    <Input placeholder="soft@gamil.com" type="email" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="Your location" colon={false}>
                    <Input placeholder="sydeny, A" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="Phone Number" colon={false}>
                    <Input placeholder="+40 735 631 620" type="number" />
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="Language" colon={false}>
                    <Select defaultValue="English" size="large">
                      <Select.Option value="French">French</Select.Option>
                      <Select.Option value="Spanish">Spanish</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24} lg={12}>
                  <Form.Item label="Skills" colon={false}>
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      defaultValue={["Angular", "React", "Vue"]}
                      onChange={handleChange}
                      size="large"
                    >
                      <Option value="Angular">Angular</Option>
                      <Option value="React">React</Option>
                      <Option value="Vue">Vue</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card
            id="change-password"
            className="mb-24 header-solid"
            bordered={false}
            title={[
              <h5 className="mb-0" key={0}>
                Change Password
              </h5>,
            ]}
          >
            <Form layout="vertical" className="ant-password-box">
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item label="Current password" colon={false}>
                    <Input.Password placeholder="Current password" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="New password" colon={false}>
                    <Input.Password placeholder="New password" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Confirm new password" colon={false}>
                    <Input.Password placeholder="Confirm new password" />
                  </Form.Item>
                  <h5 className="mb-25 font-semibold">Password requirements</h5>
                  <p className="para">
                    Please follow this guide for a strong password:
                  </p>
                  <ul className="pl-25 text-muted">
                    <li>One special characters</li>
                    <li>Min 6 characters</li>
                    <li>One number (2 are recommended)</li>
                    <li>Change it often</li>
                  </ul>
                </Col>

                <Col span={24} className="text-right">
                  <Button type="primary" className="px-25">
                    UPDATE PASSWORD
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card
            id="2fa"
            className="mb-24 header-solid"
            bordered={false}
            title={[
              <div className="ant-flex-setting" key={0}>
                <h5 className="mb-0 font-semibold">
                  Two-factor authentication
                </h5>
              </div>,
            ]}
            extra={[
              <div span={24} className="text-right" key={0}>
                <Tag color="#52c41a" className="px-10 py-5 font-bold">
                  ENABLED
                </Tag>
              </div>,
            ]}
          >
            <div className="ant-flex-setting flex-wrap">
              <h6 className="font-regular mb-0">Security keys</h6>
              <div span={24} className="text-right ml-auto">
                <span className="mr-15">No Security Keys</span>{" "}
                <Button size="small" className="font-bold px-25 ">
                  ADD
                </Button>
              </div>
            </div>
            <hr className="gradient-line" />
            <div className="ant-flex-setting flex-wrap">
              <h6 className="font-regular mb-0">SMS number</h6>
              <div span={24} className="text-right ml-auto">
                <span className="mr-15">+4012374423</span>{" "}
                <Button size="small" className="font-bold px-25 ">
                  EDIT
                </Button>
              </div>
            </div>
            <hr className="gradient-line" />
            <div className="ant-flex-setting flex-wrap">
              <h6 className="font-regular mb-0">Authenticator app</h6>
              <div span={24} className="text-right ml-auto">
                <span className="mr-15">Not Configured</span>{" "}
                <Button size="small" className="font-bold px-25 ">
                  SET UP
                </Button>
              </div>
            </div>
          </Card>
          <Card
            id="accounts"
            className="mb-24 header-solid"
            bordered={false}
            title={[
              <React.Fragment key={0}>
                <h5 className="font-semibold">Accounts</h5>
                <p className="font-regular">
                  Here you can setup and manage your integration settings.
                </p>
              </React.Fragment>,
            ]}
          >
            <Row className="ant-flex-setting">
              <Col span={24} md={12} className="col-info">
                <Avatar.Group>
                  <Avatar size={48} shape="square" src={slack} />

                  <div className="pl-15">
                    <h5 className="m-0">Slack</h5>
                    <a href="#!" className="text-dark">
                      Show less <UpOutlined />
                    </a>
                  </div>
                </Avatar.Group>
              </Col>
              <Col
                span={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <small className="font-regular mr-5">Enabled</small>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </Row>
            <div className="responsive-m">
              <p>
                You haven't added your Slack yet or you aren't authorized.
                Please add our Slack Bot to your account by clicking on here.
                When you've added the bot, send your verification code that you
                have received.
              </p>

              <Card
                className="bg-gray-3 shadow-0 mb-24"
                bodyStyle={{ padding: "8px" }}
              >
                <Row className="ant-row-flex ant-row-flex-middle">
                  <Col>
                    <p className="font-semibold mb-0 ml-10">
                      Verification Code
                    </p>
                  </Col>
                  <Col className="ml-auto">
                    <Input
                      className="font-regular text-sm text-dark ant-input-sm"
                      value="1172913"
                      style={{ width: "100px" }}
                    />
                  </Col>
                </Row>
              </Card>
              <Card
                className="bg-gray-3 shadow-0 mb-24"
                bodyStyle={{ padding: "8px" }}
              >
                <Row className="ant-row-flex ant-row-flex-middle">
                  <Col>
                    <p className="font-semibold mb-0 ml-10">
                      Verification Code
                    </p>
                  </Col>
                  <Col className="ml-auto">
                    <strong>hello@creative-tim.com</strong>
                    <Button
                      size="small"
                      type="danger"
                      className="ml-10 px-25 font-bold "
                    >
                      DELETE
                    </Button>
                  </Col>
                </Row>
              </Card>
            </div>

            <hr className="gradient-line" />

            <div className="ant-flex-setting">
              <Col span={24} md={12} className="col-info">
                <Avatar.Group>
                  <Avatar size={48} shape="square" src={spotify} />

                  <div className="pl-15">
                    <h5 className="m-0">Spotify</h5>
                    <p>Music</p>
                  </div>
                </Avatar.Group>
              </Col>
              <Col
                span={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span className="font-regular mr-15">Enabled</span>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </div>
            <hr className="gradient-line" />
            <div className="ant-flex-setting">
              <Col span={24} md={12} className="col-info">
                <Avatar.Group>
                  <Avatar size={48} shape="square" src={atlassian} />

                  <div className="pl-15">
                    <h5 className="m-0">Atlassian</h5>
                    <p>Payment vendor</p>
                  </div>
                </Avatar.Group>
              </Col>
              <Col
                span={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span className="font-regular mr-15">Enabled</span>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </div>
            <hr className="gradient-line" />
            <div className="ant-flex-setting">
              <Col span={24} md={12} className="col-info">
                <Avatar.Group>
                  <Avatar size={48} shape="square" src={asana} />

                  <div className="pl-15">
                    <h5 className="m-0">Asana</h5>
                    <p>Organize your team</p>
                  </div>
                </Avatar.Group>
              </Col>
              <Col
                span={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span className="font-regular mr-15">Disabled</span>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </div>
          </Card>
          <Card
            id="notifications"
            className="mb-24 header-solid"
            bordered={false}
            title={[
              <React.Fragment key={0}>
                <h5 className="font-semibold">Notifications</h5>
                <p className="font-regular">
                  Choose how you receive notifications. These notification
                  settings apply to the things you’re watching.
                </p>
              </React.Fragment>,
            ]}
          >
            <div className="ant-list-box table-responsive">
              <table className="width-100 table-settings-notifications">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Email</th>
                    <th>Push</th>
                    <th>SMS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>Mention</p>
                      <small>
                        Notify when another user mentions you in a comment
                      </small>
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Comments</p>
                      <small>
                        Notify when another user comments your item.
                      </small>
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Fellows</p>
                      <small>Notify when another user follows you.</small>
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Log in from a new device</p>
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                    <td>
                      <Switch defaultChecked onChange={onChange} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card
            id="session"
            className="mb-24 header-solid list-settings-sessions"
            bordered={false}
            title={[
              <React.Fragment key={0}>
                <h5 className="font-semibold">Sessions</h5>
                <p className="font-regular">
                  This is a list of devices that have logged into your account.
                  Remove those that you do not recognize.
                </p>
              </React.Fragment>,
            ]}
          >
            <div className="ant-row-flex ant-row-flex-middle">
              <div className="text-center ant-col" style={{ minWidth: "40px" }}>
                <DesktopOutlined
                  className="text-gray-6"
                  style={{ fontSize: "18px" }}
                />
              </div>
              <div className="ant-col pl-15">
                <p className="mb-0">Confirm</p>
                <small className="text-dark">Your current session</small>
              </div>
              <div
                className="ml-auto ant-col ant-col-24 ant-col-md-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Tag color="#87d068" className="font-bold">
                  ACTIVE
                </Tag>
                <span className="ml-5">EU</span>
                <Button type="link">
                  See More <ArrowRightOutlined />
                </Button>
              </div>
            </div>
            <hr className="gradient-line my-10" />
            <div className="ant-row-flex ant-row-flex-middle">
              <div className="text-center ant-col" style={{ minWidth: "40px" }}>
                <DesktopOutlined
                  className="text-gray-6"
                  style={{ fontSize: "18px" }}
                />
              </div>
              <div className="ant-col">
                <p className="mb-0">Chrome on macOS</p>
              </div>
              <div
                className="ml-auto ant-col ant-col-24 ant-col-md-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span className="ml-5">EU</span>
                <button
                  type="button"
                  className="btn-more ml-5 ant-btn ant-btn-link"
                >
                  <span>See More</span>
                  <ArrowRightOutlined />
                </button>
              </div>
            </div>
            <hr className="gradient-line my-10" />
            <div className="ant-row-flex ant-row-flex-middle">
              <div className="text-center ant-col" style={{ minWidth: "40px" }}>
                <MobileOutlined
                  className="text-gray-6"
                  style={{ fontSize: "18px" }}
                />
              </div>
              <div className="ant-col">
                <p className="mb-0">Safari on iPhone</p>
              </div>
              <div
                className="ml-auto ant-col ant-col-24 ant-col-md-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span className="ml-5">EU</span>
                <button
                  type="button"
                  className="btn-more ml-5 ant-btn ant-btn-link"
                >
                  <span>See More</span>
                  <ArrowRightOutlined />
                </button>
              </div>
            </div>
          </Card>
          <Card
            id="delete-account"
            className="header-solid mb-24"
            bordered={false}
            title={[
              <React.Fragment key={0}>
                <h5 className="font-semibold">Delete Account</h5>
                <p className="font-regular">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </React.Fragment>,
            ]}
          >
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",

                justifyContent: "flex-start",
              }}
            >
              <small className="font-regular mr-5"></small>
              <Switch
                defaultChecked
                onChange={onChange}
                style={{ marginTop: "5px" }}
              />
              <div>
                <p
                  style={{ marginLeft: "12px" }}
                  className="mb-0 font-semibold"
                >
                  Confirm
                </p>
                <p style={{ marginLeft: "12px" }}>
                  I want to delete my account.
                </p>
              </div>
            </Col>
            <div className="ant-flex-setting">
              <Col
                span={24}
                className="text-right"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button className="me-3">DEACTIVATE</Button>

                <Button type="primary" danger className="px-25">
                  DELETE ACCOUNT
                </Button>
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
    ),
  },
  {
    key: "2",
    label: `Social`,
    children: (
      <Card
        style={{
          height: "300px",
          padding: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="#" className="text-center text-muted font-bold">
          <h6 className="font-semibold text-muted">Empty Tab</h6>
        </a>
      </Card>
    ),
  },
  {
    key: "3",
    label: `Notifications`,
    children: (
      <Card
        style={{
          height: "300px",
          padding: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="#" className="text-center text-muted font-bold">
          <h6 className="font-semibold text-muted">Empty Tab</h6>
        </a>
      </Card>
    ),
  },
  {
    key: "4",
    label: "Backup",
    children: (
      <Card
        style={{
          height: "300px",
          padding: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="#" className="text-center text-muted font-bold">
          <h6 className="font-semibold text-muted">Empty Tab</h6>
        </a>
      </Card>
    ),
  },
];
export default class Settings extends Component {
  render() {
    return (
      <>
        <Tabs
          className="tabs-sliding"
          defaultActiveKey="1"
          onChange={callback}
          items={items}
        />
      </>
    );
  }
}
