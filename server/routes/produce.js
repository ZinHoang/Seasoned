const express = require('express')

const db = require('../db/produce')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.readProduce()
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const response = await db.createProduce(req.body)
    const allProduceResp = await db.readProduce()
    res.json(allProduceResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, display_name, type, image } = req.body

  const produceData = {
    id,
    name,
    display_name,
    type,
    image,
  }

  try {
    const response = await db.updateProduce(produceData, id)
    const updatedResp = await db.readOneProduce(id)
    res.json(updatedResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/:id', async (req, res) => {
  const deletedProduceId = req.params.id
  console.log(deletedProduceId)

  try {
    const produceDeletedResp = await db.deleteProduce(deletedProduceId)
    res.json(produceDeletedResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
