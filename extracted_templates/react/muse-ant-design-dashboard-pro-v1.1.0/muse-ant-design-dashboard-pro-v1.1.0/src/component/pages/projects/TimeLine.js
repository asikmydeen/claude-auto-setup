import React, { Component } from "react";
import { Timeline, Row, Col, Card } from "antd";
export default class TimeLine extends Component {
  render() {
    const timeline = [1, { cls: "bg-gray-10 timeline-dark" }];
    return (
      <>
        <Row gutter={[24, 0]}>
          {timeline.map((t, index) => (
            <Col span={24} md={12} key={index}>
              <Card
                bordered={false}
                title={[<h6 key={0}>Timeline with dotted line</h6>]}
                className={`header-solid mb-24  ${t.cls}`}
              >
                <Timeline>
                  <Timeline.Item color="green">
                    $2400, Design changes
                    <small>22 DEC 7:20 PM</small>
                    <p>
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="red">
                    New order #1832412
                    <small>21 DEC 11 PM</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item>
                    Server payments for April
                    <small>21 DEC 9:34 PM</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="warning">
                    New card added for order #4395133
                    <small>20 DEC 2:20 AM</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="secondary">
                    Unlock packages for development
                    <small>18 DEC 4:54 AM</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    New message unread
                    <small>16 DEC</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    Notifications unread
                    <small>15 DEC</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="warning">
                    New request
                    <small>14 DEC</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item color="dark">
                    Controller issues
                    <small>13 DEC</small>
                    <p>
                      {" "}
                      People care about how you see the world, how you think,
                      what motivates you, what you’re struggling with or afraid
                      of.{" "}
                    </p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
