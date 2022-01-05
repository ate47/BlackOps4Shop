# Values

- [Values](#values)
  - [Shop items](#shop-items)
  - [Reserve items](#reserve-items)
  - [Stats](#stats)
  - [Why 75%?](#why-75)

## Shop items

![shop image](https://github.com/ate47/BlackOps4Shop/blob/output/typesShop.svg)

## Reserve items

![reserve image](https://github.com/ate47/BlackOps4Shop/blob/output/typesReserve.svg)

## Stats

![stats image](https://github.com/ate47/BlackOps4Shop/blob/output/stats.svg)

- **Reserves items**: Number of items in the reserves
- **Reserves average count**: Average number of reserves required to complete all the reserves\*
- **Reserves avg 75% count**: Average number of reserves required to complete all the reserves, by using nodupe crates after owning 75% of the reserves, see [Why 75%?](#why-75)\*
- **Reserves full no dupe count**: Number of reserves required to complete all the reserves by only using nodupe crates
- **Premium bundles**: Number of bundles in the shop\*\*
- **Premium items**: Number of items in the bundles in the shop\*\*
- **Premium price**: Total price of the bundles\*\*
- **Premium no dupe crates**: Number of no dupe crates inside the bundles\*\*
- **Grand total**: Average number required to complete the black market \*\*,\*
- **Grand total (75%)**: Average number required to complete the black market, by using nodupe crates after owning 75% of the reserves, see [Why 75%?](#why-75) \*\*,\*
- **Grand total full no dupe**: Number required to complete the black market by only using nodupe crates to get reserves. \*\*

\* - Average numbers are assuming that all the items have the same chance to drop.
\*\* - without counting old season items

## Why 75%?

Why is it better to use nodupe crates **ONLY** after owning _75%_ of the reserves?

_We will assume that all the items have the same probability to drop._

let **items** be the number of items we own.
let **total** be the number of items in the reserves.

when we are opening a reserve, we have 2 values:

```python
proba_dupe = items / total
proba_item = 1 - proba_dupe
```

so we can combine these two values to get the average number of reserve we have by opening a crate

```python
item = proba_item + proba_dupe * 1/3
item = 1 - proba_dupe + proba_dupe * 1/3
```

by opening a nodupe crate with the cost of 2 crates, we will earn 1 items. So we have `item = 1/2`, what we want is to know the maximum value of items before

```python
item <= 1/2
1 - proba_dupe + proba_dupe * 1/3 <= 1/2
-proba_dupe * 2/3 <= -1/2
proba_dupe >= 3/4
items / total >= 3/4
items >= total * 3/4
```

So we have to have at least `3/4 = 75%` of the items to start opening no dupe crates. QED.
