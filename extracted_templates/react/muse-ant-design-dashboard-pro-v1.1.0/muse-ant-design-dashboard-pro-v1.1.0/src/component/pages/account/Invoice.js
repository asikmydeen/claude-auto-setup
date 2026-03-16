import React, { Component } from "react";
import { Card, Row, Col, Button } from "antd";
import logo from "../../images/logo.png";
export default class Invoice extends Component {
	
  print() {
    window.print();
  }
  render() {
    return (
      <>
        <Card
          className="card-invoice header-solid mb-24 mx-auto my-50 print"
          bordered={false}
          style={{ maxWidth: "800px" }}
          title={[<img src={logo} className="brand" alt="" key={0}/>]}
        >
          <Row
            justify="space-between"
            className="invoice-header"
            gutter={[24, 0]}
          >
            <Col span={24} md={8}>
              <h6 className="font-semibold">
                {" "}
                St. Independence Embankment, 050105 Bucharest, Romania{" "}
              </h6>
              <p> tel: +4 (074) 1090873 </p>
            </Col>
            <Col className="ml-auto text-right" span={25} md={8}>
              <h6 className="font-semibold"> Billed to: John Doe </h6>
              <p> 4006 Locust View Drive San Francisco CA California </p>
            </Col>
          </Row>

          <Row
            justify="space-between"
            className="invoice-info mt-50"
            gutter={[24, 0]}
          >
            <Col span={24} md={8}>
              <h6 className="font-semibold text-muted mb-0">Invoice no</h6>
              <h5 className="font-semibold"> #0453119 </h5>
            </Col>
            <Col className="ml-auto text-right" span={25} md={8}>
              <Row justify="space-between" gutter={[24, 0]}>
                <Col span={24} md={12}>
                  <h6 className="font-semibold text-muted mb-0">
                    {" "}
                    Invoice date:{" "}
                  </h6>
                  <h6 className="font-semibold text-muted mb-0"> Due date: </h6>
                </Col>
                <Col span={24} md={12}>
                  <h6 className="font-semibold mb-0"> 06/03/2019 </h6>
                  <h6 className="font-semibold mb-0"> 11/03/2019 </h6>
                </Col>
              </Row>
            </Col>
          </Row>
          <table className="table-invoice mt-30">
            <thead>
              <tr>
                <th colSpan="4" className="font-semibold">
                  Item
                </th>
                <th className="font-semibold">Qty</th>
                <th className="font-semibold">Rate</th>
                <th className="font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4"> Premium Support </td>
                <td> 1 </td>
                <td> $ 9.00 </td>
                <td> $ 9.00 </td>
              </tr>
              <tr>
                <td colSpan="4"> Soft UI Design System PRO </td>
                <td> 3 </td>
                <td> $ 100.00 </td>
                <td> $ 300.00 </td>
              </tr>
              <tr>
                <td colSpan="4"> Parts for service </td>
                <td> 1 </td>
                <td> $ 89.00 </td>
                <td> $ 89.00 </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="4"></th>
                <th></th>
                <th>
                  <h5 className="font-semibold">Total</h5>
                </th>
                <th>
                  <h5 className="font-semibold">$ 698</h5>
                </th>
              </tr>
            </tfoot>
          </table>

          <Row className="invoice-message mt-50 pt-50" gutter={[24, 0]}>
            <Col span={24} md={8}>
              <h5 className="font-semibold"> Thank you! </h5>
              <p>
                {" "}
                If you encounter any issues related to the invoice you can
                contact us at:{" "}
              </p>
            </Col>
          </Row>
          <Row className="invoice-foot" gutter={[24, 0]}>
            <Col span={24} md="12">
              <h6 className="font-semibold">
                <span className="text-muted">Email:</span>{" "}
                support@creative-tim.com{" "}
              </h6>
            </Col>
            <Col span={24} md="12" className="ml-auto text-right">
              <Button type="primary" onClick={this.print}>
                PRINT
              </Button>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}
