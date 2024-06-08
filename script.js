

document.getElementById('uploadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // Clear the preview container or handle the response
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

    document.getElementById('imageInput').addEventListener('change', function(event) {
      const previewContainer = document.getElementById('previewContainer');
      previewContainer.innerHTML = '';
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
          const imagePreview = document.createElement('div');
          imagePreview.classList.add('image-preview');

          const img = document.createElement('img');
          img.src = e.target.result;
          imagePreview.appendChild(img);

          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('delete-btn');
          deleteBtn.innerText = 'X';
          deleteBtn.onclick = function() {
            previewContainer.removeChild(imagePreview);
          };
          imagePreview.appendChild(deleteBtn);

          previewContainer.appendChild(imagePreview);
        };
        reader.readAsDataURL(file);
      }
    });

    let currentPage = 1;
    let data = {};

    function nextPage() {
        // Hide the current page
        document.getElementById("page" + currentPage).style.display = "none";

        // Conditional navigation logic for page 4
        if (currentPage === 4) {
            let purchaseAnswer = document.querySelector('input[name="purchase"]:checked');
            if (purchaseAnswer && purchaseAnswer.value === 'yes') {
                currentPage = 5;
            } else {
                currentPage = 6;
            }
        }
        // Conditional navigation logic for page 6
        else if (currentPage === 6) {
            let returnAnswer = document.querySelector('input[name="return"]:checked');
            if (returnAnswer && returnAnswer.value === 'yes') {
                currentPage = 7;
            } else {
                currentPage = 8;
            }
        } else {
            currentPage++;
        }

        // Show the new page
        document.getElementById("page" + currentPage).style.display = "block";
    }

    function previousPage() {
        // Hide the current page
        document.getElementById("page" + currentPage).style.display = "none";

        // Conditional logic for returning to the correct previous page
        if (currentPage === 5) {
            // If we're on page 5, we know the user previously selected 'yes' on page 4
            currentPage = 4;
        } else if (currentPage === 6) {
            // If we're on page 6, we need to check if the user came from page 4 or 5
            let purchaseAnswer = document.querySelector('input[name="purchase"]:checked');
            currentPage = (purchaseAnswer && purchaseAnswer.value === 'yes') ? 5 : 4;
        } else if (currentPage === 7) {
            // If we're on page 7, we know the user previously selected 'yes' on page 6
            currentPage = 6;
        } else if (currentPage === 8) {
            // If we're on page 8, we need to check if the user came from page 6 or 7
            let returnAnswer = document.querySelector('input[name="return"]:checked');
            currentPage = (returnAnswer && returnAnswer.value === 'yes') ? 7 : 6;
        } else {
            // For all other pages, simply go back to the previous page
            currentPage--;
        }

        // Show the new page
        document.getElementById("page" + currentPage).style.display = "block";
    }

    // add tasks more logic
        function addTask() {
            let taskNumber = document.querySelectorAll('#page3 [id^=task]').length + 1;
            let input = document.createElement('input');
            input.type = 'text';
            input.id = 'task' + taskNumber;
            input.placeholder = 'Task ' + taskNumber;
            let addButtonContainer = document.querySelector('.full-width-button-addtasks');
            addButtonContainer.parentNode.insertBefore(input, addButtonContainer);


    }


   //Add Suppliers more logic V1
//    function addSuppliers() {
//        let supplierNumber = document.querySelectorAll('[id^=supplier]').length + 1;
//        let input = document.createElement('input');
    //    input.type = 'text';
  //      input.id = 'supplier' + supplierNumber;
  //      input.placeholder = 'Supplier ' + supplierNumber;
 //       document.getElementById('page5').appendChild(input);
//    }


     //Add Suppliers more logic V2
    let supplierCounter = 2;

    function addSuppliers() {
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'supplier' + supplierCounter;
        input.placeholder = 'Supplier ' + supplierCounter;

        let addButtonContainer = document.querySelector('.full-width-button-suppliers');
                addButtonContainer.parentNode.insertBefore(input, addButtonContainer);



        /*document.getElementById('page5').appendChild(input);*/

        supplierCounter++;
    }

    function resetSupplierCounter() {
        supplierCounter = 1;
    }

    //Resize text box return work
    const textarea = document.getElementById('return');
      textarea.addEventListener('input', autoResize, false);

      function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      }



// Ensure this script is included after your form in the HTML file or is executed after the DOM is fully loaded

// This function will be called when the user clicks the 'Submit' button
function submitForm() {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a FormData object, passing in the form you want to submit
    var formData = new FormData(document.getElementById('uploadForm'));

    // Append other form data to the FormData object
    formData.append('name', document.getElementById('name').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('task1', document.getElementById('task1').value);
    // ... append other form fields as needed
    formData.append('purchase', document.querySelector('input[name="purchase"]:checked').value);
    formData.append('invoices', document.getElementById('invoices').value);
    formData.append('supplier1', document.getElementById('supplier1').value);
    formData.append('return', document.querySelector('input[name="return"]:checked').value);
    formData.append('return_work', document.getElementById('return').value);

    // Use the fetch API to send the form data to the server
    fetch('/generate-pdf', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.blob(); // Convert the response to a blob
    })
    .then(blob => {
        // Create a URL for the blob object
        const pdfUrl = URL.createObjectURL(blob);
        // Open the PDF in a new window/tab
        window.open(pdfUrl, '_blank');
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error during fetch:', error);
    });
}

// Add an event listener to the form's 'submit' event
document.getElementById('uploadForm').addEventListener('submit', submitForm);
