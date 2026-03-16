import React, { Component } from "react";

import { Row, Col, Card } from "antd";
import ChartLine2 from "./chart/ChartLine2";
import ChartLineGradient from "./chart/ChartLineGradient";
import ChartBar2 from "./chart/ChartBar2";
import ChartBarHorizontal from "./chart/ChartBarHorizontal";
import ChartMixed from "./chart/ChartMixed";
import ChartBubble from "./chart/ChartBubble";
import ChartDoughnut from "./chart/ChartDoughnut";
import ChartPie from "./chart/ChartPie";
import ChartRadar from "./chart/ChartRadar";
import ChartPolar from "./chart/ChartPolar";

export default class ChartLine extends Component {
  render() {
    return (
      <>
        <div className="chart">
          <Row gutter={[24, 0]}>
            <Col className="mb-24" span={24} lg={12}>
              <h5 className="font-semibold">Charts</h5>
              <p>
                Charts on this page use Chart.js - Simple yet flexible
                JavaScript charting for designers &amp; developers.
              </p>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Line chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 12px 8px 3px" }}
              >
                <ChartLine2 />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Line chart with gradient</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 12px 8px 3px" }}
              >
                <ChartLineGradient />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Bar chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 12px 8px 3px" }}
              >
                <ChartBar2 />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Bar chart horizontal</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 12px 8px 3px" }}
              >
                <ChartBarHorizontal />
              </Card>
            </Col>

            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Mixed chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 12px 8px 3px" }}
              >
                <ChartMixed />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Bubble chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 12px 8px 3px" }}
              >
                <ChartBubble />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Doughnut chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 40px 40px" }}
              >
                <ChartDoughnut />
              </Card>
            </Col>

            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Pie chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 40px 40px" }}
              >
                <ChartPie />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Radar chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 40px 40px" }}
              >
                <ChartRadar />
              </Card>
            </Col>
            <Col lg={12} span={24}>
              <Card
                bordered={false}
                className="header-solid mb-24"
                title={[
                  <React.Fragment key={0}>
                    <h5 className="font-bold">Polar chart</h5>
                  </React.Fragment>,
                ]}
                bodyStyle={{ padding: "0px 40px 40px" }}
              >
                <ChartPolar />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
