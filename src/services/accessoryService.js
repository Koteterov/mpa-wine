const Accessory = require("../models/Accessory");

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAll = (ids) => Accessory.find({_id: {$nin: ids}})