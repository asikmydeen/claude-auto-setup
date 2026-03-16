import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Tag,
  InputNumber,
  Form,
  Select,
  Button,
  Table,
  Avatar,
  Progress,
} from "antd";
import photo2 from "../../../images/photo-2.jpg";
import sw1 from "../../../images/chair-pink.jpg";
import sw2 from "../../../images/chair-steel.jpg";
import sw3 from "../../../images/black-chair.jpg";
import sw4 from "../../../images/chair-wood.jpg";
import { StarFilled, StarOutlined } from "@ant-design/icons";
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(value) {
  console.log("changed", value);
}
export default class ProductPage extends Component {
  render() {
    const columns = [
      {
        title: "PRODUCT",
        dataIndex: "name",
        className: "ant-table-row-cell-break-word",
        sorter: {
          compare: (a, b) => a.name - b.name,
          multiple: 3,
        },
      },
      {
        title: "PRICE",
        className: "ant-table-row-cell-break-word",
        dataIndex: "money",
        sorter: {
          compare: (a, b) => a.money - b.money,
          multiple: 2,
        },
      },
      {
        title: "REVIEW",
        dataIndex: "privew",
        className: "ant-table-row-cell-break-word",
      },
      {
        title: "AVAILABILITY",
        dataIndex: "availabity",
        className: "ant-table-row-cell-break-word",
      },
      {
        title: "ID",
        dataIndex: "id",
        className: "ant-table-row-cell-break-word",
      },
    ];

    const data = [
      {
        key: "1",
        name: (
          <h6 className="mb-0">
            <Avatar
              src={sw3}
              alt="photo"
              className="mr-10"
              size={48}
              shape="square"
            />
            Christopher Knight Home
          </h6>
        ),
        money: "$89.53",
        privew: (
          <div className="rating">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
        ),
        availabity: <Progress percent={80} showInfo={false} />,
        id: "230019",
      },

      {
        key: "2",
        name: (
          <h6 className="mb-0">
            <Avatar
              src={sw1}
              alt="photo"
              className="mr-10"
              size={48}
              shape="square"
            />
            Bar Height Swivel Barstool
          </h6>
        ),
        money: "$99.99",
        privew: (
          <div className="rating">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
        ),
        availabity: <Progress percent={90} showInfo={false} />,
        id: "87120",
      },
      {
        key: "3",
        name: (
          <h6 className="mb-0">
            <Avatar
              src={sw2}
              alt="photo"
              className="mr-10"
              size={48}
              shape="square"
            />
            Signature Design by Ashley
          </h6>
        ),
        money: "$129.00",
        privew: (
          <div className="rating">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
        ),
        availabity: (
          <Progress percent={60} showInfo={false} status="exception" />
        ),
        id: "412301",
      },

      {
        key: "4",
        name: (
          <h6 className="mb-0">
            <Avatar
              src={sw4}
              alt="photo"
              className="mr-10"
              size={48}
              shape="square"
            />
            Modern Square
          </h6>
        ),
        money: "$59.99",
        privew: (
          <div className="rating">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
        ),
        availabity: (
          <Progress percent={40} showInfo={false} status="exception" />
        ),
        id: "001992",
      },
    ];
    return (
      <>
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <Card
              title={[<h6 className="mb-0">Product Details</h6>]}
              bordered={false}
              className="header-solid card-product mb-24"
            >
              <Row gutter={[24, 0]}>
                <Col span={24} lg={12} xl={10} className="col-gallery mb-24">
                  <img
                    src={photo2}
                    alt="card-2"
                    className="gallery-img shadow-3 img-contain"
                  />
                  <div className="thumbnails mt-30">
                    <Image.PreviewGroup>
                      <Image src={sw1} />
                      <Image src={sw2} />
                      <Image src={sw3} />
                      <Image src={sw4} />
                    </Image.PreviewGroup>
                  </div>
                </Col>
                <Col span={24} xl={12} lg={{ offset: 2 }}>
                  <h3 className="h3">Minimal Bar Stool</h3>
                  <div className="rating">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarOutlined />
                  </div>
                  <h6 className="mb-0 mt-20 font-semibold">Price</h6>
                  <h5 className="font-semibold">$1,419</h5>
                  <Tag color="green" className="font-bold">
                    IN STOCK
                  </Tag>
                  <h6 className="mt-20 font-semibold">
                    <small>Description:</small>
                  </h6>
                  <ul>
                    <li>
                      <p className="mb-0 text-lg text-muted">
                        The most beautiful curves of this swivel stool adds an
                        elegant touch to any environment
                      </p>
                    </li>
                    <li>
                      <p className="mb-0 text-lg text-muted">
                        Memory swivel seat returns to original seat position
                      </p>
                    </li>
                    <li>
                      <p className="mb-0 text-lg text-muted">
                        Comfortable integrated layered chair seat cushion design
                      </p>
                    </li>
                    <li>
                      <p className="mb-0 text-lg text-muted">
                        Fully assembled! No assembly required
                      </p>
                    </li>
                  </ul>
                  <Form layout="vertical">
                    <Row gutter={[24, 0]}>
                      <Col span={12} lg={8}>
                        <Form.Item
                          label="Frame Material"
                          colon={false}
                          className="mb-10"
                        >
                          <Select
                            defaultValue="Wood"
                            onChange={handleChange}
                            size="large"
                          >
                            <Option value="Wood">Wood</Option>
                            <Option value="Aluminum">Aluminum</Option>
                            <Option value="Carbon">Carbon</Option>
                            <Option value="Steel">Steel</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12} lg={8}>
                        <Form.Item
                          label="Color"
                          colon={false}
                          className="mb-10"
                        >
                          <Select
                            defaultValue="White"
                            onChange={handleChange}
                            size="large"
                          >
                            <Option value="White">White</Option>
                            <Option value="Black">Black</Option>
                            <Option value="Blue">Blue</Option>
                            <Option value="Gray">Gray</Option>
                            <Option value="Pink">Pink</Option>
                            <Option value="Red">Red</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={8}>
                        <Form.Item
                          label="Quantity"
                          colon={false}
                          size="large"
                          className="mb-10"
                        >
                          <InputNumber
                            min={1}
                            max={10}
                            defaultValue={2}
                            onChange={onChange}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={8}>
                        <Button type="primary" block>
                          ADD TO CART
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <Row gutter={[24, 0]} className="mt-24">
                <Col span={24}>
                  <h6>Other Products</h6>
                  <Table
                    tableLayout="auto"
                    scroll={{ x: 500 }}
                    columns={columns}
                    dataSource={data}
                    bordered={false}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
