const express = require('express')

const db = require('../db/produce_available_months')

const router = express.Router()
const path = require('path')
const fs = require('fs').promises

const dataFilePath = path.join(
  __dirname,
  '../public/data/produce_available_months.json'
)
const produceNameToImageMapping = {
  Apples: '/images/apple.jpg',
  // 'Apples - Royal Gala': '/images/apple.jpg',
  // 'Apples - Braeburn': '/images/apple.jpg',
  // 'Apples - Granny Smith': '/images/apple.jpg',
  Apricots: 'images/apricot.jpg',
  Avocado: 'images/avocado.jpg',
  'Artichokes - Globe': 'images/artichoke-globe.jpg',
  'Artichokes - Jerusalem': 'images/artichoke-jerusalem.jpg',
  Asparagus: 'images/asparagus.jpg',
  Beans: 'images/beans.jpg',
  Beetroot: 'images/beetroot.png',
  Blackberries: '/images/blackberries.jpeg',
  Blackcurrants: '/images/blackcurrants.jpeg',
  Blueberries: 'images/blueberry.jpg',
  Boysenberries: 'images/boysenberries.jpeg',
  'Brussels Sprouts': 'images/brussels-sprouts.jpg',
  'Buttercup Squash': 'images/buttercup.jpg',
  Butternut: 'images/butternut.jpg',
  Capsicum: 'images/capsicum.png',
  Cherries: 'images/cherry.jpg',
  Chilli: 'images/chilli.jpg',
  Courgette: 'images/courgettes.png',
  Eggplant: 'images/aubergine.png',
  Feijoas: 'images/feijoa.jpg',
  Fennel: 'images/fennel.jpg',
  Gooseberries: 'images/gooseberries.jpeg',
  'Grapes - Black': 'images/grapes.jpg',
  'Grapes - Green': 'images/grapes-green.jpg',
  Grapefruit: 'images/grapefruit.jpg',
  'Honeydew Melon': 'images/honeydew-melon.png',
  Kiwiberries: 'images/kiwiberries.jpg',
  'Kiwifruit - Gold': 'images/gold-kiwifruit.jpg',
  'Kiwifruit - Green': 'images/kiwifruit.jpg',
  Kohlrabi: 'images/kohlrabi.jpg',
  Leeks: 'images/leeks.jpg',
  Lemons: 'images/lemons.jpg',
  Lime: 'images/limes.jpeg',
  Mandarins: 'images/mandarin.jpeg',
  Mango: 'images/mango.jpg',
  'Nashi Pears': 'images/nashipear.jpg',
  Nectarines: 'images/nectarine.jpeg',
  'Oranges - Navel': 'images/orangenavel.jpg',
  'Oranges - Valencia': 'images/orange.png',
  Parsnip: 'images/parsnip.jpg',
  Passionfruit: 'images/passionfruit.jpg',
  Peaches: 'images/peaches.jpeg',
  Pears: 'images/pears.jpg',
  'Peas - Green': 'images/pea.jpg',
  Persimmons: 'images/persimmon.jpg',
  Plums: 'images/plums.jpg',
  Raspberries: 'images/raspberries.jpeg',
  Redcurrants: 'images/redcurrants.jpeg',
  Rhubarb: 'images/rhubarb.jpg',
  'Rock Melon': 'images/rock-melon.png',
  'Snow Peas': 'images/snow-pea.jpg',
  Strawberries: 'images/strawberry.jpg',
  Swedes: 'images/swede.jpg',
  Sweetcorn: 'images/corn.jpg',
  'Taewa (Māori Potato)': 'images/taewa.jpg',
  Tamarillos: 'images/tamarillo.jpg',
  Tangelos: 'images/tangelo.jpg',
  Turnips: 'images/turnip.jpg',
  Watercress: 'images/watercress.jpg',
  Watermelon: 'images/watermelon.jpg',
  Witloof: 'images/witloof.jpg',
  Yams: 'images/yam.jpg',
}

// ** this gets data from the database, which only works in local development but not in production
// router.get('/season/:season', async (req, res) => {
//   try {
//     const result = await db.readAvailabilityBySeason(req.params.season)
//     res.json(result)
//   } catch (err) {
//     res.status(500).send(err.message)
//   }
// })

async function readDataFile() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading data file:', err)
  }
}

async function getProduceByMonths(months) {
  const produceData = await readDataFile()

  // Get produce names for the specified months
  const produceSet = new Set()

  months.forEach((month) => {
    const produceForMonth = produceData[month.toString()]
    if (produceForMonth) {
      produceForMonth.forEach((produceName) => produceSet.add(produceName))
    }
  })

  const produceMap = new Map()

  // Process each produce item
  Array.from(produceSet).forEach((name) => {
    // Extract base name (remove variety info)
    const baseName = name
      .split(' - ')[0]
      .replace(/\s\(.*\)$/, '')
      .toLowerCase()

    // Use the mapping for image_url
    const imageUrl = produceNameToImageMapping[name]

    // Add or replace the produce in the map if it's the first time we're seeing this base produce,
    // or if it's the generic version (without a specific variety)
    if (!produceMap.has(baseName) || !name.includes(' - ')) {
      produceMap.set(baseName, {
        name: baseName,
        display_name: name.includes(' - ') ? name.split(' - ')[0] : name,
        image_url: imageUrl,
      })
    }
  })

  // Convert map values to array and sort alphabetically
  return Array.from(produceMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}

async function getAvailableProduceBySeason(season) {
  switch (season) {
    case 'summer':
      return getProduceByMonths([12, 1, 2])
    case 'autumn':
      return getProduceByMonths([3, 4, 5])
    case 'winter':
      return getProduceByMonths([6, 7, 8])
    case 'spring':
      return getProduceByMonths([9, 10, 11])
    default:
      return getProduceByMonths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  }
}

router.get('/season/:season', async (req, res) => {
  try {
    const season = req.params.season
    const result = await getAvailableProduceBySeason(season)
    res.json(result)
  } catch (err) {
    console.error('Error:', err)
    res.status(500).send(err.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await db.readAllAvailable()
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await db.readOneAvailability(parseInt(req.params.id))
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const response = await db.createAvailability(req.body)
    const newAvailability = await db.readOneAvailability(response)
    res.json(newAvailability)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    await db.updateAvailability(req.body, parseInt(req.params.id))
    const updatedResp = await db.readOneAvailability(parseInt(req.params.id))
    res.json(updatedResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const availabilityDeletedResp = await db.deleteAvailability(
      parseInt(req.params.id)
    )
    res.json(availabilityDeletedResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/month/:month', async (req, res) => {
  try {
    const result = await db.readAvailabilityForMonth(req.params.month)
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/produce/:produce_id', async (req, res) => {
  try {
    const result = await db.readAvailabilityForProduceId(req.params.produce_id)
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
