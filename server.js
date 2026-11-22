
const express = require("express");
const app = express();

app.use(express.json());

const employees = [
  { id: 1, name: "Ali", department: "IT" },
  { id: 2, name: "Ahmed", department: "HR" },
  { id: 3, name: "Sara", department: "Finance" }
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Employee Management Application",
    employees: employees
  });
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Application is running successfully"
  });
});

if (require.main === module) {
  app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;
