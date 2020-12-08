const pool = require('../pool.js');
// Shoes
module.exports = class Model4 {
  id;
  name;
  brand;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.brand = row.brand;
    this.type = row.type;
  }
  static async insert({ name, brand, type }) {
    const { rows } = await pool.query(
      `INSERT INTO model4 (name, brand, type) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, brand, type]
    );
    return new Model4(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query(`
    SELECT *
    FROM model4`);
    return rows.map(row => new Model4(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM model4
      WHERE id=$1, [id]`
    );
    if (!rows[0]) throw new Error(`No Model4 with id of ${id}`);
    return new Model4(rows[0]);
  }
  static async update(id, { name, brand, type }) {
    const { rows } = await pool.query(
      `UPDATE model4
    SET 
      name = $1,
      brand = $2,
      type = $3
    WHERE id=$4
    RETURNING *`,
      [name, brand, type, id]
    );
    return new Model4(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
      FROM model4
      Where id=$1
      RETURNING *`,
      [id]
    );
    return new Model4(rows[0]);
  }
};
