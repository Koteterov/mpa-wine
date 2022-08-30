const fs = require("fs/promises");
const path = require("path");

const wines = require("../wines.json");

exports.save = (wine) => {
  wines.push({ id: Number(wines[wines.length - 1].id) + 1, ...wine });

  let data = JSON.stringify(wines, null, 4);

  return fs.writeFile(path.resolve("src", "wines.json"), data, {
    encoding: "utf-8",
  });
};

exports.getOne = (wineId) => wines.find((x) => x.id == wineId);

exports.getAll = (search = "", fromInput, toInput) => {
  const from = Number(fromInput) || 0;
  const to = Number(toInput) || 6;

  const result = wines
    .filter((x) => x.name.toLowerCase().startsWith(search.toLowerCase()))
    .filter((x) => x["market-rating"] >= from && x["market-rating"] <= to);

  return result;
};
