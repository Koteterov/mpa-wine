const path = require("path");
const Wine = require("../models/Wine");

const Accessory = require("../models/Accessory");

exports.create = (wine) => Wine.create(wine);

exports.edit = (wineId, wineData) => Wine.findByIdAndUpdate(wineId, wineData);

exports.delete =(wineId) => Wine.findByIdAndDelete(wineId);

exports.getOne = (wineId) =>
  Wine.findById(wineId).populate("accessories").lean();

exports.getAll = async (search = "", fromInput, toInput) => {
  const from = Number(fromInput) || 0;
  const to = Number(toInput) || 6;

  // let wines = await Wine.find({name: { $regex: new RegExp("^" + search, 'i') }})
  let wines = await Wine.find()
    .where("name", new RegExp("^" + search, "i"))
    .where("market-rating")
    .gte(from)
    .lte(to)
    .lean();

  return wines;
};

exports.attachAccessory = async (wineId, accId) => {
  const wine = await Wine.findById(wineId);
  const accessory = await Accessory.findById(accId);

  console.log('wine', wine);

  wine.accessories.push(accessory);
  accessory.wines.push(wine);

  await wine.save();
  await accessory.save();
};

