import Database from './database.js'

async function up() {
  const db = await Database.connect();

  const categoriesSql = `
    CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) NOT NULL
    )
  `;

  db.run(categoriesSql);

  const fichasSql = `
    CREATE TABLE fichas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) NOT NULL,
      personagem VARCHAR(20) NOT NULL,
      category_id INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `;
  const usersSql = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL
    )
  `;

  db.run(fichasSql);
  db.run(usersSql);
}

export default { up };