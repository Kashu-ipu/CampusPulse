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
        score: calculatePriority(severity) + upvotes,
        status: "Pending"
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








