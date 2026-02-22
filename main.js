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

/* FORM SUBMIT LOGIC */

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
});

/* DISPLAY LOGIC */

function displayIssues(issueList) {
    const tbody = document.getElementById("issueBody");
    tbody.innerHTML = "";

    issueList.forEach(issue => {
         let actionButtons = "";
         
         if (issue.status === "Awaiting Confirmation") {
            actionButtons = `
            <button onclick="confirmIssue(${issue.id})">Confirm</button>
            <button onclick="rejectIssue(${issue.id})">Reject</button>
        `;
    }
        tbody.innerHTML += `
            <tr>
                <td>${issue.title}</td>
                <td>${issue.category}</td>
                <td>${issue.severity}</td>
                <td>${issue.score}</td>
                <td>${issue.upvotes}</td>
                <td><button onclick="upvoteIssue(${issue.id})">👍 Upvote</button></td>
            </tr>
        `;
    });
}

function confirmIssue(id) {

    let issue = issues.find(issue => issue.id === id);

    if (issue) {
        issue.status = "Closed";
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    displayIssues(issues);
}

function rejectIssue(id) {

    let issue = issues.find(issue => issue.id === id);

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


/* INITIAL LOAD */

sortByPriority(issues);
displayIssues(issues);








