const pool = require('../pool.js');
// Video Games
module.exports = class Model3 {
  id;
  name;
  genre;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.genre;
    this.strength = row.company;
  }
  static async insert({ name, genre, company }) {
    const { rows } = await pool.query(
      `INSERT INTO model3 (name, genre, company) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, genre, company]
    );
    return new Model3(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query(`
    SELECT *
    FROM model3`);
    return rows.map(row => new Model3(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM model2
      WHERE id=$1, [id]`
    );
    if (!rows[0]) throw new Error(`No Model3 with id of ${id}`);
    return new Model3(rows[0]);
  }
  static async update(id, { name, genre, company }) {
    const { rows } = await pool.query(
      `UPDATE model3
    SET 
      name = $1,
      genre = $2,
      company = $3
    WHERE id=$4
    RETURNING *`,
      [name, genre, company, id]
    );
    return new Model3(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
      FROM model3
      Where id=$1
      RETURNING *`,
      [id]
    );
    return new Model3(rows[0]);
  }
};
