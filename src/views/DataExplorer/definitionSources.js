const src = (url, name, ...fields) => ({ url, name, fields });

export default [
  src(
    '/en/raw/DestinyInventoryItemDefinition.json',
    'Item',
    'itemHash',
    'singleInitialItemHash',
    'plugItemHash'
  ),

  src(
    '/en/raw/DestinyInventoryBucketDefinition.json',
    'InventoryBucket',
    'bucketTypeHash',
    'recoveryBucketTypeHash'
  ),

  src(
    '/en/raw/DestinyItemTierTypeDefinition.json',
    'ItemTierType',
    'tierTypeHash'
  ),

  src('/en/raw/DestinyStatDefinition.json', 'Stat', 'statHash', 'statTypeHash'),

  src('/en/raw/DestinyLoreDefinition.json', 'Lore', 'loreHash'),

  src(
    '/en/raw/DestinyProgressionLevelRequirementDefinition.json',
    'ProgressionLevelRequirement',
    'progressionLevelRequirementHash'
  ),

  src(
    '/en/raw/DestinyItemCategoryDefinition.json',
    'ItemCategory',
    'itemCategoryHashes'
  ),

  src(
    '/en/raw/DestinySocketCategoryDefinition.json',
    'SocketCategory',
    'socketCategoryHash'
  ),

  src(
    '/en/raw/DestinySocketTypeDefinition.json',
    'SocketType',
    'socketTypeHash'
  ),

  src(
    '/en/raw/DestinyTalentGridDefinition.json',
    'TalentGrid',
    'talentGridHash'
  ),
];
