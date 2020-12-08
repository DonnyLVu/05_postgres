const pool = require('../pool.js');
// Coffee
module.exports = class Model2 {
  id;
  name;
  description;
  strength;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.strength = row.strength;
  }
  static async insert({ name, description, strength }) {
    const { rows } = await pool.query(
      `INSERT INTO model2 (name, description, strength) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, description, strength]
    );
    return new Model2(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query(`
    SELECT *
    FROM model2`);
    return rows.map(row => new Model2(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM model2
      WHERE id=$1, [id]`
    );
    if (!rows[0]) throw new Error(`No Model2 with id of ${id}`);
    return new Model2(rows[0]);
  }
  static async update(id, { name, description, strength }) {
    const { rows } = await pool.query(
      `UPDATE model2
    SET 
      name = $1,
      description = $2,
      strength = $3
    WHERE id=$4
    RETURNING *`,
      [name, description, strength, id]
    );
    return new Model2(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
      FROM model2
      Where id=$1
      RETURNING *`,
      [id]
    );
    return new Model2(rows[0]);
  }
};
