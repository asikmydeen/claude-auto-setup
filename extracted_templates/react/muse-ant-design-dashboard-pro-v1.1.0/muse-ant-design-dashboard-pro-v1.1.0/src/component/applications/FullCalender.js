/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Card, Avatar, Button, List, Menu, Dropdown } from "antd";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import profilavatar from "../images/face-1.jpg";
import convesionImg from "../images/face-3.jpg";
import convesionImg2 from "../images/face-4.jpg";
import convesionImg3 from "../images/face-5.jpeg";
import {
  PlusOutlined,
  CalendarFilled,
  BellFilled,
  BookFilled,
  CarFilled,
  WindowsFilled,
  ArrowUpOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default class FullCalender extends Component {
  render() {
    const newest = [
      {
        avatar: <CalendarFilled />,
        title: "Cyber Week",
        description: "27 March 2021, at 12:30 PM",

        textclass: "text-light-danger",
      },
      {
        avatar: <BellFilled />,
        title: "Meeting with Marry",
        description: "24 March 2021, at 10:00 PM",

        textclass: "text-bell-fill",
      },
      {
        avatar: <BookFilled />,
        title: "Book Deposit Hall",
        description: "25 March 2021, at 9:30 AM",

        textclass: "text-fill",
      },
      {
        avatar: <CarFilled />,
        title: "Shipment Deal UK",
        description: "25 March 2021, at 2:00 PM",

        textclass: "text-fill-carFilled",
      },
      {
        avatar: <WindowsFilled />,
        title: "Verify Dashboard Color Palette",
        description: "26 March 2021, at 9:00 AM",

        textclass: "text-fill-windowsFilled",
      },
    ];
    const menu = (
      <Menu
        items={[
          {
            key: "0",
            label: <a href="https://www.antgroup.com">1st menu item</a>,
          },
          {
            key: "1",
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
          },
          {
            type: "divider",
          },
          {
            key: "3",
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
          },
        ]}
      />
    );

    const data = {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Visitors",
          tension: 0.5,
          pointRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
          backgroundColor: [
            "rgba(255,255,255,0.3)",
            "rgba(72,72,176,0.0)",
            "rgba(203,12,159,0)",
          ],
          data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
          maxBarThickness: 6,
          fill: true,
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    };

    return (
      <>
        <div className="layout-content">
          <div className="calendar-head my-15">
            <div className="ml-auto">
              <h6 className="text-sm text-muted font-bold">Team members :</h6>
              <Avatar.Group className="avatar-chips">
                <Avatar size="large" src={profilavatar} />
                <Avatar size="large" src={convesionImg} />
                <Avatar size="large" src={convesionImg2} />
                <Avatar size="large" src={convesionImg3} />
              </Avatar.Group>
            </div>
            <div>
              <Button type="primary">
                <PlusOutlined className="svg-m" />
              </Button>
            </div>
          </div>
          <Row gutter={[24, 0]}>
            <Col span={24} lg={18} className="mb-24">
              <Card>
                <FullCalendar
                  contentHeight="auto"
                  height={400}
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
            <Col span={24} lg={6}>
              <Card
                bordered={false}
                bodyStyle={{ paddingTop: 0 }}
                className="header-solid mb-24  ant-list-yes"
                title={<h6 className="font-semibold m-0">Next Events</h6>}
              >
                <List
                  className="transactions-list ant-newest"
                  itemLayout="horizontal"
                  dataSource={newest}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size={48}
                            shape="square"
                            className={item.textclass}
                          >
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
              <Card
                bodyStyle={{ padding: "0px" }}
                className="header-solid mb-24 card-chart-full"
                bordered={false}
                title={[
                  <Row gutter={[24, 0]}>
                    <Col span={12}>
                      <h6 className="font-semibold m-0">Productivity</h6>
                      <p>
                        <ArrowUpOutlined className="text-success mr-5" />
                        <strong>4% more</strong> in 2021{" "}
                      </p>
                    </Col>
                    <Col span={12} className="text-right">
                      <Dropdown menu={menu} trigger={["click"]}>
                        <a
                          className="ant-dropdown-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          <EllipsisOutlined className="text-white" />
                        </a>
                      </Dropdown>
                    </Col>
                  </Row>,
                ]}
              >
                <Chart type="line" data={data} options={options} height={100} />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
