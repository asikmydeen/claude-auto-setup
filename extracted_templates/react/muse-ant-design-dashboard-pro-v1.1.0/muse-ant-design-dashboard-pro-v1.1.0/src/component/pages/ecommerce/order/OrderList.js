import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  Table,
  Card,
  Input,
  Avatar,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  CheckOutlined,
  UndoOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import team2 from "../../../images/team-2.jpg";
import team1 from "../../../images/team-1.jpg";
import { CSVLink } from "react-csv";
// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default class OrderList extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  render() {
    const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"],
    ];
    const menu = (
      <Menu
        items={[
          {
            key: "0",
            label: <a href="https://www.antgroup.com">status: Paid</a>,
          },
          {
            key: "1",
            label: <a href="https://www.aliyun.com">status: Refunded</a>,
          },
          {
            key: "3",
            label: <a href="https://www.aliyun.com">status: Canceled</a>,
          },
          {
            type: "divider",
          },
          {
            key: "4",
            label: (
              <a href="https://www.aliyun.com" className="text-danger">
                Remove filters
              </a>
            ),
          },
        ]}
      />
    );

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "DATE",
        dataIndex: "date",
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: "STATUS",
        dataIndex: "status",
        sorter: (a, b) => a.status - b.status,
      },
      {
        title: "CUSTOMER",
        dataIndex: "customer",
        sorter: (a, b) => a.customer - b.customer,
      },

      {
        title: "PRODUCT",
        dataIndex: "product",
        sorter: (a, b) => a.product - b.product,
      },
      {
        title: "REVENUE",
        dataIndex: "revenue",
        sorter: (a, b) => a.revenue - b.revenue,
      },
    ];

    const data = [
      {
        key: "1",
        id: "#10421",
        date: "1 Nov, 10:20 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar src={team2} alt="" size="small" className="mr-10" />
            <span style={{ verticalAlign: "bottom" }}>Orlando Imieto</span>
          </div>
        ),
        product: "Nike Sport V2",
        revenue: "$140.20",
      },

      {
        key: "2",
        id: "#10422",
        date: "1 Nov, 10:53 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar src={team1} alt="" size="small" className="mr-10" />
            <span style={{ verticalAlign: "bottom" }}>Alice Murinho</span>
          </div>
        ),
        product: "Valvet T-shirt",
        revenue: "$42.00",
      },

      {
        key: "3",
        id: "#10423",
        date: "1 Nov, 11:13 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-muted mr-5"
            >
              <UndoOutlined
                className="text-muted"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Refunded</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar alt="" size="small" className="mr-10 font-12">
              M
            </Avatar>
            <span style={{ verticalAlign: "bottom" }}>Leather Wallet</span>
          </div>
        ),
        product: "Valvet T-shirt",
        revenue: "$25.50",
      },

      {
        key: "4",
        id: "#10424",
        date: "1 Nov, 12:20 PM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar src={team1} alt="" size="small" className="mr-10" />
            <span style={{ verticalAlign: "bottom" }}>Andrew Nichel</span>
          </div>
        ),
        product: "Bracelet Onu-Lino",
        revenue: "$19.40",
      },

      {
        key: "5",
        id: "#10425",
        date: "1 Nov, 1:40 PM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-danger mr-5"
            >
              <CloseOutlined
                className="text-danger"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Canceled</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar src={team1} alt="" size="small" className="mr-10" />
            <span style={{ verticalAlign: "bottom" }}>Sebastian Koga</span>
          </div>
        ),
        product: "Phone Case Pink",
        revenue: "$44.90",
      },
      {
        key: "6",
        id: "#10426",
        date: "1 Nov, 2:19 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10">
              L
            </Avatar>
            <span style={{ verticalAlign: "bottom" }}>Laur Gilbert</span>
          </div>
        ),
        product: "Backpack Niver",
        revenue: "$112.50",
      },

      {
        key: "7",
        id: "#10427",
        date: "1 Nov, 3:42 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10">
              I
            </Avatar>
            <span style={{ verticalAlign: "bottom" }}>Iryna Innda</span>
          </div>
        ),
        product: "Adidas Vio",
        revenue: "$200.00",
      },

      {
        key: "8",
        id: "#10428",
        date: "2 Nov, 9:32 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10">
              A
            </Avatar>
            <span style={{ verticalAlign: "bottom" }}>Arrias Liunda</span>
          </div>
        ),
        product: "Airpods 2 Gen",
        revenue: "$350.00",
      },

      {
        key: "9",
        id: "#10429",
        date: "2 Nov, 10:14 AM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10" src={team2}></Avatar>
            <span style={{ verticalAlign: "bottom" }}>Rugna Ilpio</span>
          </div>
        ),
        product: "Bracelet Warret",
        revenue: "$15.00",
      },

      {
        key: "10",
        id: "#10430",
        date: "2 Nov, 12:56 PM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-muted mr-5"
            >
              <UndoOutlined
                className="text-muted"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Refunded</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10" src={team2}></Avatar>
            <span style={{ verticalAlign: "bottom" }}>Anna Landa</span>
          </div>
        ),
        product: "Watter Bottle India",
        revenue: "$25.00",
      },
      {
        key: "11",
        id: "#10431",
        date: "2 Nov, 3:12 PM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10">
              K
            </Avatar>
            <span style={{ verticalAlign: "bottom" }}>Karl Innas</span>
          </div>
        ),
        product: "Kitchen Gadgets",
        revenue: "$164.90",
      },
      {
        key: "12",
        id: "#10432",
        date: "2 Nov, 5:12 PM",
        status: (
          <>
            <Button
              shape="circle"
              size="small"
              className="btn-status border-success mr-5"
            >
              <CheckOutlined
                className="text-success"
                style={{ fontSize: "10px" }}
              />
            </Button>
            <span style={{ verticalAlign: "bottom" }}>Paid</span>
          </>
        ),
        customer: (
          <div className="table-avatar-info">
            <Avatar size="small" className="mr-10">
              O
            </Avatar>
            <span style={{ verticalAlign: "bottom" }}>Oana Kilas</span>
          </div>
        ),
        product: "Office Papers",
        revenue: "$23.90",
      },
    ];

    function onChange(pagination, filters, sorter, extra) {
      console.log("params", pagination, filters, sorter, extra);
    }

    return (
      <>
        <Row gutter={[24, 0]}>
          <Col span={12} className="mb-24">
            <Button type="primary">NEW ORDER</Button>
          </Col>
          <Col className="md-24 text-right" span={12}>
            <Dropdown menu={menu} trigger={["click"]}>
              <Button onClick={(e) => e.preventDefault()} className="mb-10">
                FILTERS <DownOutlined />
              </Button>
            </Dropdown>
            <Button className="ml-15  mb-24">
              <CSVLink data={csvData} filename={"muse-dashboard-csv.csv"}>
                EXPORT CSV
              </CSVLink>
            </Button>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <Card
              className="header-solid mb-24"
              bordered={false}
              extra={[
                <Input
                  placeholder="input text search"
                  size="small"
                  suffix={<SearchOutlined />}
                />,
              ]}
            >
              <Table
                tableLayout="auto"
                scroll={{ x: 500 }}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                rowSelection={{ ...rowSelection }}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
