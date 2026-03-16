import React, { Component } from "react";
import { Row, Col, Card, Alert } from "antd";

export default class Alerts extends Component {
  render() {
    return (
      <React.Fragment>
        <Row gutter={[24, 0]} justify="center">
          <Col md={16}>
            <Card
              bordered={false}
              title={[
                <h5 className="font-bold" key={0}>
                  Alerts
                </h5>,
              ]}
              className="header-solid mb-24"
            >
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Informational Notes"
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Warning"
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Error"
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Informational Notes"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
              />
            </Card>

            <Card
              bordered={false}
              title={[
                <h5 className="font-bold" key={0}>
                  Banners
                </h5>,
              ]}
              className="header-solid mb-24"
            >
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Informational Notes"
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Warning"
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Error"
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Informational Notes"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
              />
            </Card>

            <Card
              bordered={false}
              title={[
                <h5 className="font-bold" key={0}>
                  Closable
                </h5>,
              ]}
              className="header-solid mb-24"
            >
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                closable
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Informational Notes"
                type="info"
                showIcon
                closable
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Warning"
                type="warning"
                showIcon
                closable
                style={{ marginBottom: "16px" }}
              />
              <Alert
                message="Error"
                type="error"
                showIcon
                closable
                style={{ marginBottom: "16px" }}
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
                closable
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Informational Notes"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
                closable
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
                closable
              />
              <Alert
                style={{ marginBottom: "16px" }}
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
                closable
              />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
