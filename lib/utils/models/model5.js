const pool = require('../pool.js');
// Foods
module.exports = class Model5 {
  id;
  name;
  taste;
  complexity;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.taste = row.taste;
    this.complexity = row.complexity;
  }
  static async insert({ name, taste, complexity }) {
    const { rows } = await pool.query(
      `INSERT INTO model4 (name, taste, complexity) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, taste, complexity]
    );
    return new Model5(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query(`
    SELECT *
    FROM model5`);
    return rows.map(row => new Model5(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM model5
      WHERE id=$1, [id]`
    );
    if (!rows[0]) throw new Error(`No Model5 with id of ${id}`);
    return new Model5(rows[0]);
  }
  static async update(id, { name, taste, complexity }) {
    const { rows } = await pool.query(
      `UPDATE model5
    SET 
      name = $1,
      taste = $2,
      complexity = $3
    WHERE id=$4
    RETURNING *`,
      [name, taste, complexity, id]
    );
    return new Model5(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
      FROM model5
      Where id=$1
      RETURNING *`,
      [id]
    );
    return new Model5(rows[0]);
  }
};
