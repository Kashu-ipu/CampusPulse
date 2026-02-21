let issues = JSON.parse(localStorage.getItem("issues")) || [];

let loggedInDept = localStorage.getItem("loggedInDept") || "DefaultDept";
document.getElementById("deptName").textContent = loggedInDept;

// Filter issues by department
function filterByDepartment(issueArray, department) {
    return issueArray.filter(issue => issue.category === department);
}

let deptIssues = filterByDepartment(issues, loggedInDept);
deptIssues = sortByPriority(deptIssues);

displayIssues(deptIssues);  // pass filtered list


function displayIssues(issueList) {

    const container = document.getElementById("issueList");
    const totalCount = document.getElementById("totalCount");

    container.innerHTML = "";

    issueList.forEach(issue => {
        container.innerHTML += `
            <div class="issue-card">
                <strong>${issue.title}</strong><br>
                Category: ${issue.category}<br>
                Severity: ${issue.severity}<br>
                Score: ${issue.score}
                Status: <b>${issue.status || "Pending"}</b><br><br>

                <button onclick="updateStatus('${issue.title}', 'Pending')">Pending</button>
                <button onclick="updateStatus('${issue.title}', 'In Progress')">In Progress</button>
                <button onclick="updateStatus('${issue.title}', 'Resolved')">Mark Resolved</button>
                <button onclick="upvoteIssue(${issue.id})">⬆ Upvote (${issue.upvotes})</button>
            </div>
        `;
    });

    totalCount.textContent = issues.length;
}

function updateStatus(title, newStatus) {

    let issueToUpdate = issues.find(issue => issue.title === title);

        if (issueToUpdate) {

        // If department marks resolved → Await confirmation
        if (newStatus === "Resolved") {
            issueToUpdate.status = (newStatus === "Resolved") ? "Awaiting Confirmation" : newStatus;
        } 
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    let deptIssues = filterByDepartment(issues, loggedInDept);
    deptIssues = sortByPriority(deptIssues);

    displayIssues(deptIssues);

}

displayIssues();
