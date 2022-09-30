const express = require('express');

const router = express.Router();
const { plainObject } = require('../utils/helpers');
const pool = require('../database/database');

router.get('/models/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ error: true, message: 'Missing id', data: [] });
      return;
    }

    const result = await pool.query('SELECT model.id, model.name FROM brand JOIN model ON brand.id = model.brandId WHERE brand.id = ?', [id]);

    res.json({ error: false, message: '', data: plainObject(result) });
  } catch (error) {
    res.status(500).send({ error: true, message: 'Internal server error', data: [] });
  }
});

router.get('/people-cars', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT person.id, car.id as carId, brand.id as brandId, model.id as modelId, person.name, person.firstname, person.lastname, person.phoneNumber, model.name as modelName, brand.name as brandName
      FROM person
      JOIN car
      ON car.personId = person.id
      JOIN model ON car.modelId = model.id
      JOIN brand ON brand.id = model.brandId
      WHERE car.active = true`,
    );

    res.json({ error: false, message: '', data: plainObject(result) });
  } catch (error) {
    res.status(500).send({ error: true, message: 'Internal server error', data: [] });
  }
});

router.get('/brands', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM brand');
    res.status(200).json({ error: false, message: '', data: plainObject(result) });
  } catch (error) {
    res.status(500).send({ error: true, message: 'Internal server error', data: [] });
  }
});

router.post('/person', async (req, res) => {
  try {
    const {
      name, firstName,
      lastName, phoneNumber,
      model,
    } = req.body;
    const { insertId: insertIdPerson } = await pool.query('INSERT INTO person (name, firstname, lastname, phoneNumber) VALUES (?, ?, ?, ?)', [name, firstName, lastName, phoneNumber]);
    await pool.query('INSERT INTO car (modelId, personId) VALUES (?, ?)', [model, insertIdPerson]);
    res.status(200).json({ error: false, message: 'Save success' });
  } catch (error) {
    res.status(500).send({ error: true, message: 'Internal server error', data: [] });
  }
});

router.delete('/people-car/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ error: true, message: 'Missing id', data: [] });
      return;
    }

    await pool.query('UPDATE car SET active = FALSE WHERE car.id = ?', [id]);

    res.json({ error: false, message: 'Deleted success', data: [] });
  } catch (error) {
    res.status(500).send({ error: true, message: 'Internal server error', data: [] });
  }
});

router.put('/people-car', async (req, res) => {
  const {
    id, name, firstName, lastName, phoneNumber, model,
  } = req.body;
  try {
    if (!id) {
      res.status(400).send({ error: true, message: 'Missing id', data: [] });
      return;
    }
    await pool.query(`
      UPDATE person
      JOIN car ON car.personId = ?
      SET person.name = ?,
          person.firstname = ?,
          person.lastname = ?,
          person.phoneNumber = ?,
          car.modelId = ?
      WHERE person.id = ?
    `, [id, name, firstName, lastName, phoneNumber, model, id]);
    res.json({ error: false, message: 'Updated success', data: [] });
  } catch (error) {
    res.status(500).send({ error: true, message: 'Internal server error', data: [] });
  }
});

module.exports = router;
