/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
const { Footer } = Layout;
export default class FooterNEw extends Component {
  render() {
    return (
      <>
        <Footer style={{ background: "#fafafa" }}>
          <Row className="just">
            <Col xs={24} md={12} lg={12}>
              <div className="copyright">
                © 2021, made with
                {<HeartFilled />} by
                <a href="#" className="font-weight-bold" target="_blank">
                  Creative Tim
                </a>
                for a better web.
              </div>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <div className="footer-menu">
                <ul>
                  <li className="nav-item">
                    <a href="#" className="nav-link" target="_blank">
                      Creative Tim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" target="_blank">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" target="_blank">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="nav-link pe-0"
                      target="_blank"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Footer>
      </>
    );
  }
}
