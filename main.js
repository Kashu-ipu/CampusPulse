// DSA FINALIZED DATA STRUCTURE

// Issue Object Structure:
// {
//   id: number,
//   title: string,
//   category: string,
//   severity: string,
//   upvotes: number,
//   score: number
// }

let issues = JSON.parse(localStorage.getItem("issues")) || [];

/* =========================
   DSA PART - Priority Logic
========================= */

// Priority Calculation Function
function calculatePriority(severity) {
    const priorityScore = {
        "High": 3,
        "Medium": 2,
        "Low": 1
    };
    return priorityScore[severity];
}

// Sorting Function (Descending Order)
function sortByPriority(issueArray) {
    return issueArray.sort((a, b) => b.score - a.score);
}

/* =========================
   FORM SUBMIT LOGIC
========================= */

document.getElementById("issueForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const severity = document.getElementById("severity").value;

    const newIssue = {
        id: Date.now(),
        title,
        category,
        severity,
        upvotes: 0,
        score: calculatePriority(severity)
    };
        

    issues.push(newIssue);

    // Apply sorting before saving
    sortByPriority(issues);

    localStorage.setItem("issues", JSON.stringify(issues));

    alert("Issue Submitted Successfully!");
    document.getElementById("issueForm").reset();

    displayIssues(issues); // Refresh table after submit
});

/* =========================
   DISPLAY LOGIC
========================= */

function displayIssues(issueList) {
    const tbody = document.getElementById("issueBody");
    tbody.innerHTML = "";

    issueList.forEach(issue => {
        tbody.innerHTML += `
            <tr>
                <td>${issue.title}</td>
                <td>${issue.category}</td>
                <td>${issue.severity}</td>
                <td>${issue.score}</td>
            </tr>
        `;
    });
}

/* =========================
   FILTER LOGIC
========================= */

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


/* =========================
   INITIAL LOAD
========================= */

sortByPriority(issues);
displayIssues(issues);








