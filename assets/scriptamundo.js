$(document).ready(function () {
  //VARIABLES 
  var currentDayEl = $("#currentDay");
  //using the moment.js library, variable is set to the current time and date
  var rightNow = moment();

  //updates the current day element every second, with the current time and date
  setInterval(function () {
    var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    currentDayEl.text(now);
  }, 1000);

  //function creating the table
  function renderTB() {
    //selecting the table element based on its class
    var table = $(".blocks");
    //while loop incrementor
    var i = 0;
    //moment.js "moment", modified to the start time of the planner
    var modSM = moment().hours(7).minutes(0).seconds(0).milliseconds(0);

    while (i < 13) {
      //new elements to be created in each row
      var row = $("<tr>");
      var cell1 = $("<td>");
      var cell2 = $("<td>");
      var cell3 = $("<td>");
      var textbox = $("<textarea/>");
      var button = $("<button>");
      
      var cellId = i;
      //extracting the modified moment's current hour and am/pm indicatino
      var currH = modSM.format("h");
      var currA = modSM.format("a");
      //concatinating the two variables above so they can be added to cell1 of the table
      var time = currH + currA;
      //variable defining the parsed data ( previously entered events, if any) to be rendered in the text area within cell2.
      var data = JSON.parse(localStorage.getItem(cellId));

      //this colors the blocks based on whether they are before or after the current hour,  or within the current hour.
      if (modSM.format("h") === rightNow.format("h")) {
        $(cell2).attr("style", "background-color:red");
      } else if (modSM.isBefore(rightNow)) {
        $(cell2).attr("style", "background-color:gray");
      } else if (modSM.isAfter(rightNow)) {
        $(cell2).attr("style", "background-color:green");
      }
      //adds the events from local storage to the textbox, if any entries exist for that timeblock's id
      textbox.text(data);
      //appendss the modified time to cell1
      cell1.append(time);
      //appendss the text box element to cell2
      cell2.append(textbox);

      //assigns cell2 its id
      $(cell2).attr("id", i);
      

      //assigns the same id to the button
      $(button).attr("id", i);
      //adds "SAVE" to the button face
      button.text("SAVE");
      //append the button to cell3
      cell3.append(button);
      //append all 3 cells to the row, which are appended to the table
      table.append(row.append(cell1, cell2, cell3));
      //increment the time
      modSM.add("1", "h");
      //increment i
      i++;
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
    var prevBoxText = JSON.stringify($(clicked).parent().prev().children().val());
    //based on the buttons id, the contents of the neighboring textbox are stored in the browser's local storage
    localStorage.setItem(id, prevBoxText);
    //the table is re-rendered with the new stored values included
    renderTB();
  });
});
