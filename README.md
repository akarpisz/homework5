# homework5

https://akarpisz.github.io/homework5


this program uses the moment.js library to render a dynamic day planner. events can be entered and saved in the browsers local storage. the planner itself is a table with functional child elements appended to to individual cells. 

the moment.js library allows moments to be captured, modified, formatted, and compared with other "moments". In this day planner, the current date (m/d) and time (h/m/s) are continuously updated in 1 second intervals, displayed at the top. 

the cells[0] of the table rows, display a modified version of a moment, creating a start time that can be displayed, as well as incremented as the table is dynamically rendered. the modified moments used to create the timeblocks are compared with the current moment's hour, coloring the table based on whther or not a timeblock has passed (gray), is in the present hour (red), or in the future (green).

the cells[1] have editable text areas within them, allowing users to add text.

the cells[2], have save buttons within them. 

when a button in the cells[2] are clicked, the current text in the previous cell is saved to local storage, under the id assigned to the parent cell pair. the table then re-renders, and when it does, it displays the appropriate text in the appropriate cell.

