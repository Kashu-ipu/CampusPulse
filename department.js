let issues = JSON.parse(localStorage.getItem("issues")) || [];
// Get logged-in department
let loggedInDept = localStorage.getItem("loggedInDept");

// Show department name on page
document.getElementById("deptName").textContent = loggedInDept;

// Filter issues by department
function filterByDepartment(issueArray, department) {
    return issueArray.filter(issue => issue.category === department);
}

// Filter issues by department (DSA function call)
let deptIssues = filterByDepartment(issues, loggedInDept);

// Apply sorting (DSA function call)
deptIssues = sortByPriority(deptIssues);


function displayIssues() {

    const container = document.getElementById("issueList");
    const totalCount = document.getElementById("totalCount");

    container.innerHTML = "";

    issues.forEach(issue => {
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
            </div>
        `;
    });

    totalCount.textContent = issues.length;
}

function updateStatus(title, newStatus) {

    let issueToUpdate = issues.find(issue => issue.title === title);

    if (issueToUpdate) {
        issueToUpdate.status = newStatus;
    }

    localStorage.setItem("issues", JSON.stringify(issues));

    displayIssues();
}

displayIssues();
