document.addEventListener('DOMContentLoaded', (event) => {
    // wordsTool.js is now loaded and executed

    // Get the text box element
    var textBox = document.getElementById('line-input');

    // Add an event listener for the input event
    textBox.addEventListener('input', (event) => {
        // Get the input value
        var input = event.target.value;

        // Run the getLine function with the input value
        lines = getLine('WORD', input);
        // Get the output table
        var table = document.getElementById('output-table');

        // Clear the table
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        // Create a new table row for each line
        lines.forEach((line) => {
            // Create a new row and cell
            var row = document.createElement('tr');
            var cell = document.createElement('td');

            // Set the cell text
            cell.textContent = line;

            // Add the cell to the row
            row.appendChild(cell);

            // Add the row to the table
            table.appendChild(row);
        });
    });
});