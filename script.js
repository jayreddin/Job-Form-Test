let currentPage = 1;
let data = {};

function nextPage() {
    // Hide the current page
    document.getElementById("page" + currentPage).style.display = "none";

    // Check if we're on page 4 and what the user's answer is
    if (currentPage === 4) {
        var purchaseAnswer = document.querySelector('input[name="purchase"]:checked');
        // If the answer is 'yes', go to page 5
        if (purchaseAnswer && purchaseAnswer.value === 'yes') {
            currentPage = 5;
        } else {
            // If the answer is 'no', skip to page 6
            currentPage = 6;
        }
    }
    // Check if we're on page 6 and what the user's answer is
    else if (currentPage === 6) {
        var returnAnswer = document.querySelector('input[name="return"]:checked');
        // If the answer is 'yes', go to page 7
        if (returnAnswer && returnAnswer.value === 'yes') {
            currentPage = 7;
        } else {
            // If the answer is 'no', skip to page 8
            currentPage = 8;
        }
    } else {
        // For all other pages, just go to the next page
        currentPage++;
    }

    // Show the new page
    document.getElementById("page" + currentPage).style.display = "block";
}

function previousPage() {
    document.getElementById("page" + currentPage).style.display = "none";
    currentPage--;
    document.getElementById("page" + currentPage).style.display = "block";
}

function previousPage() {
    // Hide the current page
    document.getElementById("page" + currentPage).style.display = "none";

    // Conditional logic for returning to the correct previous page
    if (currentPage === 5 || currentPage === 7) {
        // If we're on a page that follows a 'yes' selection, go back to the yes/no question page
        currentPage -= 2;
    } else if (currentPage === 6 || currentPage === 8) {
        // If we're on a page that follows a 'no' selection, go back to the yes/no question page
        currentPage--;
        var previousPageYesNo = currentPage - 1;
        var previousAnswer = document.querySelector('input[name="purchase"]:checked');
        if (currentPage === 6 && previousAnswer && previousAnswer.value === 'no') {
            currentPage = 4;
        }
        previousAnswer = document.querySelector('input[name="return"]:checked');
        if (currentPage === 8 && previousAnswer && previousAnswer.value === 'no') {
            currentPage = 6;
        }
    } else {
        currentPage--;
    }

    // Show the new page
    document.getElementById("page" + currentPage).style.display = "block";
}

function addTask() {
    let taskNumber = document.querySelectorAll('[id^=task]').length + 1;
    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'task' + taskNumber;
    input.placeholder = 'Task ' + taskNumber;
    document.getElementById('page3').appendChild(input);
}

function addSuppliers() {
    let suppliers = document.getElementById('suppliers');
    let input = document.createElement('input');
    input.type = 'text';
    suppliers.appendChild(input);
}

function submitForm() {
    // Compile form data and generate PDF
    // Code to be added here
}