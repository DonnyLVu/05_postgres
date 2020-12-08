const pool = require('../pool.js');
// Animals
module.exports = class Model1 {
  id;
  name;
  description;
  kingdom;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.kingdom = row.kingdom;
  }
  static async insert({ name, description, kingdom }) {
    const { rows } = await pool.query(
      `INSERT INTO model1 (name, description, kingdom) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, description, kingdom]
    );
    return new Model1(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query(`
    SELECT *
    FROM model1`);
    return rows.map(row => new Model1(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM model1
      WHERE id=$1, [id]`
    );
    if (!rows[0]) throw new Error(`No Model1 with id of ${id}`);
    return new Model1(rows[0]);
  }
  static async update(id, { name, description, kingdom }) {
    const { rows } = await pool.query(
      `UPDATE model1
    SET 
      name = $1,
      description = $2,
      kingdom = $3
    WHERE id=$4
    RETURNING *`,
      [name, description, kingdom, id]
    );
    return new Model1(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
      FROM model1
      Where id=$1
      RETURNING *`,
      [id]
    );
    return new Model1(rows[0]);
  }
};
