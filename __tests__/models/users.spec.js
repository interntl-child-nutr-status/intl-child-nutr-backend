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
  describe("get()", () => {
    it("Returns an array of users from the database", async () => {
      const users = await User.get();
      expect(users).toEqual(expect.any(Array));
    });
    it("Returns a specific user when an ID is specified", async () => {
      const user = await User.get({ 'u.id': 1 });
      expect(user).toEqual(expect.any(Object));
      expect(user.id).toEqual(1);
    });
    it("Returns the username & password for bcrypt comparison", async () => {
      const user = await User.get({ 'u.id': 1});
      expect(user.username).not.toBeNull();
      expect(user.password).not.toBeNull();
    });
  });
  describe("update()", () => {
    it("Updates the username as expected", async () => {
      const user = await User.get({ 'u.id': 1 })
      const updatedUser = await User.update(1, { 'username': "banana" });
      expect(updatedUser.username).toBe('banana');
      expect(user.username).not.toBe(updatedUser.username);
    });
    it("Updates the password as expected", async () => {
      const user = await User.get({'u.id': 1})
      const updatedUser = await User.update(1, { 
        password: bcrypt.hashSync('banana', 10) 
      });
      expect(bcrypt.compareSync('banana', updatedUser.password)).toBeTruthy()
      expect(bcrypt.compareSync(user.password, updatedUser.password)).not.toBeTruthy();
    });
  });
  describe('remove()', () => {
    it('Deletes a specified user', async () => {
      const usersList = await User.get()
      const userToDelete = await User.get({ 'u.username': 'jaycannariato' })
      const deletion = await User.remove({ username: 'jaycannariato' });
      const newUsersList = await User.get();
  
      expect(userToDelete.username).toBe('jaycannariato');
      expect(deletion).toBe(1);
      expect(newUsersList.length).toBeLessThan(usersList.length);
      
    })
  })
  
});
