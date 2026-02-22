function calculatePriority(severity, upvotes = 0) {
    const priorityScore = {
        "High": 3,
        "Medium": 2,
        "Low": 1
    };
    return priorityScore[severity] + upvotes;
}

function sortByPriority(issueArray) {
    return issueArray.sort((a, b) => b.score - a.score);
}

