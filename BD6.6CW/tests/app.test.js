let { getEmployees, getEmployeesById } = require("../controllers");

const { app } = require("../index");
let request = require("supertest");
let http = require("http");
const { beforeEach } = require("node:test");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getEmployees: jest.fn(),
  getEmployeesById: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});
afterAll((done) => {
  server.close(done);
});

describe("APIs test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all employees", async () => {
    let mockData = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];
    getEmployees.mockReturnValue(mockData);
    let res = await request(server).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body).toEqual(mockData);
  });

  it("should get the employee by id", async () => {
    let mockData = {
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    };
    getEmployeesById.mockReturnValue(mockData);
    let res = await request(server).get("/employees/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });
});

describe("function mock test", () => {
  it("getEmployees should get list of employees", () => {
    let mockData = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
    ];
    getEmployees.mockReturnValue(mockData);
    let result = getEmployees();
    expect(result).toEqual(mockData);
    expect(result.length).toBe(2);
  });
});
