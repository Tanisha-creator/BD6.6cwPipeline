import express from "express";
import { getEmployees, getEmployeesById } from "./controllers/index.js";

const app = express();

app.use(express.json());

// Exercise 1: Retrieve All Employees
app.get("/employees", (req, res) => {
  let result = getEmployees();
  if (result.length === 0) {
    return res.status(404).json({ error: "Data not found!" });
  }
  res.json(result);
});

// Exercise 2: Retrieve Employee by ID
app.get("/employees/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = getEmployeesById(id);
  if (!result) {
    return res.status(404).json({ error: "Data not found!" });
  }
  res.json(result);
});

export { app };
