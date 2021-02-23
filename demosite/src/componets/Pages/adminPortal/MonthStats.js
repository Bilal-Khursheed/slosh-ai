import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

const style1 = {
  backgroundColor: "rgba(0,0,0,0)",
};
class MonthStats extends Component {
  render() {
    const state = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Number Of Cases",
          backgroundColor: "rgba(242, 217, 132, 1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56, 25, 35, 45, 90, 80, 44, 60],
        },
      ],
    };
    return (
      <div>
        <Bar
          Style={style1}
          data={state}
          options={{
            title: {
              display: true,
              text: "Number of Cases each month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
export default MonthStats;
