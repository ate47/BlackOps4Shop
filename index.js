const fs = require("fs");

/*******************************************************
 *             Load and prepare workspace              *
 *******************************************************/

// Create output dir
fs.mkdirSync("out", { recursive: true });

// items data
const items = JSON.parse(fs.readFileSync("raw/items.json"));

/*******************************************************
 *               Compute Reserve Numbers               *
 *******************************************************/

// count of reserve items
const reserveItems = items.reserves
  .map((item) => item.count)
  .reduce((a, b) => a + b);
// count of premium items
const shopItems = items.shop_items
  .map((item) => item.content.map((item) => item.count).reduce((a, b) => a + b))
  .reduce((a, b) => a + b);
// price of premium items
const shopItemPrices = items.shop_items
  .map((item) => item.price)
  .reduce((a, b) => a + b);
// noDupe inside premium items
const noDupeCount = items.shop_items
  .map((item) => {
    const noDupes = item.content
      .filter((it) => it.type === "nodupe")
      .map((it) => it.count);
    if (noDupes.length === 0) {
      return 0;
    }
    return noDupes.reduce((a, b) => a + b);
  })
  .reduce((a, b) => a + b);

/**
 * Compute the average reserve crates required to complete the reserve,
 * the function will assume that all the items have the same chance to
 * be in a reserve.
 * @param {number} items number of reserve items
 * @returns {number} the average crate count
 */
const countAverageCrates = (items) => {
  let c = 0;
  let total = 0.0;

  while (total < items) {
    c++;
    // probability to get an item
    const newItemProba = (items - total) / items;
    // probability to get a duplicated item
    const dupeProba = total / items;

    // add to our total the new item 1/3 for the duplicate (because after
    // 3 duplicates, we have 1 nodupe item)
    total += newItemProba + (dupeProba * 1) / 3;
  }
  return c;
};

/**
 * Same as countAverageCrates(items), but stop once we have 75% of the items,
 * we then open nodupe crates (2 crates = 1 item)
 * @param {number} items number of reserve items
 * @returns {number} the average crate count
 */
const countAverageCrates75 = (items) => {
  let c = 0;
  let total = 0.0;

  const items75 = items * 0.75;

  while (total < items75) {
    c++;
    // probability to get an item
    const newItemProba = (items - total) / items;
    // probability to get a duplicated item
    const dupeProba = total / items;

    // add to our total the new item 1/3 for the duplicate (because after
    // 3 duplicates, we have 1 nodupe item)
    total += newItemProba + (dupeProba * 1) / 3;
  }

  // required items
  const items25 = items - items75;

  // *2 because 1 item = 2 crates
  return c + items25 * 2;
};

// dumb reserve price (all reserves are bought using noDupe crates)
const fullDupePrice = reserveItems * 2;
const averageCrates = countAverageCrates(reserveItems);
const averageCrates75 = countAverageCrates75(reserveItems);

const grandTotal = shopItemPrices + averageCrates - noDupeCount * 3;
const grandTotal75 = shopItemPrices + averageCrates75 - noDupeCount * 3;
const grandTotalFP = shopItemPrices + fullDupePrice - noDupeCount * 3;

console.log("Reserves items:           " + reserveItems);
console.log("Reserves average count:   " + averageCrates);
console.log("Reserves avg 75% count:   " + averageCrates75);
console.log("Reserves full dupe count: " + fullDupePrice);
console.log("Premium items:            " + shopItems);
console.log("Premium price:            " + shopItemPrices);
console.log("Premium no dupe crates:   " + noDupeCount);
console.log("Grand total:              " + grandTotal);
console.log(
  "Grand total (75%):        " +
    grandTotal75 +
    " (-" +
    Math.floor(100 - (grandTotal75 / grandTotal) * 100) +
    "%)"
);
console.log(
  "Grand total full dupe:    " +
    grandTotalFP +
    " (+" +
    Math.floor(100 - (grandTotal / grandTotalFP) * 100) +
    "%)"
);
