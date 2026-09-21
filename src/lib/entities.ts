/**
 * One company, two locations. INDIQUANT INC. (Delaware) is the parent and the
 * headquarters; Indiquant Private Limited (Navi Mumbai) is the fund entity and
 * the India office. Contributors contract with the US company (the
 * contributor agreement, the signal licence and the platform terms are
 * INDIQUANT INC.'s); investors and clients deal with the Indian company.
 * One constant each, because an address retyped on three surfaces is an
 * address that differs on one of them.
 */
export const HQ = {
  role: "Headquarters",
  name: "INDIQUANT INC.",
  city: "Newark, Delaware",
  lines: ["262 Chapman Rd, Ste 240 #28604", "Newark, Delaware 19702", "United States of America"],
  dealsWith: "Contributors and the platform",
} as const;

export const INDIA_OFFICE = {
  role: "India office (fund entity)",
  name: "Indiquant Private Limited",
  city: "Navi Mumbai",
  lines: ["Sundar CHS, Sector 9, Koparkhairane", "Navi Mumbai, Maharashtra 400709", "India"],
  dealsWith: "Investors and clients",
} as const;

export const OFFICES = [HQ, INDIA_OFFICE] as const;
