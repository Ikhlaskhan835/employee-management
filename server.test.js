
const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const app = require("./server");

test("Employee Management API tests", async (t) => {
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));

  const base = `http://127.0.0.1:${server.address().port}`;

  try {
    await t.test("Home API", async () => {
      const response = await fetch(base + "/");
      assert.equal(response.status, 200);
    });

    await t.test("Employees API", async () => {
      const response = await fetch(base + "/employees");
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.ok(Array.isArray(data));
    });

    await t.test("Health API", async () => {
      const response = await fetch(base + "/health");
      const data = await response.json();
      assert.equal(response.status, 200);
      assert.equal(data.status, "healthy");
    });
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
