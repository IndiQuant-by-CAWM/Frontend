/**
 * One company, two locations. INDIQUANT INC. (Delaware) is the parent; its
 * registered office is in Newark, Delaware. Indiquant Private Limited (Navi
 * Mumbai) is the Indian subsidiary and the India office. Contributors contract
 * with the US company: the platform terms are INDIQUANT INC.'s.
 *
 * Only what is stated here is said about either entity on this site. The one
 * registration number recorded is the Indian company's CIN; there are no
 * licences or fund vehicles, and none should be added.
 *
 * One constant each, because an address retyped on three surfaces is an
 * address that differs on one of them.
 */
export const HQ = {
  role: "Registered office (Delaware)",
  name: "INDIQUANT INC.",
  city: "Newark, Delaware",
  lines: ["262 Chapman Rd, Ste 240 #28604", "Newark, Delaware 19702", "United States of America"],
  dealsWith: "Contributors and the platform",
} as const;

export const INDIA_OFFICE = {
  role: "India office",
  name: "Indiquant Private Limited",
  city: "Navi Mumbai",
  cin: "U72200MR2026PTC473602",
  region: "Navi Mumbai, Maharashtra, India",
  lines: ["Sundar CHS, Sector 9, Koparkhairane", "Navi Mumbai, Maharashtra 400709", "India"],
  dealsWith: "Partnerships and research enquiries",
} as const;

export const OFFICES = [HQ, INDIA_OFFICE] as const;
