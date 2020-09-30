const connection = require('./connection');

class User {
  constructor({ id, email, password, name, role }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
  }

  async save() {
    const db = await connection();

    const users = await db.getTable('users');
    const savedUser = await users.insert(['name', 'email', 'password', 'role'])
      .values(this.name, this.email, this.password, this.role)
      .execute();
    return savedUser;
  }

  static async getFromDb(emailOrId) {
    const db = await connection();
    const users = await db.getTable('users');
    let user;
    if (typeof emailOrId === 'string') {
      user = await users.select()
        .where('email = :email')
        .bind('email', emailOrId)
        .execute();
    } else {
      user = await users.select()
        .where('id = :id')
        .bind('id', emailOrId)
        .execute();
    }

    const [id, name, userEmail, password, role] = user.fetchOne();
    return new User({ id, name, email: userEmail, password, role });
  }

  authenticateUser(password) {
    return this.password === password ? this : null;
  }
}

module.exports = User;
