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

import { bugs, website, server } from "variables/general.js";

import Highcharts from "highcharts";
import drilldown from "highcharts-drilldown";
import HighchartsReact from "highcharts-react-official";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import {
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";
import { data } from "../../test";

drilldown(Highcharts);

const options = {
  chart: {
    type: "pie"
  },
  title: {
    text: "Spending by Category"
  }
};

const useStyles = makeStyles(styles);

export default function Metrics() {
  const classes = useStyles();
  const spendingByCategory = getSpendingByCategory(data.expenses);
  const categoryNames = Array.from(spendingByCategory.keys());

  const categoryData = [];
  const drilldownSeriesData = [];

  categoryNames.forEach(categoryName => {
    categoryData.push({
      name: categoryName,
      drilldown: categoryName,
      y: spendingByCategory.get(categoryName)
    });

    const expensesForCategory = data.expenses.filter(
      expense => expense.category.name === categoryName
    );

    console.log("expensesForCategory - ", categoryName, expensesForCategory);
    const expensesForCategoryByMonth = {};

    expensesForCategory.forEach(expense => {
      const month = new Date(expense.date).getMonth();
      if (!expensesForCategoryByMonth[month]) {
        expensesForCategoryByMonth[month] = +expense.cost;
      } else {
        expensesForCategoryByMonth[month] += +expense.cost;
      }
    });

    console.log("expensesForCategoryByMonth - ", expensesForCategoryByMonth);

    const drilldownData = [];
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(num => {
      drilldownData.push([num, expensesForCategoryByMonth[num] || 0]);
    });

    drilldownSeriesData.push({
      name: categoryName,
      id: categoryName,
      data: drilldownData
    });
  });

  options.series = [
    {
      data: categoryData
    }
  ];

  options.drilldown = {
    series: drilldownSeriesData
  };

  console.log(options);

  // options.drilldown = {
  //   series: [
  //     {
  //       name: "General",
  //       id: "General",
  //       data: [["v1.0", 10], ["v2.0", 20]]
  //     }
  //   ]
  // };

  console.log("Options: ", options);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

function getSpendingByCategory(expenses) {
  const spendingByCategoryMap = new Map();
  expenses.forEach(expense => {
    const cost = expense.cost;
    const categoryName = expense.category.name;
    if (!spendingByCategoryMap.get(categoryName)) {
      spendingByCategoryMap.set(categoryName, +cost);
    } else {
      spendingByCategoryMap.set(
        categoryName,
        +spendingByCategoryMap.get(categoryName) + +cost
      );
    }
  });
  return spendingByCategoryMap;
}
