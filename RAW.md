# Raw version

- [Raw version](#raw-version)
  - [Schema](#schema)
    - [type_of_item](#type_of_item)
    - [Name of operator](#name-of-operator)

The raw version is located in [the `raw/items.json` file](raw/items.json)

## Schema

```json
{
  "shop_items": [
    {
      "price": 0,
      "name": "name of the item",
      "content": [
        {
          "type": "type_of_item",
          "count": 0,
          "typeinfo": "type_of_item_info"
        }
      ]
    }
  ],
  "reserves": [
    {
      "type": "type_of_item",
      "typeinfo": "type_of_item_info",
      "count": 0,
      "name": "name of the items"
    }
  ]
}
```

### type_of_item

This field describes the type of an item, the `typeinfo` field can be omitted if no additional information are present.

| Value       | Description            | `typeinfo` value                         |
| ----------- | ---------------------- | ---------------------------------------- |
| skin_head   | Skin, head part        | name of the operator                     |
| skin_body   | Skin, body part        | name of the operator                     |
| character   | Blackout Character     |                                          |
| jump_pack   | Blackout jump pack     |                                          |
| gesture     | Gesture                |                                          |
| stick       | A sticker or an emblem | `set` if from a set, `global` for others |
| weapon      | Base weapon            |                                          |
| mkii        | MKII weapon            |                                          |
| mastercraft | Mastercraft            |                                          |
| camo        | Camo                   | `reactive` or `basic`                    |
| charm       | Charm                  |                                          |
| effect      | Death Effect           |                                          |

### Name of operator

The operator name are common for the zombies, only the mp ones are distinct.

```json
[
  "ajax",
  "battery",
  "crash",
  "firebreak",
  "nomad",
  "prophet",
  "recon",
  "ruin",
  "seraph",
  "torque",
  "zero",
  "outrider",
  "spectre",
  "reaper",
  "zombies"
]
```
