const request = require("supertest");
const server = require("../../index");

describe("Route /api/auth", () => {
  describe("/register", () => {
    test("Returns 401 if token is not included in request header", async () => {
      const newUser = {
        username: "doesntmatter",
        password: "doesntmatter",
        role_id: 1,
        country_id: 23
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);

      expect(res.status).toBe(401);
    });
    test("Returns 403 when an non Admin attempts to use register", async () => {
      const newUser = {
        username: "doesntmatter",
        password: "doesntmatter",
        role_id: 1,
        country_id: 23
      };
      const res = await request(server)
        .post("/api/auth/register")
        .set({
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6InRlc3Rlcm9uaTIiLCJyb2xlIjoiVXNlciIsImNvdW50cnlfY29kZSI6IlVTIiwiaWF0IjoxNTU1MzY3MTI0LCJleHAiOjE1NTU0NTM1MjR9.dNsJ8tmgCDrm3yJUn0w_06P8tNHg3pjSwqT3qtFQy8U"
        })
        .send(newUser);

      expect(res.status).toBe(403);
    });
    test("Returns 201 if authorized user sends request", async () => {
      const newUser = {
        username: "shawnajean",
        password: "pass",
        role_id: 2,
        country_id: 230
      };
      const res = await request(server)
        .post("/api/auth/register")
        .set({
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im5pY2tjYW5uYXJpYXRvIiwicm9sZSI6IkFkbWluIiwiY291bnRyeV9jb2RlIjpudWxsLCJpYXQiOjE1NTUzNjkwNjksImV4cCI6MTU1NTQ1NTQ2OX0.ESrtu0nbbhl4sGsNCBekDFxjXZlhZyMsfWFM3-DANho"
        })
        .send(newUser);

      expect(res.status).toBe(201);
    });
  });
  describe("/login", () => {
    test("Returns 401 when invalid username is provided", async () => {
      const invalidUsername = {
        username: "notvalid",
        password: "password"
      };
      const res = await request(server)
        .post("/api/auth/login")
        .send(invalidUsername);

      expect(res.status).toBe(401);
    });
    test("Returns 401 when invalid password is provided", async () => {
      const invalidPassword = {
        username: "johndoe",
        password: "notvalid"
      };
      const res = await request(server)
        .post("/api/auth/login")
        .send(invalidPassword);

      expect(res.status).toBe(401);
    });
    test("Returns 200 when valid credentials are provided", async () => {
      const validUser = {
        username: "johndoe",
        password: "password",
      }
      const res = await request(server)
        .post("/api/auth/login")
        .send(validUser)

      expect(res.status).toBe(200);
    });
  });
});
