import React, { Component } from "react";
import { Steps, Card, Form, Input, Row, Col, Button, Select } from "antd";

export default class NewUsers extends Component {
  state = {
    current: 0,
  };
  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };

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
    const { current } = this.state;
    return (
      <>
        <div className="mx-auto mt-50" style={{ maxWidth: "800px" }}>
          <div className="mb-50">
            <Steps
              progressDot
              current={current}
              onChange={this.onChange}
              items={[
                { title: "User Info", key: 0 },
                { title: "Address", key: 1 },
                { title: "Socials", key: 2 },
                { title: "Profile", key: 3 },
              ]}
            />
          </div>
          <div className="mb-24">
            {current === 0 && (
              <Card
                className="header-solid"
                bordered={false}
                title={[
                  <React.Fragment key={0}>
                    <h5 className="mb-0">About me</h5>
                    <p className="font-regular">Mandatory informations</p>
                  </React.Fragment>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={12}>
                      <Form.Item label="First Name" colon={false}>
                        <Input placeholder="eg. Michael" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Last Name" colon={false}>
                        <Input placeholder="eg. Prior" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Company" colon={false}>
                        <Input placeholder="eg. Creative Tim" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Email Address" colon={false}>
                        <Input
                          placeholder="eg. soft@dashboard.com"
                          type="email"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Password" colon={false}>
                        <Input placeholder="*****" type="password" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Repeat Password" colon={false}>
                        <Input placeholder="*****" type="password" />
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
                  <React.Fragment key={0}>
                    <h5 className="mb-0">Address</h5>
                  </React.Fragment>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={24}>
                      <Form.Item label="Address 1" colon={false}>
                        <Input placeholder="eg. Street 111" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Address 2" colon={false}>
                        <Input placeholder="eg. Street 221" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="City" colon={false}>
                        <Input placeholder="eg. Tokyo" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="State" colon={false}>
                        <Select
                          defaultValue="Lucky"
                          style={{
                            borderRadius: "6px",
                            height: "40px",
                            lineHeight: "40px",
                          }}
                        >
                          <Select.Option value="Lucky">Lucky</Select.Option>
                          <Select.Option value="Jack">Jack</Select.Option>
                          <Select.Option value=" Disabled " Disabled>
                            Disabled
                          </Select.Option>
                          <Select.Option value="yiminghe">
                            yiminghe
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Zip" colon={false}>
                        <Input placeholder="7 letters" type="text" />
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
                  <React.Fragment key={0}>
                    <h5 className="mb-0">Socials</h5>
                  </React.Fragment>,
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
                  <React.Fragment key={0}>
                    <h5 className="mb-0">Profile</h5>
                  </React.Fragment>,
                ]}
              >
                <Form layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col span={24}>
                      <Form.Item label="Public Email" colon={false}>
                        <Input
                          placeholder="Use an address you don't use frequently."
                          type="text"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Bio" colon={false}>
                        <textarea
                          className="ant-input"
                          placeholder="Say a few words about who you are or what you're working on."
                        ></textarea>
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
