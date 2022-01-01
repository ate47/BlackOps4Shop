import { mkdirSync, writeFileSync } from "fs";
import {
  items,
  reserveItems,
  averageCrates,
  averageCrates75,
  fullDupePrice,
  shopItems,
  shopItemPrices,
  noDupeCount,
  grandTotal,
  grandTotal75,
  grandTotalFP,
  typesReserve,
  typesShop,
} from "./reserves.js";

import { pie, select, arc } from "d3";

import { JSDOM } from "jsdom";

/*******************************************************
 *             Load and prepare workspace              *
 *******************************************************/

// Create output dir
mkdirSync("out", { recursive: true });

/*******************************************************
 *               Compute Reserve Numbers               *
 *******************************************************/

const stats = [
  "Reserves items:           " + reserveItems,
  "Reserves average count:   " + averageCrates,
  "Reserves avg 75% count:   " + averageCrates75,
  "Reserves full no dupe count: " + fullDupePrice,
  "Premium bundles:          " + items.shop_items.length,
  "Premium items:            " + shopItems,
  "Premium price:            " + shopItemPrices,
  "Premium no dupe crates:   " + noDupeCount,
  "Grand total:              " + grandTotal,
  "Grand total (75%):        " +
    grandTotal75 +
    " (-" +
    Math.floor(100 - (grandTotal75 / grandTotal) * 100) +
    "%)",
  "Grand total full no dupe:    " +
    grandTotalFP +
    " (+" +
    Math.floor(100 - (grandTotal / grandTotalFP) * 100) +
    "%)",
];

stats.forEach((it) => console.log(it));

/*******************************************************
 *                     D3 Graphs                       *
 *******************************************************/

const colours = [
  "#F77",
  "#7F7",
  "#77F",
  "#FF7",
  "#7FF",
  "#F7F",
  "#Faa",
  "#aFa",
  "#aaF",
  "#FFa",
  "#aFF",
  "#FaF",
  "#aaa",
  "#777",
  "#fff",
  "#F00",
  "#0F0",
  "#00F",
  "#FF0",
  "#F0F",
  "#0FF",
];
const createPie = (output, data, title) => {
  const window = new JSDOM(`<html><head></head><body></body></html>`, {
    pretendToBeVisual: true,
  }).window;

  window.d3 = select(window.document);

  const w = 625,
    h = 625;

  const arce = arc()
    .outerRadius(w / 2 - 10)
    .innerRadius(0);

  const svg = window.d3
    .select("body")
    .append("div")
    .attr("class", "container")
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", `${w * 2}`)
    .attr("height", `${h * 1.25}`)
    .append("g")
    .attr("transform", "translate(" + w + "," + (h / 2 + 48) + ")");

  svg
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("transform", "translate(-" + w + ",-" + (h / 2 + 48) + ")")
    .attr("fill", "#333");

  const pielayout = pie()
    .value(function (d) {
      return d.count;
    })
    .sort(null);
  svg
    .selectAll(".arc")
    .data(pielayout(data))
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", arce)
    .attr("fill", function (d, i) {
      return colours[i];
    })
    .attr("stroke", "#444");

  const legendG = svg
    .selectAll(".legend")
    .data(pielayout(data))
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + (-w + 30) + "," + (-data.length / 2 + i) * 35 + ")";
    })
    .attr("class", "legend");

  legendG
    .append("rect")
    .attr("width", 30)
    .attr("height", 30)
    .attr("fill", function (d, i) {
      return colours[i];
    })
    .attr("stroke", "#444");

  legendG
    .append("text")
    .text(function (d) {
      return d.data.type + ": " + d.value;
    })
    .attr("font-size", 28)
    .attr("y", 22)
    .attr("x", 36)
    .attr("fill", "#EEE");

  svg
    .append("text")
    .attr("font-size", 28)
    .text("Total: " + data.map((item) => item.count).reduce((a, b) => a + b))
    .attr(
      "transform",
      "translate(" + (-w + 30) + "," + ((data.length / 2) * 35 + 30) + ")"
    )
    .attr("fill", "#EEE");

  svg
    .append("text")
    .attr("font-size", 48)
    .text(title)
    .attr("transform", "translate(0," + (h / 2 + 48) + ")")
    .attr("text-anchor", "middle")
    .attr("fill", "#FFF");

  writeFileSync(output, window.d3.select(".container").html());
};

createPie(
  "out/typesReserve.svg",
  typesReserve,
  "Type of each item inside the reserves"
);

createPie("out/typesShop.svg", typesShop, "Type of each item inside the shop");

((output) => {
  const window = new JSDOM(`<html><head></head><body></body></html>`, {
    pretendToBeVisual: true,
  }).window;

  window.d3 = select(window.document);

  const w = 625,
    h = 625;

  const svg = window.d3
    .select("body")
    .append("div")
    .attr("class", "container")
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", `${w * 2}`)
    .attr("height", `${h * 1.25}`)
    .append("g")
    .attr("transform", "translate(" + w + "," + (h * 1.25) / 2 + ")");

  svg
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("transform", "translate(-" + w + ",-" + (h * 1.25) / 2 + ")")
    .attr("fill", "#333");

  stats.forEach((line, index) => {
    svg
      .append("text")
      .attr("font-size", 28)
      .text(line)
      .attr(
        "transform",
        "translate(0," + (-stats.length / 2 + index) * 40 + ")"
      )
      .attr("text-anchor", "middle")
      .attr("fill", "#FFF");
  });
  writeFileSync(output, window.d3.select(".container").html());
})("out/stats.svg");
