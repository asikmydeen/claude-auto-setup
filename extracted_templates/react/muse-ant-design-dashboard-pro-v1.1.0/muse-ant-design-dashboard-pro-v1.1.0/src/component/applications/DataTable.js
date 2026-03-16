/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import { Row, Col, Table, Card, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "10",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "20",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "30",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "40",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "11",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "21",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "31",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "41",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

export default class extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    totalPage: 5,
    totalPage1: 5,
    data1: [
      {
        key: "1",
        name: "Yuri Berry",
        position: "Chief Marketing Officer (CMO)",
        office: "New York",
        age: 54,
        start: "2009/06/25",
        salary: "$675,000",
      },
      {
        key: "2",
        name: "Suki Burks ",
        position: "Developer",
        office: "London ",
        age: 32,
        start: 70,
        salary: 50,
      },
      {
        key: "3",
        name: "Joe Black",
        position: "hief Marketing Officer (CMO)",
        office: "London",
        age: 30,
        start: "2009/10/22",
        salary: "$114,500",
      },
      {
        key: "4",
        name: "Bruno Nash",
        position: "Software Engineer",
        office: "Landon",
        age: 30,
        start: "2011/05/03",
        salary: "$163,500",
      },
      {
        key: "5",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "6",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "7",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "8",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "9",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "10",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "11",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "12",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "13",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "14",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "15",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "16",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "17",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "18",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "19",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
    ],
    filteredData: [
      {
        key: "1",
        name: "Yuri Berry",
        position: "Chief Marketing Officer (CMO)",
        office: "New York",
        age: 54,
        start: "2009/06/25",
        salary: "$675,000",
      },
      {
        key: "2",
        name: "Suki Burks ",
        position: "Developer",
        office: "London ",
        age: 32,
        start: 70,
        salary: 50,
      },
      {
        key: "3",
        name: "Joe Black",
        position: "hief Marketing Officer (CMO)",
        office: "London",
        age: 30,
        start: "2009/10/22",
        salary: "$114,500",
      },
      {
        key: "4",
        name: "Bruno Nash",
        position: "Software Engineer",
        office: "Landon",
        age: 30,
        start: "2011/05/03",
        salary: "$163,500",
      },
      {
        key: "5",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "6",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "7",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "8",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "9",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "10",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "11",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },

      {
        key: "12",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "13",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "14",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "15",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "16",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "17",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "18",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
      {
        key: "19",
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "Landon",
        age: 22,
        start: "2009/02/27",
        salary: "$103,500",
      },
    ],
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      totalPage: pagination,
    });
  };

  handleFilter = (e) => {
    let newFiltered = [...this.state.data1];
    newFiltered = newFiltered.filter(
      (data) =>
        data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.position.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.office.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.age.toString().includes(e.target.value.toLowerCase()) ||
        data.start.toString().includes(e.target.value.toLowerCase()) ||
        data.salary.toString().includes(e.target.value.toLowerCase())
    );
    this.setState({ filteredData: newFiltered });
  };

  handleTotalPageChange = (val) => {
    this.setState({ totalPage: val });
  };
  handleTotalPageChange1 = (val) => {
    this.setState({ totalPage1: val });
  };
  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",

        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,

        ellipsis: true,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",

        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,

        ellipsis: true,
      },
    ];

    //  search

    const columns1 = [
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,

        ellipsis: true,
      },
      {
        title: "POSITION",
        dataIndex: "position",

        sorter: (a, b) => a.position.length - b.position.length,
        sortOrder: sortedInfo.columnKey === "position" && sortedInfo.order,

        ellipsis: true,
      },
      {
        title: "OFFICE",
        dataIndex: "office",
        sorter: (a, b) => a.office.length - b.office.length,
        sortOrder: sortedInfo.columnKey === "office" && sortedInfo.order,

        ellipsis: true,
      },
      {
        title: "AGE",
        dataIndex: "age",
        sorter: (a, b) => a.age.length - b.age.length,
        sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,

        ellipsis: true,
      },
      {
        title: "START DATE",
        dataIndex: "start",
        sorter: (a, b) => a.start.length - b.start.length,
        sortOrder: sortedInfo.columnKey === "start" && sortedInfo.order,

        ellipsis: true,
      },
      {
        title: "SALARY",
        dataIndex: "salary",
        sorter: (a, b) => a.salary.length - b.salary.length,
        sortOrder: sortedInfo.columnKey === "salary" && sortedInfo.order,

        ellipsis: true,
      },
    ];

    return (
      <>
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <Card
              bodyStyle={{ padding: "16px 0px 0px" }}
              bordered={false}
              className="header-solid mb-24"
              title={[<h5 className="font-semibold"> Datatable Simple</h5>]}
            >
              <div className="px-25">
                <Select
                  defaultValue="5"
                  onChange={this.handleTotalPageChange}
                  size="large"
                  style={{ width: "70px" }}
                >
                  <Option value="5">5</Option>
                  <Option value="10">10</Option>
                  <Option value="15">15</Option>
                  <Option value="20">20</Option>
                  <Option value="25">25</Option>
                </Select>

                <label className="ml-10">entries per page</label>
              </div>
              <div className="ant-table-body">
                <Table
                  className="mt-20"
                  columns={columns}
                  dataSource={data}
                  tableLayout="auto"
                  onChange={onchange}
                  scroll={{ x: 500 }}
                  pagination={{
                    pageSize: this.state.totalPage,
                  }}
                />
              </div>
            </Card>

            <Card
              bodyStyle={{ padding: "16px 0px 0px" }}
              bordered={false}
              className="header-solid mb-24"
              title={[<h5 className="font-semibold"> Datatable Search</h5>]}
            >
              <div className="px-25">
                <Row gutter={[24, 0]} className="mb-24">
                  <Col span={24} lg={12}>
                    <Select
                      defaultValue="5"
                      onChange={this.handleTotalPageChange1}
                      size="large"
                    >
                      <Option value="5">5</Option>
                      <Option value="10">10</Option>
                      <Option value="15">15</Option>
                      <Option value="20">20</Option>
                      <Option value="25">25</Option>
                    </Select>

                    <label className="ml-10">entries per page</label>
                  </Col>
                  <Col span={24} lg={12} className="text-right">
                    <Input
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                      placeholder="input search text"
                      size="small"
                      suffix={suffix}
                      onChange={this.handleFilter}
                    />
                  </Col>
                </Row>
              </div>
              <Table
                className="mt-20"
                columns={columns1}
                dataSource={this.state.filteredData}
                tableLayout="auto"
                onChange={onchange}
                scroll={{ x: 500 }}
                pagination={{
                  pageSize: this.state.totalPage1,
                }}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
