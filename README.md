🚀 CampusPulse

A role-based campus issue reporting and tracking system built using HTML, CSS, and JavaScript.

CampusPulse allows students to report campus issues and departments to manage, prioritize, and resolve them — all through a dynamic frontend interface using browser localStorage.

📌 Problem Statement

In many colleges, students face issues related to water supply, electricity, roads, hostels, etc., but there is:

❌ No structured reporting system
❌ No transparency in issue tracking
❌ No performance accountability for departments

CampusPulse solves this by providing a centralized issue management system with role-based dashboards and performance tracking.

🎯 Key Features

👩‍🎓 Student Side

- Raise new issues
- Select category & severity
- Automatic priority score calculation
- Upvote issues
- View issue status (Pending / In Progress / Awaiting Confirmation / Resolved)
- Confirm or reject resolution
- Personal performance summary

🏢 Department Side

- View only assigned issues
- Issues sorted by priority (Severity + Upvotes)
- Update issue status
- Mark issues as resolved (awaiting student confirmation)
- View total assigned issues

📊 Performance Dashboard

- Total issues per department
- Total resolved
- Pending count
- Performance percentage
- Department leaderboard


🧠 Core Logic (DSA Integration)

CampusPulse implements:

- Priority scoring algorithm:
score = severityWeight + upvotes

- Sorting using custom priority logic
- Filtering based on department role
- Dynamic DOM rendering
- Persistent state using localStorage

🗂️ Project Structure
CampusPulse/
│
├── login.html
├── login.js
│
├── student.html
├── main.js
│
├── department.html
├── department.js
│
├── performance.html
├── performance.js
│
├── dsa.js
│
├── style.css
├── style2.css
│
└── README.md

🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage (for persistence)
- Basic DSA concepts (sorting & filtering)

🔄 Issue Lifecycle
Student Submits Issue
        ↓
Department Sees Issue
        ↓
Pending → In Progress → Mark Resolved
        ↓
Status becomes "Awaiting Confirmation"
        ↓
Student Confirms → Resolved
OR
Student Rejects → Reopened

📦 How to Run the Project

1. Clone the repository:
git clone https://github.com/Kashu-ipu/CampusPulse.git

2. Open login.html in your browser.

⭐ Why CampusPulse Stands Out

- Complete issue lifecycle management
- Gamified department performance tracking
- Structured DSA integration
- Clean separation of student & department roles
- Fully functional without backend


🚀 Future Improvements

- Backend integration (Node.js / Firebase)
- Real-time notifications
- Email alerts
- Admin panel
- Graph-based analytics
- Mobile responsiveness
- Authentication system


💡 What I Learned

- Building role-based UI systems
- Managing application state with localStorage
- Designing workflow-based interfaces
- Implementing priority-based sorting logic
- Structuring a frontend project properly

👩‍💻 Author

Kashvi
Engineering Student
Frontend Developer

GitHub: https://github.com/Kashu-ipu

Ojasv
Engineering Student

GitHub: https://github.com/ojasv-rtech

Shubham
Engineering Student

GitHub: https://github.com/shubhamchauhan12611-droid

