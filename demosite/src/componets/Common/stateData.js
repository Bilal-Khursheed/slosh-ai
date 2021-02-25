class GetAllDoc {
  async allstate() {
    var user;
    var lable = [];
    var data = [];
    await fetch(`/users/getStats`)
      .then((respone) => respone.json())
      .then((Result) => {
        var j = 0;
        var i;
        for (i in Result.data) {
          // console.log(Result.data[i].total);
          data[j] = Result.data[i].total;
          lable[j] = Result.data[i].city;
          //this.setState({ cities: Result.data[i].city });
          //this.setState({ countries: Result.data[i].country });
          //this.setState({ count: Result.data[i].total });
          j++;
        }
      });
    // console.log("here is the dta" + lable[1]);
    user = {
      labels: ["hj", "jsavh"],
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
          data: [9, 2],
        },
      ],
    };

    // console.log("here is all data");
    return [lable, data];
  }
}

export default new GetAllDoc();
