import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Metrics from "../Metrics/Metrics.jsx";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [iframeDisplay, setIFrameDisplay] = useState("none");
  const src =
    "https://www.splitwise.com/oauth/authorize?redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&client_id=Gx5UtCbfDfmmMAkWA9V4DKdXt1OMa8ZozjMTRTVW";

  const handleImportFromSplitwiseClick = () => {
    window.location.href = src;
    // setIFrameDisplay("initial");
  };

  const handleManuallyEnterClick = () => {
    window.location.href = "/admin/add";
  };

  if (transactions.length === 0) {
    fetch("https://secure.splitwise.com/api/v3.0/get_expenses?limit=0")
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          console.log("Error:", data.error);
        } else {
          console.log("Expenses:", data);
          window.localStorage.setItem(
            "transactions",
            JSON.stringify(data.expenses)
          );
          setTransactions(data);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      {transactions.length === 0 ? (
        <div className={classes.dashboardContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleImportFromSplitwiseClick}
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Import from Splitwise
          </Button>
          <p>OR</p>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleManuallyEnterClick}
            startIcon={<DeleteIcon />}
          >
            Enter manually
          </Button>
          <iframe
            style={{ display: iframeDisplay }}
            src={src}
            width="1000"
            height="500"
          ></iframe>
        </div>
      ) : (
        <Metrics inpData={transactions} />
      )}
    </div>
  );
}
