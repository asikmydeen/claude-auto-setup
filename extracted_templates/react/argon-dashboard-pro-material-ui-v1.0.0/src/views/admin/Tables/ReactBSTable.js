import React from "react";
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
// @material-ui/icons components
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import componentStyles from "assets/theme/views/admin/react-bs-table.js";

const useStyles = makeStyles(componentStyles);

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

const ReactBSTables = () => {
  const classes = { ...useStyles() };
  const [alert, setAlert] = React.useState(null);
  const componentRef = React.useRef(null);
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>
    );
  };
  return (
    <>
      {alert}
      <SimpleHeader section="Data Grid Tables" subsection="Tables" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-4.5rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card elevation={0}>
              <CardHeader
                subheader={
                  <>
                    <Box
                      component={Typography}
                      variant="h2"
                      marginBottom="0!important"
                    >
                      <Box component="span">React Bootstrap Table 2</Box>
                    </Box>
                    <Box
                      component="p"
                      fontSize=".875rem"
                      marginBottom="0"
                      marginTop="0"
                      lineHeight="1.7"
                      fontWeight="300"
                    >
                      This is an exmaple of data table using the well known
                      react-bootstrap-table2 plugin. This is a minimal setup in
                      order to get started fast.
                    </Box>
                  </>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>

              <ToolkitProvider
                data={dataTable}
                keyField="name"
                columns={[
                  {
                    dataField: "name",
                    text: "Name",
                    sort: true,
                  },
                  {
                    dataField: "position",
                    text: "Position",
                    sort: true,
                  },
                  {
                    dataField: "office",
                    text: "Office",
                    sort: true,
                  },
                  {
                    dataField: "age",
                    text: "Age",
                    sort: true,
                  },
                  {
                    dataField: "start_date",
                    text: "Start date",
                    sort: true,
                  },
                  {
                    dataField: "salary",
                    text: "Salary",
                    sort: true,
                  },
                ]}
                search
              >
                {(props) => (
                  <div className="py-4 table-responsive">
                    <div
                      id="datatable-basic_filter"
                      className="dataTables_filter px-4 pb-1"
                    >
                      <label>
                        Search:
                        <SearchBar
                          className="form-control-sm"
                          placeholder=""
                          {...props.searchProps}
                        />
                      </label>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0}>
              <CardHeader
                subheader={
                  <>
                    <Box
                      component={Typography}
                      variant="h2"
                      marginBottom="0!important"
                    >
                      <Box component="span">Action buttons</Box>
                    </Box>
                    <Box
                      component="p"
                      fontSize=".875rem"
                      marginBottom="0"
                      marginTop="0"
                      lineHeight="1.7"
                      fontWeight="300"
                    >
                      This is an exmaple of data table using the well known
                      react-bootstrap-table2 plugin. This is a minimal setup in
                      order to get started fast.
                    </Box>
                  </>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>

              <ToolkitProvider
                data={dataTable}
                keyField="name"
                columns={[
                  {
                    dataField: "name",
                    text: "Name",
                    sort: true,
                  },
                  {
                    dataField: "position",
                    text: "Position",
                    sort: true,
                  },
                  {
                    dataField: "office",
                    text: "Office",
                    sort: true,
                  },
                  {
                    dataField: "age",
                    text: "Age",
                    sort: true,
                  },
                  {
                    dataField: "start_date",
                    text: "Start date",
                    sort: true,
                  },
                  {
                    dataField: "salary",
                    text: "Salary",
                    sort: true,
                  },
                ]}
                search
              >
                {(props) => (
                  <div className="py-4 table-responsive">
                    <Grid container className="pl-4">
                      <Grid item xs={12} sm={6}>
                        <Tooltip title="This will copy to your clipboard the visible rows of the table.">
                          <Button
                            variant="contained"
                            color="default"
                            size="small"
                            id="copy-tooltip"
                            className={classes.borderRight0}
                            onClick={() =>
                              copyToClipboardAsTable(
                                document.getElementById("react-bs-table")
                              )
                            }
                          >
                            <span>Copy</span>
                          </Button>
                        </Tooltip>
                        <Tooltip title="This will open a print page with the visible rows of the table.">
                          <ReactToPrint
                            trigger={() => (
                              <Button
                                variant="contained"
                                color="default"
                                size="small"
                                id="print-tooltip"
                                className={classes.borderLeft0}
                              >
                                Print
                              </Button>
                            )}
                            content={() => componentRef.current}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div
                          id="datatable-basic_filter"
                          className="dataTables_filter px-4 pb-1 float-right"
                        >
                          <label>
                            Search:
                            <SearchBar
                              className="form-control-sm"
                              placeholder=""
                              {...props.searchProps}
                            />
                          </label>
                        </div>
                      </Grid>
                    </Grid>

                    <BootstrapTable
                      ref={componentRef}
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ReactBSTables;

const dataTable = [
  {
    name: "Tiger Nixon",
    position: "System Architect",
    office: "Edinburgh",
    age: "61",
    start_date: "2011/04/25",
    salary: "$320,800",
  },
  {
    name: "Garrett Winters",
    position: "Accountant",
    office: "Tokyo",
    age: "63",
    start_date: "2011/07/25",
    salary: "$170,750",
  },
  {
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    age: "66",
    start_date: "2009/01/12",
    salary: "$86,000",
  },
  {
    name: "Cedric Kelly",
    position: "Senior Javascript Developer",
    office: "Edinburgh",
    age: "22",
    start_date: "2012/03/29",
    salary: "$433,060",
  },
  {
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: "33",
    start_date: "2008/11/28",
    salary: "$162,700",
  },
  {
    name: "Brielle Williamson",
    position: "Integration Specialist",
    office: "New York",
    age: "61",
    start_date: "2012/12/02",
    salary: "$372,000",
  },
  {
    name: "Herrod Chandler",
    position: "Sales Assistant",
    office: "San Francisco",
    age: "59",
    start_date: "2012/08/06",
    salary: "$137,500",
  },
  {
    name: "Rhona Davidson",
    position: "Integration Specialist",
    office: "Tokyo",
    age: "55",
    start_date: "2010/10/14",
    salary: "$327,900",
  },
  {
    name: "Colleen Hurst",
    position: "Javascript Developer",
    office: "San Francisco",
    age: "39",
    start_date: "2009/09/15",
    salary: "$205,500",
  },
  {
    name: "Sonya Frost",
    position: "Software Engineer",
    office: "Edinburgh",
    age: "23",
    start_date: "2008/12/13",
    salary: "$103,600",
  },
  {
    name: "Jena Gaines",
    position: "Office Manager",
    office: "London",
    age: "30",
    start_date: "2008/12/19",
    salary: "$90,560",
  },
  {
    name: "Quinn Flynn",
    position: "Support Lead",
    office: "Edinburgh",
    age: "22",
    start_date: "2013/03/03",
    salary: "$342,000",
  },
  {
    name: "Charde Marshall",
    position: "Regional Director",
    office: "San Francisco",
    age: "36",
    start_date: "2008/10/16",
    salary: "$470,600",
  },
  {
    name: "Haley Kennedy",
    position: "Senior Marketing Designer",
    office: "London",
    age: "43",
    start_date: "2012/12/18",
    salary: "$313,500",
  },
  {
    name: "Tatyana Fitzpatrick",
    position: "Regional Director",
    office: "London",
    age: "19",
    start_date: "2010/03/17",
    salary: "$385,750",
  },
  {
    name: "Michael Silva",
    position: "Marketing Designer",
    office: "London",
    age: "66",
    start_date: "2012/11/27",
    salary: "$198,500",
  },
  {
    name: "Paul Byrd",
    position: "Chief Financial Officer (CFO)",
    office: "New York",
    age: "64",
    start_date: "2010/06/09",
    salary: "$725,000",
  },
  {
    name: "Gloria Little",
    position: "Systems Administrator",
    office: "New York",
    age: "59",
    start_date: "2009/04/10",
    salary: "$237,500",
  },
  {
    name: "Bradley Greer",
    position: "Software Engineer",
    office: "London",
    age: "41",
    start_date: "2012/10/13",
    salary: "$132,000",
  },
  {
    name: "Dai Rios",
    position: "Personnel Lead",
    office: "Edinburgh",
    age: "35",
    start_date: "2012/09/26",
    salary: "$217,500",
  },
  {
    name: "Jenette Caldwell",
    position: "Development Lead",
    office: "New York",
    age: "30",
    start_date: "2011/09/03",
    salary: "$345,000",
  },
  {
    name: "Yuri Berry",
    position: "Chief Marketing Officer (CMO)",
    office: "New York",
    age: "40",
    start_date: "2009/06/25",
    salary: "$675,000",
  },
  {
    name: "Caesar Vance",
    position: "Pre-Sales Support",
    office: "New York",
    age: "21",
    start_date: "2011/12/12",
    salary: "$106,450",
  },
  {
    name: "Doris Wilder",
    position: "Sales Assistant",
    office: "Sidney",
    age: "23",
    start_date: "2010/09/20",
    salary: "$85,600",
  },
  {
    name: "Angelica Ramos",
    position: "Chief Executive Officer (CEO)",
    office: "London",
    age: "47",
    start_date: "2009/10/09",
    salary: "$1,200,000",
  },
  {
    name: "Gavin Joyce",
    position: "Developer",
    office: "Edinburgh",
    age: "42",
    start_date: "2010/12/22",
    salary: "$92,575",
  },
  {
    name: "Jennifer Chang",
    position: "Regional Director",
    office: "Singapore",
    age: "28",
    start_date: "2010/11/14",
    salary: "$357,650",
  },
  {
    name: "Brenden Wagner",
    position: "Software Engineer",
    office: "San Francisco",
    age: "28",
    start_date: "2011/06/07",
    salary: "$206,850",
  },
  {
    name: "Fiona Green",
    position: "Chief Operating Officer (COO)",
    office: "San Francisco",
    age: "48",
    start_date: "2010/03/11",
    salary: "$850,000",
  },
  {
    name: "Shou Itou",
    position: "Regional Marketing",
    office: "Tokyo",
    age: "20",
    start_date: "2011/08/14",
    salary: "$163,000",
  },
  {
    name: "Michelle House",
    position: "Integration Specialist",
    office: "Sidney",
    age: "37",
    start_date: "2011/06/02",
    salary: "$95,400",
  },
  {
    name: "Suki Burks",
    position: "Developer",
    office: "London",
    age: "53",
    start_date: "2009/10/22",
    salary: "$114,500",
  },
  {
    name: "Prescott Bartlett",
    position: "Technical Author",
    office: "London",
    age: "27",
    start_date: "2011/05/07",
    salary: "$145,000",
  },
  {
    name: "Gavin Cortez",
    position: "Team Leader",
    office: "San Francisco",
    age: "22",
    start_date: "2008/10/26",
    salary: "$235,500",
  },
  {
    name: "Martena Mccray",
    position: "Post-Sales support",
    office: "Edinburgh",
    age: "46",
    start_date: "2011/03/09",
    salary: "$324,050",
  },
  {
    name: "Unity Butler",
    position: "Marketing Designer",
    office: "San Francisco",
    age: "47",
    start_date: "2009/12/09",
    salary: "$85,675",
  },
  {
    name: "Howard Hatfield",
    position: "Office Manager",
    office: "San Francisco",
    age: "51",
    start_date: "2008/12/16",
    salary: "$164,500",
  },
  {
    name: "Hope Fuentes",
    position: "Secretary",
    office: "San Francisco",
    age: "41",
    start_date: "2010/02/12",
    salary: "$109,850",
  },
  {
    name: "Vivian Harrell",
    position: "Financial Controller",
    office: "San Francisco",
    age: "62",
    start_date: "2009/02/14",
    salary: "$452,500",
  },
  {
    name: "Timothy Mooney",
    position: "Office Manager",
    office: "London",
    age: "37",
    start_date: "2008/12/11",
    salary: "$136,200",
  },
  {
    name: "Jackson Bradshaw",
    position: "Director",
    office: "New York",
    age: "65",
    start_date: "2008/09/26",
    salary: "$645,750",
  },
  {
    name: "Olivia Liang",
    position: "Support Engineer",
    office: "Singapore",
    age: "64",
    start_date: "2011/02/03",
    salary: "$234,500",
  },
  {
    name: "Bruno Nash",
    position: "Software Engineer",
    office: "London",
    age: "38",
    start_date: "2011/05/03",
    salary: "$163,500",
  },
  {
    name: "Sakura Yamamoto",
    position: "Support Engineer",
    office: "Tokyo",
    age: "37",
    start_date: "2009/08/19",
    salary: "$139,575",
  },
  {
    name: "Thor Walton",
    position: "Developer",
    office: "New York",
    age: "61",
    start_date: "2013/08/11",
    salary: "$98,540",
  },
  {
    name: "Finn Camacho",
    position: "Support Engineer",
    office: "San Francisco",
    age: "47",
    start_date: "2009/07/07",
    salary: "$87,500",
  },
  {
    name: "Serge Baldwin",
    position: "Data Coordinator",
    office: "Singapore",
    age: "64",
    start_date: "2012/04/09",
    salary: "$138,575",
  },
  {
    name: "Zenaida Frank",
    position: "Software Engineer",
    office: "New York",
    age: "63",
    start_date: "2010/01/04",
    salary: "$125,250",
  },
  {
    name: "Zorita Serrano",
    position: "Software Engineer",
    office: "San Francisco",
    age: "56",
    start_date: "2012/06/01",
    salary: "$115,000",
  },
  {
    name: "Jennifer Acosta",
    position: "Junior Javascript Developer",
    office: "Edinburgh",
    age: "43",
    start_date: "2013/02/01",
    salary: "$75,650",
  },
  {
    name: "Cara Stevens",
    position: "Sales Assistant",
    office: "New York",
    age: "46",
    start_date: "2011/12/06",
    salary: "$145,600",
  },
  {
    name: "Hermione Butler",
    position: "Regional Director",
    office: "London",
    age: "47",
    start_date: "2011/03/21",
    salary: "$356,250",
  },
  {
    name: "Lael Greer",
    position: "Systems Administrator",
    office: "London",
    age: "21",
    start_date: "2009/02/27",
    salary: "$103,500",
  },
  {
    name: "Jonas Alexander",
    position: "Developer",
    office: "San Francisco",
    age: "30",
    start_date: "2010/07/14",
    salary: "$86,500",
  },
  {
    name: "Shad Decker",
    position: "Regional Director",
    office: "Edinburgh",
    age: "51",
    start_date: "2008/11/13",
    salary: "$183,000",
  },
  {
    name: "Michael Bruce",
    position: "Javascript Developer",
    office: "Singapore",
    age: "29",
    start_date: "2011/06/27",
    salary: "$183,000",
  },
  {
    name: "Donna Snider",
    position: "Customer Support",
    office: "New York",
    age: "27",
    start_date: "2011/01/25",
    salary: "$112,000",
  },
];
