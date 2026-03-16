/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import BgProfile from "../../images/bg-profile.jpg";
import { Row, Col, Card, Avatar, Radio } from "antd";
import profilavatar from "../../images/face-1.jpg";
import convesionImg from "../../images/face-3.jpg";
import convesionImg2 from "../../images/face-4.jpg";
import convesionImg3 from "../../images/face-5.jpeg";

import logo1 from "../../images/logo-slack.svg";
import ava1 from "../../images/logo-spotify.svg";
import ava2 from "../../images/logo-xd.svg";
import ava3 from "../../images/logo-asana.svg";
import ava4 from "../../images/logo-invision.svg";

import { MoreOutlined } from "@ant-design/icons";

export default class AllProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placement: "left",
      loading: false,
    };
  }

  render() {
    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }

    const card = [
      {
        headerImg: logo1,
        title: "Slack Bot",
        Descriptions:
          "If everything I did failed - which it doesn't, I think that it actually succeeds.",
        footer: (
          <Row gutter={[24]}>
            <Col>
              <h6 className="font-semibold text-md mb-0">5</h6>
              <p className="font-semibold text-muted mb-0">Participants</p>
            </Col>
            <Col className="ml-auto">
              <h6 className="font-semibold text-md mb-0">02.03.22</h6>
              <p className="font-semibold text-muted mb-0">Due date</p>
            </Col>
          </Row>
        ),
      },
      {
        headerImg: ava1,
        title: "Premium support",
        Descriptions:
          "Pink is obviously a better color. Everyone’s born confident, and everything’s taken away from you.",
        footer: (
          <Row gutter={[24]}>
            <Col>
              <h6 className="font-semibold text-md mb-0">3</h6>
              <p className="font-semibold text-muted mb-0">Participants</p>
            </Col>
            <Col className="ml-auto">
              <h6 className="font-semibold text-md mb-0">22.11.21</h6>
              <p className="font-semibold text-muted mb-0">Due date</p>
            </Col>
          </Row>
        ),
      },
      {
        headerImg: ava2,
        title: "Premium support",
        Descriptions:
          "Constantly growing. We’re constantly making mistakes from which we learn and improve.",
        footer: (
          <Row gutter={[24]}>
            <Col>
              <h6 className="font-semibold text-md mb-0">4</h6>
              <p className="font-semibold text-muted mb-0">Participants</p>
            </Col>
            <Col className="ml-auto">
              <h6 className="font-semibold text-md mb-0">06.03.20</h6>
              <p className="font-semibold text-muted mb-0">Due date</p>
            </Col>
          </Row>
        ),
      },
      {
        headerImg: ava3,
        title: "Looking great",
        Descriptions:
          "If everything I did failed - which it doesn't, I think that it actually succeeds.",
        footer: (
          <Row gutter={[24]}>
            <Col>
              <h6 className="font-semibold text-md mb-0">6</h6>
              <p className="font-semibold text-muted mb-0">Participants</p>
            </Col>
            <Col className="ml-auto">
              <h6 className="font-semibold text-md mb-0">14.03.24</h6>
              <p className="font-semibold text-muted mb-0">Due date</p>
            </Col>
          </Row>
        ),
      },
      {
        headerImg: ava4,
        title: "Developer First",
        Descriptions:
          "For standing out. But the time is now to be okay to be the greatest you.",
        footer: (
          <Row gutter={[24]}>
            <Col>
              <h6 className="font-semibold text-md mb-0">4</h6>
              <p className="font-semibold text-muted mb-0">Participants</p>
            </Col>
            <Col className="ml-auto">
              <h6 className="font-semibold text-md mb-0">16.01.22</h6>
              <p className="font-semibold text-muted mb-0">Due date</p>
            </Col>
          </Row>
        ),
      },
    ];

    return (
      <>
        <div
          className="profile-nav-bg"
          style={{ backgroundImage: "url(" + BgProfile + ")" }}
        ></div>

        <Card
          className="card-profile-head"
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
                <Radio.Group onChange={onChange} defaultValue="a">
                  <Radio.Button value="a">OVERVIEW</Radio.Button>
                  <Radio.Button value="b">TEAMS</Radio.Button>
                  <Radio.Button value="c">PROJECTS</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          }
        ></Card>

        <Row>
          <Col span={25} lg={16}>
            <h5 className="font-semibold">Some of Our Awesome Projects</h5>
            <p className="text-lg">
              This is the paragraph where you can write more details about your
              projects. Keep you user engaged by providing meaningful
              information.
            </p>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          {card.map((card, index) => (
            <Col span={24} lg={8} className="mb-24" key={index}>
              <Card
                bodyStyle={{ paddingTop: "14px" }}
                bordered={false}
                className="card-project-2 header-solid"
                title={[
                  <Row gutter={[24, 24]} key={0}>
                    <Col>
                      <Avatar
                        src={card.headerImg}
                        style={{
                          width: "74px",
                          height: "74px",
                          lineHeight: "74px",
                          borderRadius: "8px",
                          padding: "16px",
                          backgroundImage:
                            "linear-gradient(310deg, rgb(20, 23, 39), rgb(58, 65, 111))",
                        }}
                      />
                    </Col>
                    <Col>
                      <h6 className="font-semibold mb-10">{card.title}</h6>
                      <Avatar.Group className="avatar-chips">
                        <Avatar size="small" src={profilavatar} />
                        <Avatar size="small" src={convesionImg} />
                        <Avatar size="small" src={convesionImg2} />
                        <Avatar size="small" src={convesionImg3} />
                      </Avatar.Group>
                    </Col>
                    <Col className="ml-auto pt-10">
                      <a href="#">
                        <MoreOutlined className="text-muted" />
                      </a>
                    </Col>
                  </Row>,
                ]}
              >
                <p>{card.Descriptions}</p>
                <hr />
                {card.footer}
              </Card>
            </Col>
          ))}

          <Col span={24} lg={8} className="mb-24">
            <Card
              className="crm-bar-line header-solid h-full"
              bodyStyle={{
                padding: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <a href="#" className="text-center text-muted font-bold">
                <h3
                  className="font-semibold text-muted mb-0"
                  style={{ fontSize: "30px" }}
                >
                  +
                </h3>
                <h5 className="font-semibold text-muted">New project</h5>
              </a>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
