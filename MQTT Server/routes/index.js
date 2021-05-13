var express = require('express');
const Record = require('../models/Record');
var router = express.Router();
var record = require('../models/Record');
const mqtt = require('mqtt')

const options = {
  host: '33b181fb2a7c4004a2cc08b139344d91.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: '<your-id>',
  password: '<your-password>'
}

//initialize the MQTT client
const client = mqtt.connect(options);

// Get All Records
router.get('', async (req, res) => {
  await record.find((err, result) => {
    if (err) {
      console.log(err.message);
      res.status(400);
      res.send({ message: "Something Went Wrong", error: err.message });
    } else {
      res.send({ message: "All Records", data: result });
    }
  })
});

//Post Record
router.post('', async (req, res) => {
  const record = new Record(req.body);
  const error = record.validateSync();
  if (error) return res.send({ message: 'Something Went Wrong', error: error.message });
  const tempResult = await record.save();
  if (tempResult) {
    if (client.connected)
      client.publish('Record Inserted', 'Record Id: ' + record._id);
    res.send({ message: 'Record Inserted', id: record._id });
  } else {
    res.status(400);
    res.send({ message: 'Something Went Wrong' });
  }
});

//Get Record By ID
router.get('/:id', async (req, res) => {
  Record.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(400);
      res.send({ message: "Something Went Wrong", error: err.message });
    }
    res.send({ message: "Record Retrieved", data: result });
  })
});

module.exports = router;
