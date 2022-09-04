const path = require("path");
const Wine = require("../models/Wine")

const Accessory = require("../models/Accessory")

exports.create = (wine) => Wine.create(wine);

exports.getOne = (wineId) => Wine.findById(wineId).populate('accessories').lean();

exports.getAll = async () => {
  // search = "", fromInput, toInput

  let wines = await Wine.find().lean()

  return wines

  
  // const from = Number(fromInput) || 0;
  // const to = Number(toInput) || 6;

  // const result = wines
  //   .filter((x) => x.name.toLowerCase().startsWith(search.toLowerCase()))
  //   .filter((x) => x["market-rating"] >= from && x["market-rating"] <= to);

  // return result;
};

exports.attachAccessory = async (wineId, accId) => {
  const wine = await Wine.findById(wineId) 
  const accessory = await Accessory.findById(accId)

  wine.accessories.push(accessory)
  accessory.wines.push(wine)

  await wine.save()
  await accessory.save()
}