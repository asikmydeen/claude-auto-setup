/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import Header_Pro from "./Header_Pro";
import Footer_Pro from "./Footer_Pro";
import {
  Layout,
  Typography,
  Tabs,
  Row,
  Col,
  Card,
  Tag,
  Avatar,
  Button,
  Collapse,
} from "antd";
import {
  CheckOutlined,
  MinusOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import logo1 from "../images/logo-coinbase.svg";
import logo2 from "../images/logo-nasa.svg";
import logo3 from "../images/logo-netflix.svg";
import logo4 from "../images/logo-pinterest.svg";
import logo5 from "../images/logo-spotify1.svg";
import logo6 from "../images/logo-vodafone.svg";
const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
export default class Pricing extends Component {
  render() {
    const pricing = [
      {
        Price2: "119",
        basic: "STARTER",
        price: "59",
        cls: "ant-btn-dark",
        btn: "JOIN",
        avat: "bg-dark",

        avatar: (
          <Avatar className="bg-dark" size={24} icon={<CheckOutlined />} />
        ),

        avatar2: <Avatar size={24} icon={<MinusOutlined />} />,
      },
      {
        basic: "PREMIUM",

        price: "89",
        Price2: "159",
        btn: "TRY PREMIUM",
        avat: "bg-dark",
        type: "primary",

        avatar: (
          <Avatar className="bg-dark" size={24} icon={<CheckOutlined />} />
        ),
        avatar3: (
          <Avatar className="bg-dark" size={24} icon={<CheckOutlined />} />
        ),

        avatar2: <Avatar size={24} icon={<MinusOutlined />} />,
      },
      {
        basic: "ENTERPRISE",
        price: "99",
        Price2: "399",
        btn: "JOIN",
        avat: "bg-dark",
        cls: "ant-btn-dark",
        avatar: (
          <Avatar className="bg-dark" size={24} icon={<CheckOutlined />} />
        ),

        avatar2: (
          <Avatar className="bg-dark" size={24} icon={<CheckOutlined />} />
        ),
      },
    ];
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up layout-pricing ">
          <Header>
            <Header_Pro />
          </Header>
          <Content className="p-0">
            <div className="sign-up-header" style={{ paddingBottom: "32rem" }}>
              <div className="content">
                <Title>See our pricing</Title>
                <p className="text-lg">
                  You have Free Unlimited Updates and Premium Support on each
                  package.
                </p>
              </div>
            </div>
            <div className="pricing-wrapper">
              <Tabs
                defaultActiveKey="1"
                onChange={callback}
                className="sliding-tab"
              >
                <TabPane tab="Monthly" key="1">
                  <Row gutter={[24, 0]}>
                    {pricing.map((p, index) => (
                      <Col span={24} lg={8} key={index}>
                        <Card
                          className="header-solid card-pricing"
                          bordered={false}
                          bodyStyle={{ padding: "20px" }}
                        >
                          <Tag className="bg-gray-4 text-gray-9 font-bold">
                            {p.basic}
                          </Tag>
                          <h1 className="font-semibold h1">
                            <small>$</small>
                            <span>{p.price}</span>
                          </h1>
                          <ul className="list-pricing">
                            <li>{p.avatar}2 team members</li>

                            <li>
                              {p.avatar}
                              20GB Cloud storage
                            </li>
                            <li>
                              {p.basic === "PREMIUM" ? p.avatar : p.avatar2}
                              Integration help
                            </li>
                            <li>
                              {p.basic === "PREMIUM" ? p.avatar : p.avatar2}
                              Sketch Files
                            </li>
                            <li>
                              {p.avatar2}
                              API Access
                            </li>
                            <li>
                              {p.avatar2}
                              Complete documentation
                            </li>
                          </ul>

                          <Button className={p.cls} block type={p.type}>
                            {p.btn} <ArrowRightOutlined />
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane tab="Annual" key="2">
                  <Row gutter={[24, 0]}>
                    {pricing.map((p, index) => (
                      <Col span={24} lg={8} key={index}>
                        <Card
                          className="card-pricing header-solid "
                          bordered={false}
                          bodyStyle={{ padding: "20px" }}
                        >
                          <Tag className="bg-gray-4 text-gray-9 font-bold">
                            {p.basic}
                          </Tag>
                          <h1 className="font-semibold h1">
                            <small>$</small>
                            <span>{p.Price2}</span>
                          </h1>
                          <ul className="list-pricing">
                            <li>{p.avatar}2 team members</li>

                            <li>
                              {p.avatar}
                              20GB Cloud storage
                            </li>
                            <li>
                              {p.basic === "PREMIUM" ? p.avatar : p.avatar2}
                              Integration help
                            </li>
                            <li>
                              {p.basic === "PREMIUM" ? p.avatar : p.avatar2}
                              Sketch Files
                            </li>
                            <li>
                              {p.avatar2}
                              API Access
                            </li>
                            <li>
                              {p.avatar2}
                              Complete documentation
                            </li>
                          </ul>

                          <Button className={p.cls} block type={p.type}>
                            {p.btn} <ArrowRightOutlined />
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              </Tabs>
              <div className="container">
                <h6 className="text-center text-gray-7 font-semibold">
                  More than 50+ brands trust Soft
                </h6>

                <Row gutter={[24, 0]} className="row-clients mt-20">
                  <Col md={8} lg={4}>
                    <img src={logo1} alt="logo_coinbase" />
                  </Col>
                  <Col span={24} md={8} lg={4}>
                    <img src={logo2} alt="logo_nasa" />
                  </Col>
                  <Col span={24} md={8} lg={4}>
                    <img src={logo3} alt="" />
                  </Col>
                  <Col span={24} md={8} lg={4}>
                    <img src={logo4} alt="" />
                  </Col>
                  <Col span={24} md={8} lg={4}>
                    <img src={logo5} alt="" />
                  </Col>
                  <Col span={24} md={8} lg={4}>
                    <img src={logo6} alt="" />
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span="24" md={12} className="mx-auto">
                    <h2 className="text-center h2">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-center text-lg">
                      A lot of people don't appreciate the moment until it’s
                      passed. I'm not trying my hardest, and I'm not trying to
                      do
                    </p>
                  </Col>
                </Row>

                <Row gutter={[24, 0]}>
                  <Col span={24} md={20} className="mx-auto">
                    <Collapse
                      bordered={false}
                      defaultActiveKey={["1"]}
                      onChange={callback}
                      accordion
                      expandIconPosition="end"
                      expandIcon={({ isActive }) =>
                        isActive ? <MinusOutlined /> : <PlusOutlined />
                      }
                    >
                      <Panel header="How do I order?" key="1">
                        <p>
                          We’re not always in the position that we want to be
                          at. We’re constantly growing. We’re constantly making
                          mistakes. We’re constantly trying to express ourselves
                          and actualize our dreams. If you have the opportunity
                          to play this game of life you need to appreciate every
                          moment. A lot of people don’t appreciate the moment
                          until it’s passed.
                        </p>
                      </Panel>
                      <Panel header="How can i make the payment?" key="2">
                        <p>
                          It really matters and then like it really doesn’t
                          matter. What matters is the people who are sparked by
                          it. And the people who are like offended by it, it
                          doesn’t matter. Because it's about motivating the
                          doers. Because I’m here to follow my dreams and
                          inspire other people to follow their dreams, too.
                          We’re not always in the position that we want to be
                          at. We’re constantly growing. We’re constantly making
                          mistakes. We’re constantly trying to express ourselves
                          and actualize our dreams. If you have the opportunity
                          to play this game of life you need to appreciate every
                          moment. A lot of people don’t appreciate the moment
                          until it’s passed.
                        </p>
                      </Panel>
                      <Panel
                        header="How much time does it take to receive the order?"
                        key="3"
                      >
                        <p>
                          The time is now for it to be okay to be great. People
                          in this world shun people for being great. For being a
                          bright color. For standing out. But the time is now to
                          be okay to be the greatest you. Would you believe in
                          what you believe in, if you were the only one who
                          believed it? If everything I did failed - which it
                          doesn't, it actually succeeds - just the fact that I'm
                          willing to fail is an inspiration. People are so
                          scared to lose that they don't even try. Like, one
                          thing people can't say is that I'm not trying, and I'm
                          not trying my hardest, and I'm not trying to do the
                          best way I know how.
                        </p>
                      </Panel>
                      <Panel header="Can I resell the products?" key="4">
                        <p>
                          I always felt like I could do anything. That’s the
                          main thing people are controlled by! Thoughts- their
                          perception of themselves! They're slowed down by their
                          perception of themselves. If you're taught you can’t
                          do anything, you won’t do anything. I was taught I
                          could do everything. If everything I did failed -
                          which it doesn't, it actually succeeds - just the fact
                          that I'm willing to fail is an inspiration. People are
                          so scared to lose that they don't even try. Like, one
                          thing people can't say is that I'm not trying, and I'm
                          not trying my hardest, and I'm not trying to do the
                          best way I know how.
                        </p>
                      </Panel>
                      <Panel
                        header="Where do I find the shipping details?"
                        key="5"
                      >
                        <p>
                          There’s nothing I really wanted to do in life that I
                          wasn’t able to get good at. That’s my skill. I’m not
                          really specifically talented at anything except for
                          the ability to learn. That’s what I do. That’s what
                          I’m here for. Don’t be afraid to be wrong because you
                          can’t learn anything from a compliment. I always felt
                          like I could do anything. That’s the main thing people
                          are controlled by! Thoughts- their perception of
                          themselves! They're slowed down by their perception of
                          themselves. If you're taught you can’t do anything,
                          you won’t do anything. I was taught I could do
                          everything.
                        </p>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
          <Footer>
            <Footer_Pro />
          </Footer>
        </div>
      </>
    );
  }
}
