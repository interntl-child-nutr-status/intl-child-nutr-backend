const bcrypt = require('bcryptjs');
const db = require('../../models');
const User = require("../../models/db/users");

describe("User DB Model", () => {
  beforeAll(async done => {
    await db.seed.run()
    done()
  });
  describe("create()", () => {
    it("Creates a new user and returns that user", async () => {
      const newUser = { 
        username: "jaycannariato", 
        password: bcrypt.hashSync('password', 10),
        role_id: 2,
        country_id: 230
      }
      const ins = await User.create(newUser);
      expect(ins).toBeTruthy();
      expect(ins.username).toBe('jaycannariato');
      expect(bcrypt.compareSync('password', ins.password)).toBeTruthy();
      expect(ins.id).toEqual(expect.any(Number));
      expect(ins.role === 'Admin' || ins.role === 'User').toBeTruthy();
      expect(ins.country_code).toBe('US');
    });
  })
    const users = await User.get();
    expect(users).toEqual(expect.any(Array));
  })
  it('Returns a specific user when an ID is specified', async () => {
    const user = await User.get(1);
    expect(user).toEqual(expect.any(Object));
    expect(user.id).toEqual(1);
  })
})
  
});
