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
    text: "Browser market shares. January, 2018"
  },
  subtitle: {
    text:
      'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: "{point.name}: {point.y:.1f}%"
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

//   series: [
//     {
//       name: "Browsers",
//       colorByPoint: true,
//       data: [
//         {
//           name: "Chrome",
//           y: 62.74,
//           drilldown: "Chrome"
//         },
//         {
//           name: "Firefox",
//           y: 10.57,
//           drilldown: "Firefox"
//         }
//       ]
//     }
//   ],
//   drilldown: {
//     series: [
//       {
//         name: "Chromes",
//         id: "Chrome",
//         data: [["v65.0", 0.1], ["v64.0", 1.3]]
//       },
//       {
//         name: "Firefox",
//         id: "Firefox",
//         data: [
//           ["v58.0", 1.02],
//           ["v57.0", 7.36],
//           ["v56.0", 0.35],
//           ["v55.0", 0.11],
//           ["v54.0", 0.1],
//           ["v52.0", 0.95],
//           ["v51.0", 0.15],
//           ["v50.0", 0.1],
//           ["v48.0", 0.31],
//           ["v47.0", 0.12]
//         ]
//       },
//       {
//         name: "Internet Explorer",
//         id: "Internet Explorer",
//         data: [["v11.0", 6.2], ["v10.0", 0.29], ["v9.0", 0.27], ["v8.0", 0.47]]
//       },
//       {
//         name: "Safari",
//         id: "Safari",
//         data: [
//           ["v11.0", 3.39],
//           ["v10.1", 0.96],
//           ["v10.0", 0.36],
//           ["v9.1", 0.54],
//           ["v9.0", 0.13],
//           ["v5.1", 0.2]
//         ]
//       },
//       {
//         name: "Edge",
//         id: "Edge",
//         data: [["v16", 2.6], ["v15", 0.92], ["v14", 0.4], ["v13", 0.1]]
//       },
//       {
//         name: "Opera",
//         id: "Opera",
//         data: [["v50.0", 0.96], ["v49.0", 0.82], ["v12.1", 0.14]]
//       }
//     ]
//   }
// };

const useStyles = makeStyles(styles);

export default function Metrics() {
  const classes = useStyles();
  // const spendingByCategory = getSpendingByCategory(data.expenses);
  // const categoryNames = Array.from(spendingByCategory.keys());

  // const categoryData = [];

  // categoryNames.forEach(categoryId => {
  //   categoryData.push({
  //     name: categoryId,
  //     y: spendingByCategory.get(categoryId)
  //   });
  // });

  // options.series = [
  //   {
  //     data: categoryData
  //   }
  // ];

  // console.log(options)

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
