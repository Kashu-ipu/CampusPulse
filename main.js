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

// Form Submit
document.getElementById("issueForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const severity = document.getElementById("severity").value;

    const priorityScore = {
        "High": 3,
        "Medium": 2,
        "Low": 1
    };

    const newIssue = {
        id: Date.now(),
        title,
        category,
        severity,
        upvotes: 0,
        score: priorityScore[severity]
    };
        

    issues.push(newIssue);

    localStorage.setItem("issues", JSON.stringify(issues));

     alert("Issue Submitted Successfully!");
    document.getElementById("issueForm").reset();
});






