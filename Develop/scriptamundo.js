$(document).ready(function () {
  //VARIABLES
  var currentDayEl = $("#currentDay");

  var rightNow = moment();
  var hour = rightNow.format("h a");

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
    var table = $(".blocks");
    var i = 0;

    var modSM = moment().hours(7).minutes(0).seconds(0).milliseconds(0);

    while (i < 13) {
      console.log(modSM.format("h a"));
      var row = $("<tr>");
      var cell1 = $("<td>");
      var cell2 = $("<td>");
      var textbox = $("<textarea/>");
      var cell3 = $("<td>");
      var cellId = i;

      var currH = modSM.format("h");
      var currA = modSM.format("a");
      var currHA = currH + currA;
      var text = currHA;
    //   var data = JSON.stringify(localStorage.getItem(cellId));
    var data = (localStorage.getItem(cellId));


      if (modSM.format("h") === rightNow.format("h")) {
        $(cell2).attr("style", "background-color:red");
      } else if (modSM.isBefore(rightNow)) {
        $(cell2).attr("style", "background-color:gray");
      } else if (modSM.isAfter(rightNow)) {
        $(cell2).attr("style", "background-color:green");
      }

      

      textbox.text(data);
      cell1.append(text);
      cell2.append(textbox);

      $(cell2).attr("id", i);
      $(cell2).attr("class", "event");

      //   cell2.html(
      //     "<textarea data-index='" +
      //       cellId +
      //       "' class='event' contentEditable></textarea>"
      //   );

      //   HEY! OVER HERE! YOU NEED TO CREATE THE TEXT AREA ELEMENT SEPARATELY WITH THE ID INDTEAD OF THE td, then appending the text area to the td, obviously "get" daata from local storage before appending to the table.
      // that, or try using the "this item with the id".children() method to access it.
      //HAPPY CODING!

      var button = $("<button>");
      $(button).attr("id", i);
      cell3.append(button);
      button.text("SAVE");
      table.append(row.append(cell1, cell2, cell3));

      modSM.add("1", "h");
      i++;
    }
  }

  //function for color of cells based on time
  function colorCells() {}

  //in event handler

  renderTB();
  $("button").on("click", function (event) {
    var clicked = event.target;
    var id = $(clicked).parent().prev().attr("id");
    console.log(id);

    var prevBoxText = $(clicked).parent().prev().children().val();

    localStorage.setItem(id, prevBoxText);
    renderTB();
  });
});
