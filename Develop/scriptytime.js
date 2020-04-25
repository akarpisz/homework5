$(document).ready(function () {
  //VARIABLES
  var currentDayEl = $("#currentDay");
  
  var rightNow = moment();
  var hour = moment().format("h");
  var pHour = parseInt(hour);
// console.log(rightNow);
// // -objects that contain current date data
//   var startM = (moment().hours(7).minutes(0).seconds(0).milliseconds(0));
// var endM = (moment().hours(19).minutes(0).seconds(0).milliseconds(0))
// console.log((startM.add("3","h")).format("h a"));
// console.log( JSON.stringify(startM.format("h a"))); // added to the cell1 table el's
// console.log(endM);
// //use .toObject() to compare entries
// //use .add() to increment the moment while generating the table. probably get rid of endM


// var startH =  (Object.entries(startM));
// var endH = Object.entries(endM);

// console.log(startM.isBefore(endH));
// console.log(startM.isAfter(endH));







  /*

-local storage variables
*/

  //renders the current time and date on the currentDay <p> tag
  setInterval(function () {
    var obj = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    currentDayEl.text(obj);
  }, 1000);

  //FUNCTIONs
  /*
-one to collect current time
-render timeblock times based on current time


*/

    
    
  function renderTB() {
    var table = document.querySelector(".blocks");
    var i = 0;

    var displayTime = 7;
    
    
    while (i < 13) {
      
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);;
      var cellId = "tb"+i;

      if (displayTime > 12) {
        displayTime = displayTime - 12
      };

      //colorCells();

      var text = document.createTextNode((displayTime));
      cell1.append(text);

      cell2.innerHTML = "<textarea id='" + cellId + "' class='event' contentEditable></textarea>"
      
      

      var button = document.createElement("button");
      button.innerHTML = "<button id='" + cellId + "'>SAVE</button>";
      cell3.append(button);
      button.addEventListener("click", function(event){
        var e = event.target;
        console.log(e.id);
        
      });
      displayTime++;
      i++;
    }
  }


  //function for color of cells based on time
  function colorCells() {
  };

  //in event handler

  
  renderTB();

//console.log(JSON.parse(moment().toObject().hours));


});
