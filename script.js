document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => document.getElementById("navbar-placeholder").innerHTML = data)
        .then(() => addLanguageToggleFunctionality());

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);
});

function addLanguageToggleFunctionality() {
    const switchButton = document.getElementById("languageSwitch");

    switchButton.addEventListener("change", function () {
        if (this.checked) {
            translateToEnglish();
        } else {
            translateToBangla();
        }
    });
}

function translateToBangla() {
    document.body.classList.add("bangla-text");

    // Example: Replacing text manually (can be replaced with an API)
    document.querySelectorAll(".nav-link").forEach(el => {
        if (el.textContent.trim() === "Home") el.textContent = "হোম";
        if (el.textContent.trim() === "About") el.textContent = "সম্পর্কে";
        if (el.textContent.trim() === "Relief & Support") el.textContent = "ত্রাণ ও সহায়তা";
        if (el.textContent.trim() === "Flood Information") el.textContent = "বন্যা তথ্য";
        if (el.textContent.trim() === "News") el.textContent = "সংবাদ";
        if (el.textContent.trim() === "Contact") el.textContent = "যোগাযোগ";
    });
}

function translateToEnglish() {
    document.body.classList.remove("bangla-text");

    // Revert back to English
    document.querySelectorAll(".nav-link").forEach(el => {
        if (el.textContent.trim() === "হোম") el.textContent = "Home";
        if (el.textContent.trim() === "সম্পর্কে") el.textContent = "About";
        if (el.textContent.trim() === "ত্রাণ ও সহায়তা") el.textContent = "Relief & Support";
        if (el.textContent.trim() === "বন্যা তথ্য") el.textContent = "Flood Information";
        if (el.textContent.trim() === "সংবাদ") el.textContent = "News";
        if (el.textContent.trim() === "যোগাযোগ") el.textContent = "Contact";
    });
}

// Global Variables
let csvData = [];
let currentPage = 1;
const rowsPerPage = 20;

// Load CSV and Initialize Table
document.addEventListener("DOMContentLoaded", function () {
    fetch("FloodPrediction.csv")
        .then(response => response.text())
        .then(data => {
            csvData = processCSV(data);
            displayPage(currentPage);
        });

    // Pagination Button Events
    document.getElementById("prevPage").addEventListener("click", () => changePage(-1));
    document.getElementById("nextPage").addEventListener("click", () => changePage(1));

    // Search Filter
    document.getElementById("stationSearch").addEventListener("input", function () {
        let searchQuery = this.value.toLowerCase();
        let filteredData = csvData.filter(row => row.Station_Names.toLowerCase().includes(searchQuery));
        displayFilteredData(filteredData);
    });
});

// Function to Process CSV Data
function processCSV(csvData) {
    const rows = csvData.split("\n").slice(1); // Remove header
    return rows.map(row => {
        let columns = row.split(",");
        return {
            Sl: columns[0],
            Station_Names: columns[1],
            Year: columns[2],
            Month: columns[3],
            Max_Temp: columns[4],
            Min_Temp: columns[5],
            Rainfall: columns[6],
            Relative_Humidity: columns[7],
            Wind_Speed: columns[8],
            Cloud_Coverage: columns[9],
            Bright_Sunshine: columns[10],
            Latitude: columns[13],
            Longitude: columns[14],
            Flood: columns[17]?.trim() === "Yes" ? 
                   '<span class="badge bg-danger">Flood Risk</span>' : 
                   '<span class="badge bg-success">Safe</span>'
        };
    }).filter(row => row.Sl); // Remove empty rows
}

// Function to Display Data for Current Page
function displayPage(page) {
    let tableBody = document.getElementById("predictionTable");
    tableBody.innerHTML = "";

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let pageData = csvData.slice(start, end);

    pageData.forEach(row => {
        let newRow = `<tr>
            <td>${row.Sl}</td>
            <td>${row.Station_Names}</td>
            <td>${row.Year}</td>
            <td>${row.Month}</td>
            <td>${row.Max_Temp}</td>
            <td>${row.Min_Temp}</td>
            <td>${row.Rainfall}</td>
            <td>${row.Relative_Humidity}</td>
            <td>${row.Wind_Speed}</td>
            <td>${row.Cloud_Coverage}</td>
            <td>${row.Bright_Sunshine}</td>
            <td>${row.Latitude}</td>
            <td>${row.Longitude}</td>
            <td>${row.Flood}</td>
        </tr>`;
        tableBody.innerHTML += newRow;
    });

    document.getElementById("pageNumber").textContent = `Page ${page}`;
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = end >= csvData.length;
}

// Function to Change Page
function changePage(step) {
    currentPage += step;
    displayPage(currentPage);
}

// Function to Display Filtered Data
function displayFilteredData(filteredData) {
    let tableBody = document.getElementById("predictionTable");
    tableBody.innerHTML = "";

    filteredData.slice(0, rowsPerPage).forEach(row => {
        let newRow = `<tr>
            <td>${row.Sl}</td>
            <td>${row.Station_Names}</td>
            <td>${row.Year}</td>
            <td>${row.Month}</td>
            <td>${row.Max_Temp}</td>
            <td>${row.Min_Temp}</td>
            <td>${row.Rainfall}</td>
            <td>${row.Relative_Humidity}</td>
            <td>${row.Wind_Speed}</td>
            <td>${row.Cloud_Coverage}</td>
            <td>${row.Bright_Sunshine}</td>
            <td>${row.Latitude}</td>
            <td>${row.Longitude}</td>
            <td>${row.Flood}</td>
        </tr>`;
        tableBody.innerHTML += newRow;
    });

    document.getElementById("pageNumber").textContent = `Filtered Results`;
}

// Function to Load Navbar & Footer
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data);
}