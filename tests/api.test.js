const request = require("supertest");
const app = require("../src/index");

describe("GET /health", () => {
  test("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptime).toBe("number");
  });
});

describe("GET /api/math", () => {
  test("adds two numbers by default", async () => {
    const res = await request(app).get("/api/math?a=5&b=3");
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  test("multiplies when op=multiply", async () => {
    const res = await request(app).get("/api/math?a=4&b=6&op=multiply");
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(24);
  });

  test("divides when op=divide", async () => {
    const res = await request(app).get("/api/math?a=10&b=2&op=divide");
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test("returns 400 for invalid numbers", async () => {
    const res = await request(app).get("/api/math?a=foo&b=3");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid numbers");
  });
});

describe("GET /api/greet/:name", () => {
  test("returns greeting for valid name", async () => {
    const res = await request(app).get("/api/greet/Krish");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello, Krish!");
  });
});
