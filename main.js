// DSA FINALIZED DATA STRUCTURE

// Issue Object Structure:
// {
//   id: string,
//   title: string,
//   category: string,
//   severity: string,
//   upvotes: number,
//   score: number
// }
let departments = ["Water", "Road", "Hostel", "Electricity"];
let issues = JSON.parse(localStorage.getItem("issues")) || [];

/* FORM SUBMIT LOGIC */

document.getElementById("issueForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const severity = document.getElementById("severity").value;
    const studentName = document.getElementById("studentName").value;
    const block = document.getElementById("block").value;
    const specificLocation = document.getElementById("specificLocation").value;

    const newIssue = {
        id: Date.now().toString(),
        title,
        category,
        severity,
        studentName,
        block,
        specificLocation,
        upvotes: 0,
        score: calculatePriority(severity, 0), 
        status: "Pending"
    };
        

    issues.push(newIssue);

    // Apply sorting before saving
    sortByPriority(issues);

    localStorage.setItem("issues", JSON.stringify(issues));

    alert("Issue Submitted Successfully!");
    document.getElementById("issueForm").reset();

    displayIssues(issues); // Refresh table after submit
    generateLeaderboard();
});


/* DISPLAY LOGIC */

function displayIssues(issueList) {
    const tbody = document.getElementById("issueBody");
    tbody.innerHTML = "";

    issueList.forEach(issue => {

         let actionButtons = "";
         
         if (issue.status === "Awaiting Confirmation") {
            actionButtons = `
            <button onclick="confirmIssue('${issue.id}')">Confirm</button>
            <button onclick="rejectIssue('${issue.id}')">Reject</button>
        `;
    }
        tbody.innerHTML += `
            <tr>
                <td>${issue.title}</td>
                <td>${issue.category}</td>
                <td>${issue.severity}</td>
                <td>${issue.score}</td>
                <td>${issue.status}</td>
                <td>${issue.upvotes}</td>
                <td><button onclick="upvoteIssue(${issue.id})">👍 Upvote</button>
                ${actionButtons}
                </td>
            </tr>
        `;
    });
}

function confirmIssue(id) {

    let issue = issues.find(issue => issue.id == id);

    if (issue) {
        issue.status = "Resolved";
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    displayIssues(issues);
}

function rejectIssue(id) {

    let issue = issues.find(issue => issue.id == id);

    if (issue) {

        // Reopen issue
        issue.status = "Reopened";

        // Anti-cheat: reduce score by 1
        issue.score = issue.score - 1;

        if (issue.score < 0) {
            issue.score = 0;
        }
    }

    sortByPriority(issues);
    localStorage.setItem("issues", JSON.stringify(issues));
    displayIssues(issues);
}

function upvoteIssue(id) {
    let issue = issues.find(issue => issue.id === id);
    if(issue) {
        // Increment upvotes
        issue.upvotes += 1;

        // Recalculate score: severity-based + upvotes
        issue.score = calculatePriority(issue.severity, issue.upvotes);

         sortByPriority(issues);
         
        // Save and refresh UI
        localStorage.setItem("issues", JSON.stringify(issues));
        displayIssues(issues);
        generateLeaderboard();
    }
}


/* FILTER LOGIC */

function applyFilter() {
    const selectedSeverity = document.getElementById("filterSeverity").value;

    let filteredIssues;

    if (selectedSeverity === "All") {
        filteredIssues = sortByPriority([...issues]);
    } else {
        filteredIssues = sortByPriority(
            issues.filter(issue => issue.severity === selectedSeverity)
        );
    }

    displayIssues(filteredIssues);
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
//  DISPLAY LEADERBOARD


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


/* INITIAL LOAD */
window.onload = function() {
    issues = JSON.parse(localStorage.getItem("issues")) || [];
    // Fix missing status
    issues = issues.map(issue => {
        if(!issue.status) issue.status = "Pending";
        return issue;
    });
    sortByPriority(issues);
    displayIssues(issues);
    generateLeaderboard();
};









