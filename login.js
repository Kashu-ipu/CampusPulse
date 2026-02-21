const roleSelect = document.getElementById("role");
const deptSelect = document.getElementById("department");

roleSelect.addEventListener("change", function() {
    if(this.value === "department") {
        deptSelect.style.display = "block";
    } else {
        deptSelect.style.display = "none";
    }
});

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const role = document.getElementById("role").value;

    if(role === "student"){
        window.location.href = "student.html";
    } else {
        const dept = document.getElementById("department").value;
        localStorage.setItem("loggedInDept", dept);
        window.location.href = "department.html";
    }
});