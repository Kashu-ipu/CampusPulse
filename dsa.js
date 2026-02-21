function calculatePriority(severity) {
    const priorityScore = {
        "High": 3,
        "Medium": 2,
        "Low": 1
    };
    return priorityScore[severity];
}

function sortByPriority(issueArray) {
    return issueArray.sort((a, b) => b.score - a.score);
}