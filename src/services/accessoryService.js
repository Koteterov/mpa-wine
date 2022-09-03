const Accessory = require("../models/Accessory");

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAllAvailable = (ids) => Accessory.find({ _id: { $nin: ids } });

exports.getAllAttached = (ids) => Accessory.find({ _id: { $in: ids } });
