import React, { Component } from "react";
import { Row, Col, Card, Button, Input, Form, Select } from "antd";
import photo from "../../../images/photo.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Option } from "rc-select";
export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      text: "Some initial <b>bold</b> text",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }
  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    return (
      <>
        <Row gutter={[24, 0]}>
          <Col span={24} lg={12} className="mt-24 mb-24">
            <h4 className="h4">Make the changes below</h4>
            <p>
              We’re constantly trying to express ourselves and actualize our
              dreams. If you have the opportunity to play.
            </p>
          </Col>
          <Col span={24} lg={12} className="text-right mt-24 mb-24">
            <Button type="primary">SAVE</Button>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col span={24} lg={8} className="mb-24">
            <Card
              bodyStyle={{ paddingTop: "0px" }}
              bordered={false}
              className="header-solid h-full"
              title={[<h5 className="h5 mb-0">Product Image</h5>]}
            >
              <img
                src={photo}
                alt="card"
                className="product-img shadow-3 img-contain"
              />
              <div className="mt-20">
                <Button className="px-25" type="primary">
                  EDIT
                </Button>
                <Button className="ml-10 px-25"> REMOVE</Button>
              </div>
            </Card>
          </Col>
          <Col span={24} lg={16} className="mb-24">
            <Card
              title={[<h5 className="h5">Product Information</h5>]}
              className="header-solid h-full"
              bordered={false}
              bodyStyle={{ paddingTop: "10px", paddingBottom: "40px" }}
            >
              <Form layout="vertical">
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item label="Name" colon={false}>
                      <Input placeholder="Minimal Bar Stool" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Weight" colon={false}>
                      <Input placeholder="2" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Collection" colon={false}>
                      <Input placeholder="Summer" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Price" colon={false}>
                      <Input placeholder="$90" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Quantity" colon={false}>
                      <Input placeholder="2" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Description" colon={false}>
                      <ReactQuill
                        style={{ height: "85px" }}
                        value={this.state.text}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Category" colon={false}>
                      <Select
                        defaultValue="Clothing"
                        size="large"
                        onChange={handleChange}
                      >
                        <Option value="Clothing">Clothing</Option>
                        <Option value="Electronics">Electronics</Option>
                        <Option value="Furniture">Furniture</Option>
                        <Option value="Real Estate">Real Estate</Option>
                        <Option value="Others">Others</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Color" colon={false}>
                      <Select
                        defaultValue="Green"
                        size="large"
                        onChange={handleChange}
                      >
                        <Option value="Green">Green</Option>
                        <Option value="Black">Black</Option>
                        <Option value="Blue">Blue</Option>
                        <Option value="Orange">Orange</Option>
                        <Option value="White">White</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col span={24} lg={8} className="mb-24">
            <Card
              bodyStyle={{ paddingTop: "0px" }}
              className="header-solid"
              bordered={false}
              title={[
                <>
                  <h5 className="mb-0">Socials</h5>
                </>,
              ]}
            >
              <Form layout="vertical">
                <Row gutter={[24, 0]}>
                  <Col span={24}>
                    <Form.Item label="Twitter Handle" colon={false}>
                      <Input placeholder="@Soft" type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Facebook Account" colon={false}>
                      <Input placeholder="http://..." />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Instagram Account" colon={false}>
                      <Input placeholder="http://..." />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col span={24} lg={16}>
            <Card
              className="header-solid"
              bordered={false}
              title={[
                <>
                  <h5 className="mb-0">Pricing</h5>
                </>,
              ]}
            >
              <Form layout="vertical">
                <Row gutter={[24, 0]}>
                  <Col span={24} lg={8}>
                    <Form.Item label="Price" colon={false}>
                      <Input placeholder="99.00" type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={8}>
                    <Form.Item label="SKU" colon={false}>
                      <Input placeholder="71283476591" type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={8}>
                    <Form.Item label="Currency" colon={false}>
                      <Select
                        defaultValue="USD"
                        size="large"
                        onChange={handleChange}
                      >
                        <Option value="USD">USD</Option>
                        <Option value="EUR">EUR</Option>
                        <Option value="GBP">GBP</Option>
                        <Option value="INR">INR</Option>
                        <Option value="CNY">CNY</Option>
                        <Option value="BTC">BTC</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={24}>
                    <Form.Item label="Tags" colon={false}>
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        defaultValue={["Angular", "React", "Vue"]}
                        onChange={handleChange}
                        className="tags-field"
                        size="large"
                      >
                        <Option value="Angular">Angular</Option>
                        <Option value="React">React</Option>
                        <Option value="Vue">Vue</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
