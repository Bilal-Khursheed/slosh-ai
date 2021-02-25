import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class CityStats extends Component {
  state = {
    city1: "",
    city2: "",
    city3: "",
    city4: "",
    city5: "",
    countries: "",
    count1: null,
    count2: null,
    count3: null,
    count4: null,
    count5: null,
  };

  async componentWillMount() {
    await fetch(`/users/getStats`)
      .then((respone) => respone.json())
      .then((Result) => {
        var y = 1;
        for (var i in Result.data) {
          if (y == 1) {
            this.setState({ city1: Result.data[i].city });
            this.setState({ count1: Result.data[i].total });
          } else if (y == 2) {
            this.setState({ city2: Result.data[i].city });
            this.setState({ count2: Result.data[i].total });
          } else if (y == 3) {
            this.setState({ city3: Result.data[i].city });
            this.setState({ count3: Result.data[i].total });
          } else if (y == 4) {
            this.setState({ city4: Result.data[i].city });
            this.setState({ count4: Result.data[i].total });
          } else if (y == 5) {
            this.setState({ city5: Result.data[i].city });
            this.setState({ count5: Result.data[i].total });
          }
          y++;
          // this.setState({ countries: Result.data[i].country });
          // this.setState({ count: Result.data[i].total });
        }
      });
    // console.log("count " + this.state.city2);
  }
  render() {
    const state = {
      labels: [
        this.state.city1,
        this.state.city2,
        this.state.city3,
        this.state.city4,
        this.state.city5,
      ],
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
            "#080800",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
            "#008800",
          ],
          data: [
            this.state.count1,
            this.state.count2,
            this.state.count3,
            this.state.count4,
            this.state.count5,
          ],
        },
      ],
    };
    return (
      <div>
        <Doughnut
          data={state}
          options={{
            title: {
              display: true,
              text: "Number Of cases in each city",
              fontSize: 18,
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
export default CityStats;
