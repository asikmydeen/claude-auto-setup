import React, { Component } from "react";
import BgProfile from "../../../images/bg-profile.jpg";
import {
  Row,
  Col,
  Card,
  Avatar,
  Radio,
  Steps,
  Form,
  Input,
  Button,
  Select,
  Upload,
} from "antd";
import profilavatar from "../../../images/face-1.jpg";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      text: "Some initial <b>bold</b> text",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };
  handleChange(value) {
    this.setState({ text: value });
  }

  next = () => {
    this.setState({
      current: this.state.current + 1,
    });
  };

  prev = () => {
    this.setState({
      current: this.state.current - 1,
    });
  };
  render() {
    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    const { current } = this.state;
    const { Option } = Select;
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <div style={{ marginTop: 8 }}>Drop files here to upload</div>
      </div>
    );
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
                  <Avatar key={0} size={74} shape="square" src={profilavatar} />

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
        <div className="mx-auto mt-50" style={{ maxWidth: "800px" }}>
          <div className="mb-50">
            <Steps
              progressDot
              current={current}
              onChange={this.onChange}
              items={[
                { title: "Product Info", key: 0 },
                { title: "Media", key: 1 },
                { title: "Socials", key: 2 },
                { title: "Pricing", key: 3 },
              ]}
            />
          </div>
          <div className="mb-24">
            {current === 0 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <h5 className="mb-0" key={0}>
                    Product Information
                  </h5>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={12}>
                      <Form.Item label="Name" colon={false}>
                        <Input placeholder="eg. Off-White" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Weight" colon={false}>
                        <Input placeholder="eg. 42" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Description" colon={false}>
                        <ReactQuill
                          style={{ height: "90px", borderRadius: "6" }}
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
                      <Form.Item label="Size" colon={false}>
                        <Select
                          defaultValue="Small"
                          size="large"
                          onChange={handleChange}
                        >
                          <Option value="Small">Small</Option>
                          <Option value="Medium">Medium</Option>
                          <Option value="Large">Large</Option>
                          <Option value="Extra Large">Extra Large</Option>

                          <Option value="Extra Small">Extra Small</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24} className="text-right">
                      <Button
                        onClick={this.next}
                        type="primary"
                        className="px-25"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}
            {current === 1 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <h5 className="mb-0" key={0}>
                    Media
                  </h5>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={24}>
                      <Form.Item label="Product images" colon={false}>
                        <Upload
                          name="avatar"
                          listType="picture-card projects-uploader"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="#"
                          onChange={this.handleChange}
                        >
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Button onClick={this.prev} className="px-25">
                        PREV
                      </Button>
                    </Col>

                    <Col span={12} className="text-right">
                      <Button
                        onClick={this.next}
                        type="primary"
                        className="px-25"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}

            {current === 2 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <h5 className="mb-0" key={0}>
                    Socials
                  </h5>,
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

                    <Col span={12}>
                      <Button onClick={this.prev} className="px-25">
                        PREV
                      </Button>
                    </Col>

                    <Col span={12} className="text-right">
                      <Button
                        onClick={this.next}
                        type="primary"
                        className="px-25"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}

            {current === 3 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <h5 className="mb-0" key={0}>
                    Pricing
                  </h5>,
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

                    <Col span={12}>
                      <Button onClick={this.prev} className="px-25">
                        PREV
                      </Button>
                    </Col>

                    <Col span={12} className="text-right">
                      <Button type="primary" className="px-25">
                        SEND
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}
          </div>
        </div>
      </>
    );
  }
}
