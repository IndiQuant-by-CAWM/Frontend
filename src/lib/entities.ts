/**
 * The two legal entities, and which audience each one faces.
 *
 * Contributors contract with the US company: the contributor agreement, the
 * signal licence and the platform terms are IndiQuant Inc.'s. Investors and
 * clients deal with the Indian company. One constant each, because an address
 * retyped on three surfaces is an address that differs on one of them.
 */
export const CONTRIBUTOR_ENTITY = {
  name: "IndiQuant Inc.",
  audience: "Contributors and the platform",
  lines: ["262 Chapman Rd, Ste 240 #28604", "Newark, Delaware 19702", "United States of America"],
} as const;

export const INVESTOR_ENTITY = {
  name: "Indiquant Private Limited",
  audience: "Investors and clients",
  lines: ["Sundar CHS, Sector 9, Koparkhairane", "Navi Mumbai, Maharashtra 400709", "India"],
} as const;

export const ENTITIES = [CONTRIBUTOR_ENTITY, INVESTOR_ENTITY] as const;
