/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Card, Typography, Button, List, Avatar } from "antd";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import CRMChart from "../chart/CRMChart";
import interactionPlugin from "@fullcalendar/interaction";
import {
  ArrowRightOutlined,
  GitlabFilled,
  AudioFilled,
  CompassFilled,
  RightOutlined,
  PlusOutlined,
  CalendarFilled,
} from "@ant-design/icons";
import img from "../images/team-1.jpg";
const { Title } = Typography;

export default class CRM extends Component {
  render() {
    const mins = [
      <svg
        width="10"
        height="10"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={0}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
          className="fill-danger"
        ></path>
      </svg>,
    ];

    const newest = [
      {
        avatar: mins,
        title: "Netflix",
        description: "27 March 2021, at 12:30 PM",
        amount: "- $2,500",
        textclass: "text-light-danger",
        amountcolor: "text-danger",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Apple",
        description: "27 March 2021, at 04:30 AM",
        amount: "+ $2,000",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Partner #22213",
        description: "19 March 2021, at 12:30 AM",
        amount: "+ $750",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
    ];
    const revenue = [
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "via PayPal",
        description: "07 June 2021, at 09:00 AM",
        amount: "+ $4,999",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Partner #90211",
        description: "07 June 2021, at 05:50 AM",
        amount: "+ $700",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
      {
        avatar: <PlusOutlined style={{ fontSize: 10 }} />,
        title: "Services",
        description: "07 June 2021, at 07:10 PM",
        amount: "+ $1,800",
        textclass: "text-fill",
        amountcolor: "text-success",
      },
    ];
    const data = [
      {
        title: "Devices",
        subtitle: (
          <span className="text-sm">
            250 in stock,
            <span className="font-weight-bold"> 346+ sold</span>
          </span>
        ),
        avatar: <GitlabFilled />,
      },
      {
        title: "Tickets",
        avatar: <AudioFilled />,
        subtitle: (
          <span className="text-sm">
            123 closed,
            <span className="font-weight-bold"> 15 open</span>
          </span>
        ),
      },
      {
        title: "Error logs",
        avatar: <CompassFilled />,
        subtitle: (
          <span className="text-sm">
            1 is active,
            <span className="font-weight-bold"> 40 closed</span>
          </span>
        ),
      },
    ];

    return (
      <>
        <div className="layout-content">
          <Row gutter={[24, 0]}>
            <Col lg={16} span={24} className="mb-24">
              <Row gutter={[24, 0]}>
                <Col lg={8} span={24} className="mb-24">
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    title={[
                      <React.Fragment key={0}>
                        <h6 className="text-md font-semibold text-muted">
                          Visitors
                        </h6>

                        <h5 className="mb-0">
                          5,927 <small className="text-success">+20%</small>
                        </h5>
                      </React.Fragment>,
                    ]}
                    bordered={false}
                    className="crm-bar-line header-solid"
                  >
                    <CRMChart />
                  </Card>
                </Col>
                <Col lg={8} span={24} className="mb-24">
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    title={[
                      <React.Fragment key={0}>
                        <h6 className="text-md font-semibold text-muted">
                          Visitors
                        </h6>

                        <h5 className="mb-0">
                          5,927 <small className="text-success">+20%</small>
                        </h5>
                      </React.Fragment>,
                    ]}
                    bordered={false}
                    className="crm-bar-line header-solid"
                  >
                    <CRMChart />
                  </Card>
                </Col>
                <Col lg={8} span={24} className="mb-24">
                  <Card
                    style={{ height: "100%" }}
                    bodyStyle={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <a href="#" className="text-center text-muted font-bold">
                      <h4
                        className="font-semibold text-muted mb-0"
                        style={{ fontSize: "24px" }}
                      >
                        +
                      </h4>
                      <h6 className="font-semibold text-muted">New tab</h6>
                    </a>
                  </Card>
                </Col>
              </Row>

              <Card
                className="header-solid"
                title={[
                  <React.Fragment key={0}>
                    <h6 className="font-semibold m-0">Calendar</h6>
                    <p>Wednesday, 2021</p>
                  </React.Fragment>,
                ]}
              >
                <FullCalendar
                  height={400}
                  headerToolbar={false}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  selectable={true}
                  editable={true}
                  initialDate="2020-12-01"
                  events={[
                    {
                      title: "Call with Dave",
                      start: "2020-11-18",
                      end: "2020-11-18",
                      className: "bg-danger",
                    },

                    {
                      title: "Lunch meeting",
                      start: "2020-11-21",
                      end: "2020-11-22",
                      className: "bg-warning text-dark",
                    },

                    {
                      title: "All day conference",
                      start: "2020-11-29",
                      end: "2020-11-29",
                      className: "bg-success",
                    },

                    {
                      title: "Meeting with Mary",
                      start: "2020-12-01",
                      end: "2020-12-01",
                      className: "bg-primary",
                    },

                    {
                      title: "Winter Hackaton",
                      start: "2020-12-03",
                      end: "2020-12-03",
                      className: "bg-danger",
                    },

                    {
                      title: "Digital event",
                      start: "2020-12-07",
                      end: "2020-12-09",
                      className: "bg-warning text-dark",
                    },

                    {
                      title: "Marketing event",
                      start: "2020-12-10",
                      end: "2020-12-10",
                      className: "bg-primary",
                    },

                    {
                      title: "Dinner with Family",
                      start: "2020-12-19",
                      end: "2020-12-19",
                      className: "bg-danger",
                    },

                    {
                      title: "Black Friday",
                      start: "2020-12-23",
                      end: "2020-12-23",
                      className: "bg-primary",
                    },

                    {
                      title: "Cyber Week",
                      start: "2020-12-02",
                      end: "2020-12-02",
                      className: "bg-warning text-dark",
                    },
                  ]}
                />
              </Card>
            </Col>
            <Col md={8}>
              <Card bordered={false} className="criclebox card-info-2 mb-24">
                <div className="gradent col-content">
                  <div className="card-content">
                    <Title level={5}>Hey John!</Title>
                    <p>
                      Wealth creation is an evolutionarily recent positive-sum
                      game. It is all about who take the opportunity first.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Button shape="round" className="ant-btn-background-ghost">
                      Read More
                      {
                        <ArrowRightOutlined
                          style={{ marginLeft: "8px", marginRight: "0px" }}
                        />
                      }
                    </Button>
                  </div>
                </div>
              </Card>

              <Card
                bodyStyle={{ paddingBottom: "12px", paddingTop: "0px" }}
                bordered={false}
                className="criclebox card-info-2 card-notification mb-24 header-solid"
                title={[
                  <React.Fragment key={0}>
                    <h6 className="font-semibold m-0">Categories</h6>
                  </React.Fragment>,
                ]}
              >
                <List
                  className="categories-list"
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{ borderRadius: "12px" }}
                            shape="square"
                            src={item.avatar}
                            className="bg-gradient-dark"
                          />
                        }
                        title={item.title}
                        description={item.subtitle}
                      />
                      <div>
                        <Button type="link">
                          <RightOutlined className="text-dark" />
                        </Button>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
              <Card
                bordered={false}
                className="criclebox card-info-2 mb-24 header-solid card-notification"
              >
                <Row gutter={[24, 0]}>
                  <Col span={8}>
                    <Avatar size={100} src={img} shape="square" />
                  </Col>
                  <Col span={16}>
                    <p className="font-semibold">
                      Today is Martina's birthday. Wish her the best of luck!
                    </p>
                    <Button type="primary" size="small">
                      Send message
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col span={24} lg={12} className="mb-24">
              <Card
                bordered={false}
                bodyStyle={{ paddingTop: 0 }}
                className="header-solid h-full  ant-list-yes"
                title={<h6 className="font-semibold m-0">Your Transactions</h6>}
                extra={
                  <p className="card-header-date">
                    <CalendarFilled />
                    <span>23 - 30 March 2021</span>
                  </p>
                }
              >
                <List
                  className="transactions-list ant-newest"
                  itemLayout="horizontal"
                  dataSource={newest}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar size="large" className={item.textclass}>
                            {item.avatar}
                          </Avatar>
                        }
                        title={item.title}
                        description={item.description}
                      />
                      <div className="amount">
                        <span className={item.amountcolor}>{item.amount}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={24} lg={12} className="mb-24">
              <Card
                bordered={false}
                bodyStyle={{ paddingTop: 0 }}
                className="header-solid h-full  ant-list-yes"
                title={<h6 className="font-semibold m-0">Revenue</h6>}
                extra={
                  <p className="card-header-date">
                    <CalendarFilled />
                    <span>01 - 07 June 2021</span>
                  </p>
                }
              >
                <List
                  className="transactions-list ant-newest"
                  itemLayout="horizontal"
                  dataSource={revenue}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar size="large" className={item.textclass}>
                            {item.avatar}
                          </Avatar>
                        }
                        title={item.title}
                        description={item.description}
                      />
                      <div className="amount">
                        <span className={item.amountcolor}>{item.amount}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
