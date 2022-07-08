import bcrypt from 'bcryptjs';

import Database from '../database/database.js';

const salt = 10;

async function create(user) {
  const db = await Database.connect();

  console.log(user)

  const {email, password} = user;

  const hash = bcrypt.hashSync(password, salt);

  const sql = `
    INSERT INTO
      users (email, password)
    VALUES
      (?, ?)
  `;

  const {lastID} = await db.run(sql, [email, hash]);

  return read(lastID);
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM 
      users
    WHERE
      id = ?
  `;

  const user = await db.get(sql, [id]);

  return user;
}

export default { create, read };