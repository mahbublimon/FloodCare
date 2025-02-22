document.addEventListener("DOMContentLoaded", function () {
    // Sidebar Toggle
    document.getElementById("menu-toggle").addEventListener("click", function () {
        document.getElementById("wrapper").classList.toggle("toggled");
    });

    // Fetch Data for Dashboard (Simulating API Calls)
    fetchDashboardData();
});

function fetchDashboardData() {
    // Sample Data (Replace with API Fetch Call)
    let totalDonations = 120;
    let donationAmount = 25000;
    let pendingDonations = 15;
    let volunteerRequests = 8;

    // Update Dashboard
    document.getElementById("total-donations").textContent = totalDonations;
    document.getElementById("donation-amount").textContent = "$" + donationAmount;
    document.getElementById("pending-donations").textContent = pendingDonations;
    document.getElementById("volunteer-requests").textContent = volunteerRequests;

    // Sample Volunteers Table Data (Replace with API Call)
    let volunteerData = [
        { id: 1, name: "Rahim Khan", email: "rahim@example.com", status: "Pending" },
        { id: 2, name: "Ayesha Akter", email: "ayesha@example.com", status: "Pending" }
    ];

    // Load Table
    let volunteerTable = document.getElementById("volunteer-table");
    volunteerTable.innerHTML = "";
    volunteerData.forEach(volunteer => {
        let row = `
            <tr>
                <td>${volunteer.id}</td>
                <td>${volunteer.name}</td>
                <td>${volunteer.email}</td>
                <td>${volunteer.status}</td>
                <td>
                    <button class="btn btn-success btn-sm">Approve</button>
                    <button class="btn btn-danger btn-sm">Reject</button>
                </td>
            </tr>
        `;
        volunteerTable.innerHTML += row;
    });
}