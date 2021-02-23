class GetUserData {
  adminData() {
    var data1 = sessionStorage.getItem("admin");
    var data2 = JSON.parse(data1);
    var name = "";
    //var detials=JSON.parse( data2.data)
    var i = "";
    for (i in data2.data) {
      name = data2.data[i].F_Name;
      name += " " + data2.data[i].L_Name;
      console.log(name);
    }
    return name;
  }
  doctorData() {
    var data1 = sessionStorage.getItem("doctor");
    var data2 = JSON.parse(data1);
    var name = "";
    //var detials=JSON.parse( data2.data)
    var i = "";
    for (i in data2.data) {
      name = data2.data[i].F_Name;
      name += " " + data2.data[i].L_Name;
      console.log(name);
    }
    return name;
  }
  patientData() {
    var data1 = sessionStorage.getItem("patient");
    var data2 = JSON.parse(data1);
    var name = "";
    //var detials=JSON.parse( data2.data)
    var i = "";
    for (i in data2.data) {
      name = data2.data[i].F_Name;
      name += " " + data2.data[i].L_Name;
      console.log(name);
    }
    return name;
  }
}

export default new GetUserData();
