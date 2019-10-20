import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  // const transaction = ["a", "desc", "2019-10-15T15:10:06Z", 23];
  const transactions = [];
  const fetchedTransactions = JSON.parse(
    window.localStorage.getItem("transactions")
  );
  // console.log("window", window);
  fetchedTransactions.map(transaction => {
    transactions.push({
      categoryName: transaction.category.name,
      description: transaction.description,
      date: new Date(transaction.date).toDateString(),
      cost: transaction.cost
    });
  });
  console.log("fetchedTransactions", transactions);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Expenses</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title=""
              columns={[
                { title: "Category", field: "categoryName" },
                { title: "Description", field: "description" },
                { title: "Date", field: "date" },
                { title: "Cost", field: "cost", type: "numeric" }
              ]}
              data={transactions}
              options={{
                search: true
              }}
            />
            )
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
