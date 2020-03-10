function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var timediv = document.getElementById("time");
var period = document.getElementById("period");
var table = document.getElementById("table");
var currentperiod;

function updateTime(){
  var today = new Date();
  var ampm;
  if (today.getHours() > 11) {  ampm = " PM"; }
  else { ampm = " AM" }
  var hour = today.getHours();
  if (hour > 12) hour %= 12;
  if (hour == 0) hour = 12;
  var time = hour + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds()) + ampm;
  timediv.innerHTML = time;
}

var periods = [
  [800,841,"black"],
  [845,926,"black"],
  [931,1015,"black"],
  [1020,1101,"black"],
  [1106,1147,"black"],
  [1152,1233,"black"],
  [1238,1319,"black"],
  [1324,1405,"black"],
  [1409,1450,"black"],
  [1454,1535,"black"]
]

function updatePeriod(){
  for (item in periods){
    item[2] = "black";
  }
  var today = new Date();
  currentperiod = null;
  var timestring = today.getHours() + "" + today.getMinutes();
  var timenum = parseInt(timestring);
  var temp = 0;
  console.log(timestring)
  while (currentperiod == null){
    if (timenum < periods[0][0] || timenum > periods[9][1]) { currentperiod = -1; }
    else if (timenum >= periods[temp][0] && timenum <= periods[temp][1]) {
      currentperiod = temp;
      periods[temp][2] = "red";
    }
    else if (timenum >= periods[temp][1] && timenum <= periods[temp + 1][0]) {
      periods[temp][2] = "red";
      periods[temp + 1][2] = "red";
      currentperiod = temp + 0.5;
    }
    temp += 1;
  }
  currentperiod += 1;
  if (currentperiod == 0) { period.innerHTML = "School Closed"; }
  else if (Number.isInteger(currentperiod)) { period.innerHTML = "Period " + currentperiod; }
  else { period.innerHTML = "Between " + Math.floor(currentperiod) + " and " + (Math.floor(currentperiod) + 1)}
}

function generateTable() {
  var temp = 0;
  for (item in periods) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Period " + (temp + 1);
    cell2.innerHTML = formatTime(periods[temp][0]) + " - " + formatTime(periods[temp][1]);
    cell1.style.color = periods[temp][2];
    cell2.style.color = periods[temp][2];
    temp += 1;
  }
}

function formatTime(time){
  time = time.toString();
  var minutes = time.slice(-2);
  var hours = time.slice(0,-2);
  var ampm;
  if (hours > 11) {  ampm = "PM"; }
  if (hours > 12) hours %= 12;
  else { ampm = "AM"; }
  return hours + ":" + minutes + ampm;
}

setInterval(updateTime, 1000);
setInterval(updatePeriod, 10000);
