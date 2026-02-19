let issues = JSON.parse(localStorage.getItem("issues")) || [];

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
            </div>
        `;
    });

    totalCount.textContent = issues.length;
}

displayIssues();
