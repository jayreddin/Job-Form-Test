function submitForm() {
    // Get all form data
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let tasks = [];
    let taskInputs = document.querySelectorAll('[id^=task]');
    taskInputs.forEach((input) => {
        tasks.push(input.value);
    });
    let purchase = document.querySelector('[name=purchase]:checked').value;
    let invoices = document.getElementById('invoices').value;
    let suppliers = [];
    let supplierInputs = document.querySelectorAll('[id^=supplier]');
    supplierInputs.forEach((input) => {
        suppliers.push(input.value);
    });
    let returnWork = document.querySelector('[name=return]:checked').value;
    let returnDescription = document.getElementById('return').value;
    let images = document.getElementById('images').files;

    // Compile form data
    let formData = {
        name,
        address,
        tasks,
        purchase,
        invoices,
        suppliers,
        returnWork,
        returnDescription,
        images,
    };

    // Generate PDF
    // You can use a library like jsPDF or pdfMake to generate the PDF
    // For example, with jsPDF:
    let pdf = new jsPDF();
    pdf.text('Job Task Form', 10, 10);
    pdf.text('Name: ' + name, 10, 20);
    pdf.text('Address: ' + address, 10, 30);
    pdf.text('Tasks: ' + tasks.join(', '), 10, 40);
    pdf.text('Purchase: ' + purchase, 10, 50);
    pdf.text('Invoices: ' + invoices, 10, 60);
    pdf.text('Suppliers: ' + suppliers.join(', '), 10, 70);
    pdf.text('Return Work: ' + returnWork, 10, 80);
    pdf.text('Return Description: ' + returnDescription, 10, 90);
    pdf.save('job_task_form.pdf');
}