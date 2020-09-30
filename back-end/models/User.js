const connection = require('./connection');

async function verifyUserInDb(emailOrId) {
  const db = await connection();
  const users = await db.getTable('users');
  let user;
  if (!parseInt(emailOrId, 10)) {
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

  return !!user.fetchOne();
}

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
    let savedUser;

    if (await verifyUserInDb(this.id)) {
      savedUser = await users.update()
        .set('name', this.name)
        .set('email', this.email)
        .set('password', this.password)
        .set('role', this.role)
        .where('id = :id')
        .bind('id', this.id)
        .execute();
    } else {
      savedUser = await users.insert(['name', 'email', 'password', 'role'])
        .values(this.name, this.email, this.password, this.role)
        .execute();
    }
    return savedUser;
  }

  static async getFromDb(emailOrId) {
    const db = await connection();
    const users = await db.getTable('users');
    let user;
    if (!parseInt(emailOrId, 10)) {
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
