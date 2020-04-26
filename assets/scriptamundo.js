$(document).ready(function () {
  //VARIABLES 
  var currentDayEl = $("#currentDay");
  var rightNow = moment();

  setInterval(function () {
    var obj = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    currentDayEl.text(obj);
  }, 1000);

  function renderTB() {
    var table = $(".blocks");
    var i = 0;

    var modSM = moment().hours(7).minutes(0).seconds(0).milliseconds(0);

    while (i < 13) {
      var row = $("<tr>");
      var cell1 = $("<td>");
      var cell2 = $("<td>");
      var cell3 = $("<td>");
      var textbox = $("<textarea/>");
      var button = $("<button>");
      
      var cellId = i;

      var currH = modSM.format("h");
      var currA = modSM.format("a");
      var time = currH + currA;
    
      var data = JSON.parse(localStorage.getItem(cellId));


      if (modSM.format("h") === rightNow.format("h")) {
        $(cell2).attr("style", "background-color:red");
      } else if (modSM.isBefore(rightNow)) {
        $(cell2).attr("style", "background-color:gray");
      } else if (modSM.isAfter(rightNow)) {
        $(cell2).attr("style", "background-color:green");
      }

      textbox.text(data);
      cell1.append(time);
      cell2.append(textbox);

      $(cell2).attr("id", i);
      $(cell2).attr("class", "event");

      
      $(button).attr("id", i);
      cell3.append(button);
      button.text("SAVE");
      table.append(row.append(cell1, cell2, cell3));

      modSM.add("1", "h");
      i++;
    }
  }

  renderTB();
  $("button").on("click", function (event) {
    var clicked = event.target;
    var id = $(clicked).parent().prev().attr("id");

    var prevBoxText = JSON.stringify($(clicked).parent().prev().children().val());

    localStorage.setItem(id, prevBoxText);
    renderTB();
  });
});
