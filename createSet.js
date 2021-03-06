require('isomorphic-fetch');
const { groupBy, uniq } = require('lodash');
const fs = require('fs');

const WEAPON = 1;
const ARMOR = 20;

const TITAN = 0;
const HUNTER = 1;
const WARLOCK = 2;

const CLASS_TYPE = {
  [TITAN]: 'Titan',
  [HUNTER]: 'Hunter',
  [WARLOCK]: 'Warlock',
};

const SET_ITEM_HASHES = [
  // 1368565477,
  // 1574678248,
  // 1665207901,
  // 2684789946,
  // 2977071352,
];

const ITEM_HASHES = [
  385045066, // Frumious Vest
  555828571, // Frumious Cloak
  3741528736, // Frumious Strides
  4224076198, // Frumious Grips
  4248632159, // Frumious Mask
  89175653, // Noble Constant Mark
  185326970, // Noble Constant Type 2
  1490387264, // Noble Constant Type 2
  2682045448, // Noble Constant Type 2
  4081859017, // Noble Constant Type 2
  868792277, // Ego Talon IV
  1532009197, // Ego Talon IV
  2615512594, // Ego Talon IV
  3081969019, // Ego Talon IV
  4285708584, // Ego Talon Bond
];

fetch('https://destiny.plumbing/2/en/raw/DestinyInventoryItemDefinition.json')
  .then(r => r.json())
  .then(itemDefs => {
    let sampleItem;
    let setItems;

    if (ITEM_HASHES.length) {
      sampleItem = { displayProperties: {} };

      setItems = ITEM_HASHES.map(itemHash => itemDefs[itemHash]);
    } else {
      sampleItem = itemDefs[SET_ITEM_HASHES[0]];

      setItems = SET_ITEM_HASHES.reduce((acc, setItemHash) => {
        const setItem = itemDefs[setItemHash];
        const items = setItem.gearset.itemList
          .map(itemHash => itemDefs[itemHash])
          .filter(Boolean);

        return acc.concat(items);
      }, []);
    }

    // console.log(sampleItem);
    // console.log(setItems);

    setItems = uniq(setItems, item => item.hash);

    const sectionItems = groupBy(setItems, item => {
      if (item.itemCategoryHashes.includes(WEAPON)) {
        return 'weapon';
      } else if (item.itemCategoryHashes.includes(ARMOR)) {
        return item.classType;
      } else {
        return 'lolidk';
      }
    });

    const sections = [
      { title: 'Weapons', items: sectionItems.weapon },
      { title: 'Hunter armor', items: sectionItems[HUNTER] },
      { title: 'Titan armor', items: sectionItems[TITAN] },
      { title: 'Warlock armor', items: sectionItems[WARLOCK] },
    ]
      .filter(({ items }) => {
        return items && items.length > 0;
      })
      .map(section => {
        const items = section.items.map(item => item.hash);
        return {
          title: section.title,
          items,
        };
      });

    const set = {
      name: sampleItem.displayProperties.name,
      description: sampleItem.displayProperties.description,
      sections,
    };

    console.log(JSON.stringify(set, null, 2));

    fs.writeFileSync('./newSet.json', JSON.stringify(set, null, 2));
  });
