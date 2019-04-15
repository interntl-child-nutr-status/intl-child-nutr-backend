const User = require('../../models/db/users');

describe('User DB Model', () => {
  it('Returns an array of users from the database', async () => {
    const users = await User.get();
    expect(users).toEqual(expect.any(Array));
  })
  it('Returns a specific user when an ID is specified', async () => {
    const user = await User.get(1);
    expect(user).toEqual(expect.any(Object));
    expect(user.id).toEqual(1);
  })
})