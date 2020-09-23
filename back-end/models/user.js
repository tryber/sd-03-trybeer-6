const connection = require('./connection');

class User {
  constructor({ email, password, name, role }) {
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

  static async getFromDb(email) {
    const db = await connection();
    const users = await db.getTable('users');
    const user = await users.select()
      .where('email = :email')
      .bind('email', email)
      .execute();

    const [id, name, userEmail, password, role] = user.fetchOne();
    return new User({ id, name, email: userEmail, password, role });
  }

  authenticateUser(password) {
    return this.password === password ? this : null;
  }
}

module.exports = User;
