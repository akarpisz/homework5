$(document).ready(function () {
  //VARIABLES
  var currentDayEl = $("#currentDay");
  //using the moment.js library, variable is set to the current time and date
  var rightNow = moment();

  var row;
  var cell1;
  var cell2;
  var cell3;
  var textbox;
  var button;

  //updates the current day element every second, with the current time and date
  setInterval(function () {
    var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    currentDayEl.text(now);
  }, 1000);

  //defining the function that will color the cells based on the current time
  function colorCells(modSM) {
    if (modSM.format("h") === rightNow.format("h")) {
      $(cell2).attr("style", "background-color:red");
    } else if (modSM.isBefore(rightNow)) {
      $(cell2).attr("style", "background-color:gray");
    } else if (modSM.isAfter(rightNow)) {
      $(cell2).attr("style", "background-color:green");
    }
  }

  //function creating the table
  function renderTB() {
    //selecting the table element based on its class
    var table = $(".blocks");
    //moment.js "moment", modified to the start time of the planner
    var modSM = moment().hours(7).minutes(0).seconds(0).milliseconds(0);
    table.children().empty();
    for (var i = 0;i < 12; i++) {
      //new elements to be created in each row
      row = $("<tr>");
      cell1 = $("<td>");
      cell2 = $("<td>");
      cell3 = $("<td>");
      textbox = $("<textarea/>");
      button = $("<button>");

      var cellId = i;
      //extracting the modified moment's current hour and am/pm indicatino
      var currH = modSM.format("h");
      var currA = modSM.format("a");
      //concatinating the two variables above so they can be added to cell1 of the table
      var time = currH + currA;
      //variable defining the parsed data ( previously entered events, if any) to be rendered in the text area within cell2.
      var data = JSON.parse(localStorage.getItem(cellId));

      //this colors the blocks based on whether they are before or after the current hour,  or within the current hour.
      colorCells(modSM);
      //adds the events from local storage to the textbox, if any entries exist for that timeblock's id
      textbox.text(data);
      //appendss the modified time to cell1
      cell1.append(time);
      //appendss the text box element to cell2
      cell2.append(textbox);

      //assigns cell2 its id
      $(cell2).attr("id", i);

      //adds "SAVE" to the button face
      button.text("SAVE");
      //append the button to cell3
      cell3.append(button);
      //append all 3 cells to the row, which are appended to the table
      table.append(row.append(cell1, cell2, cell3));
      //increment the modified start time
      modSM.add("1", "h");
    }
  }
  //call render table function
  renderTB();

  //click handler for save buttons
  $("button").on("click", function (event) {
    //variable storing which button was clicked
    var clicked = event.target;
    //variable storing the id from the button that was clicked
    var id = $(clicked).parent().prev().attr("id");
    //traversing the table, to the previous cell (td), and storing the stringified value of its child element, the text area element.
    var prevBoxText = JSON.stringify(
      $(clicked).parent().prev().children().val()
    );
    //based on the buttons id, the contents of the neighboring textbox are stored in the browser's local storage
    localStorage.setItem(id, prevBoxText);
    //the table is re-rendered with the new stored values included
    renderTB();
  });
});
