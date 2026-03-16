import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Avatar,
  Tag,
  Timeline,
  Tooltip,
  Descriptions,
} from "antd";
import photo12 from "../../../images/photo-12.jpg";
import mastercard from "../../../images/mastercard-logo.png";
import { InfoOutlined } from "@ant-design/icons";
export default class OrderDetails extends Component {
  render() {
    return (
      <>
        <Card
          className="card-order header-solid mb-24 mx-auto mt-20 mb-50"
          title={[<h6 className="mb-0">Order Details</h6>]}
          bordered={false}
          style={{ maxWidth: "800px" }}
        >
          <Row gutter={[24, 0]}>
            <Col span={24} md={8}>
              <p className="mb-0">
                Order no. <strong>241342</strong> from
                <strong>23.02.2021</strong>
              </p>
              <p className="mb-0">
                Code: <strong>KF332</strong>
              </p>
            </Col>
            <Col span={24} md={8} className="ml-auto text-right">
              <Button>INVOICE</Button>
            </Col>
          </Row>
          <hr className="gradient-line" />
          <Row gutter={[24, 0]} className="order-products">
            <Col span={24} md={12}>
              <div className="avat-flex">
                <Avatar
                  src={photo12}
                  shape="square"
                  size={110}
                  alt="photo-12"
                  className="mr-15"
                />
                <div>
                  <h6 className="mb-0 mt-10 font-semibold">Gold Glasses</h6>
                  <p className="mb-15">Order was delivered 2 days ago.</p>
                  <Tag color="#87d068" className="font-semibold">
                    DELIVERED
                  </Tag>
                </div>
              </div>
            </Col>

            <Col span={24} md={12} className="text-right">
              <Button type="primary" className="mb-10">
                CONTACT US
              </Button>
              <p>Do you like the product? Leave us a review here.</p>
            </Col>
          </Row>
          <hr className="gradient-line" />
          <Row gutter={[24, 0]}>
            <Col span={24} md={12} lg={6}>
              <h5 className="mb-15">Track order</h5>
              <Timeline>
                <Timeline.Item color="green">
                  Order received
                  <small>22 DEC 7:20 AM</small>
                </Timeline.Item>
                <Timeline.Item color="green">
                  Generate order id #1832412
                  <small>22 DEC 7:21 AM</small>
                </Timeline.Item>
                <Timeline.Item>
                  Order transmited to courier
                  <small>22 DEC 8:10 AM</small>
                </Timeline.Item>
                <Timeline.Item>
                  Order delivered
                  <small>22 DEC 4:54 PM</small>
                </Timeline.Item>
              </Timeline>
            </Col>
            <Col span={24} md={12} lg={10}>
              <h5 className="mb-15">Payment Details</h5>
              <Card className="payment-method-card mb-24">
                <img src={mastercard} alt="" />
                <h6 className="card-number">**** **** **** 7362</h6>
                <Tooltip title="We do not store card details">
                  <Button size="small" shape="circle">
                    <InfoOutlined />
                  </Button>
                </Tooltip>
              </Card>
              <h6 className="mb-15">Billing Information</h6>
              <Card bordered={false} className="card-billing-info">
                <Descriptions title="Oliver Liam">
                  <Descriptions.Item label="Company Name" span={3}>
                    Viking Burrito
                  </Descriptions.Item>

                  <Descriptions.Item label="Email Address" span={3}>
                    oliver@burrito.com
                  </Descriptions.Item>
                  <Descriptions.Item label="VAT Number" span={3}>
                    FRB1235476
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col className="ml-auto" span={24} md={12} lg={6}>
              <h6 className="mb-15">Order Summary</h6>
              <div className="mb-10 ant-order-flex">
                <span className="text-muted"> Product Price: </span>
                <span className="text-lg text-dark font-semibold ml-auto">
                  $90
                </span>
              </div>
              <div className="mb-10 ant-order-flex">
                <span className="text-muted"> Delivery: </span>
                <span className="text-lg text-dark font-semibold ml-auto">
                  $15
                </span>
              </div>
              <div className="mb-10 ant-order-flex">
                <span className="text-muted"> Taxes: </span>
                <span className="text-lg text-dark font-semibold ml-auto">
                  $1.95
                </span>
              </div>
              <div className="mb-10 ant-order-flex">
                <h5 className="font-regular text-muted"> Total: </h5>
                <h5 className="text-dark font-semibold ml-auto">$105.95</h5>
              </div>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}
