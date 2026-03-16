import React, { Component } from "react";
import { Row, Col, Card, notification } from "antd";
import Button from "antd-button-color";

import {
  SmileOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";

export default class Notifications extends Component {
  render() {
    const openBasic = () => {
      notification.open({
        message: "Notification Title",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
    const openCustomized = () => {
      notification.open({
        message: "Notification Title",
        icon: <SmileOutlined className="ant-btn-link" />,
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
    const openCustomizedstyle = () => {
      notification.open({
        message: "Notification Title",

        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        onClick: () => {
          console.log("Notification Clicked!");
        },

        style: {
          width: 600,
        },
      });
    };
    const openCustomDuration = () => {
      notification.open({
        message: "Notification Title",

        description:
          "I will never close automatically. I will be close automatically. I will never close automatically.",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
    const key = "updatable";
    const openupdate = () => {
      notification.open({
        key,
        message: "Notification Title",
        description: "description.",
      });
      setTimeout(() => {
        notification.open({
          key,
          message: "New Title",
          description: "New description.",
        });
      }, 1000);
    };

    const close = () => {
      console.log(
        "Notification was closed. Either the close button was clicked or duration time elapsed."
      );
    };

    const opencustomClose = () => {
      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type="primary"
          size="small"
          onClick={() => notification.close(key)}
        >
          Confirm
        </Button>
      );
      notification.open({
        message: "Notification Title",
        description:
          'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
        btn,
        key,
        onClose: close,
      });
    };

    const openNotification = (placement) => {
      notification.open({
        message: `Notification ${placement}`,
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        placement,
      });
    };

    const openNotificationWithIcon = (type) => {
      notification[type]({
        message: "Notification Title",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      });
    };

    const getNotificationStyle = (type) => {
      return {
        success: {
          color: "rgba(0, 0, 0, 0.65)",
          border: "1px solid #b7eb8f",
          backgroundColor: "#f6ffed",
        },
        warning: {
          color: "rgba(0, 0, 0, 0.65)",
          border: "1px solid #ffe58f",
          backgroundColor: "#fffbe6",
        },
        error: {
          color: "rgba(0, 0, 0, 0.65)",
          border: "1px solid #ffa39e",
          backgroundColor: "#fff1f0",
        },
        info: {
          color: "rgba(0, 0, 0, 0.65)",
          border: "1px solid #91d5ff",
          backgroundColor: "#e6f7ff",
        },
      }[type];
    };

    const openCustomNotificationWithIcon = (type) => {
      notification[type]({
        message: "Notification Title",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        style: getNotificationStyle(type),
        duration: 0,
      });
    };

    return (
      <>
        <Row gutter={[24, 0]} justify="center">
          <Col md={16} span={24}>
            <Card
              title={[<h6 key={0}>Notifications</h6>]}
              bordered={false}
              className="header-solid mb-24"
            >
              <Row gutter={[24, 0]}>
                <Col lg={12} className="mb-24" span={24}>
                  <Button type="primary" onClick={openBasic} block>
                    Basic
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button type="primary" onClick={openCustomized} block>
                    Customized Icon
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button type="primary" onClick={openCustomizedstyle} block>
                    Customized style
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button type="primary" onClick={openCustomDuration} block>
                    Custom duration
                  </Button>
                </Col>

                <Col lg={12} className="mb-24" span={24}>
                  <Button type="primary" onClick={opencustomClose} block>
                    Custom close button
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button type="primary" onClick={openupdate} block>
                    Update Message Content
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card
              title={[<h6 key={0}>Positions</h6>]}
              bordered={false}
              className="header-solid mb-24"
            >
              <Row gutter={[24, 0]}>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    block
                    type="primary"
                    onClick={() => openNotification("topLeft")}
                  >
                    <RadiusUpleftOutlined />
                    topLeft
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    type="primary"
                    block
                    onClick={() => openNotification("topRight")}
                  >
                    <RadiusUprightOutlined />
                    topRight
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    type="primary"
                    block
                    onClick={() => openNotification("bottomLeft")}
                  >
                    <RadiusBottomleftOutlined />
                    bottomLeft
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    type="primary"
                    block
                    onClick={() => openNotification("bottomRight")}
                  >
                    <RadiusBottomrightOutlined />
                    bottomRight
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card
              title={[<h6 key={0}>Various States</h6>]}
              bordered={false}
              className="header-solid mb-24"
            >
              <Row gutter={[24, 0]}>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    block
                    type="success"
                    onClick={() => openNotificationWithIcon("success")}
                  >
                    Success
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    block
                    type="info"
                    onClick={() => openNotificationWithIcon("info")}
                  >
                    Info
                  </Button>
                </Col>
                <Col lg={12} className="mb-24" span={24}>
                  <Button
                    block
                    type="warning"
                    onClick={() => openNotificationWithIcon("warning")}
                  >
                    Warning
                  </Button>
                </Col>
                <Col lg={12} span={24} className="mb-24">
                  <Button
                    block
                    type="danger"
                    onClick={() => openNotificationWithIcon("error")}
                  >
                    Error
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card
              title={[<h6 key={0}>Solid States</h6>]}
              bordered={false}
              className="header-solid mb-24"
            >
              <Row gutter={[24, 0]}>
                <Col span={24} lg={12} className="mb-24">
                  <Button
                    type="info"
                    block
                    onClick={() => openCustomNotificationWithIcon("info")}
                  >
                    Info
                  </Button>
                </Col>
                <Col span={24} lg={12} className="mb-24">
                  <Button type="success" block   onClick={() => openCustomNotificationWithIcon("success")}>
                    Success
                  </Button>
                </Col>

                <Col span={24} lg={12} className="mb-24">
                  <Button type="warning" block onClick={() => openCustomNotificationWithIcon("warning")}>
                  warning
                  </Button>
                </Col>
              
                <Col span={24} lg={12} className="mb-24">
                  <Button type="danger" block  onClick={() => openCustomNotificationWithIcon("error")}>
                    Danger
                  </Button>
                </Col>
               
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
