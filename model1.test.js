const fs = require('fs');
const pool = require('./lib/utils/pool.js');
const request = require('supertest');
const app = require('./lib/utils/app.js');
const Model = require('./lib/utils/models/model1.js');


// Foods courtesy of random food generator
describe('app tests for animals', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('creates a animal', async () => {
    const res = await request(app)
      .post('/models')
      .send({
        name: 'cat',
        description: 'cat should go here',
        kingdom: 'cat kingdom'
      });
    expect(res.body).toEqual({
      id: '1',
      name: 'cat',
      description: 'cat should go here',
      kingdom: 'cat kingdom'
    });
  });

  it('Gets ALL Animals', async () => {
    const model = await Model.insert({ name: 'cat', description: 'cat should go here', kingdom: 'cat kingdom' });
    const res = await request(app)
      .get('/models');
    expect(res.body).toEqual([model]);
  });

  it('Get Food by id', async () => {
    const model = await Model.insert({ name: 'fox', description: 'fox should go here', kingdom: 'fox kingdom' });
    const res = await request(app)
      .get(`/models/${model.id}`);
    expect(res.body).toEqual(model);
  });

  it('updates a animal', async () => {
    const model = await Model.insert({ name: 'dog', description: 'dog should go here', kingdom: 'dog kingdom' });
    const res = await request(app)
      .put(`/models/${model.id}`)
      .send({
        name: 'pig',
        description: 'pig should go here',
        kingdom: 'pig'
      });
    expect(res.body).toEqual({
      ...model,
      name: 'pig',
      description: 'pig should go here',
      kingdom: 'pig'
    });
  });

  it('deletes a animal using id', async () => {
    const model = await Model.insert({ name: 'bird', description: 'bird should go here', kingdom: 'bird kingdom' });

    const res = await request(app)
      .delete(`/models/${model.id}`);

    expect(res.body).toEqual({
      ...model,
      name: 'bird',
      description: 'bird should go here',
      kingdom: 'bird kingdom'
    });
  });
});
