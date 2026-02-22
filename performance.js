let issues = JSON.parse(localStorage.getItem("issues")) || [];

let departments = ["Water", "Road", "Hostel", "Electricity"];

let loggedInDept = localStorage.getItem("loggedInDept");

// CALCULATE CURRENT DEPT STATS
function calculateDepartmentStats() {

    let deptIssues = issues.filter(issue => issue.category === loggedInDept);

    let totalAssigned = deptIssues.length;

    let totalResolved = deptIssues.filter(issue => issue.status === "Resolved").length;

    let totalPending = totalAssigned - totalResolved;

    let performanceScore = totalAssigned === 0
        ? 0
        : Math.round((totalResolved / totalAssigned) * 100);

    // Update UI
    document.getElementById("totalAssigned").innerText = totalAssigned;
    document.getElementById("totalResolved").innerText = totalResolved;
    document.getElementById("totalPending").innerText = totalPending;
    document.getElementById("performanceScore").innerText = performanceScore + "%";
}


//  LEADERBOARD CALCULATION
function generateLeaderboard() {

    let leaderboard = [];

    departments.forEach(dept => {

        let deptIssues = issues.filter(issue => issue.category === dept);

        let total = deptIssues.length;
        let resolved = deptIssues.filter(issue => issue.status === "Resolved").length;

        let score = total === 0 ? 0 : Math.round((resolved / total) * 100);

        leaderboard.push({
            department: dept,
            total,
            resolved,
            score
        });
    });

    // Sort descending by score
    leaderboard.sort((a, b) => b.score - a.score);

    displayLeaderboard(leaderboard);
}
// 3️⃣ DISPLAY LEADERBOARD
// ===============================
// DISPLAY LEADERBOARD
function displayLeaderboard(data) {

    let tbody = document.getElementById("leaderboardBody");
    tbody.innerHTML = "";

    data.forEach((dept, index) => {

        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${dept.department}</td>
                <td>${dept.resolved}</td>
                <td>${dept.total}</td>
                <td>${dept.score}%</td>
            </tr>
        `;

        tbody.innerHTML += row;
    });
}

window.onload = function() {
    issues = JSON.parse(localStorage.getItem("issues")) || [];
    calculateDepartmentStats();
    generateLeaderboard();
};
