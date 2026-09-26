/**
 * IndiQuant's public contact address.
 *
 * One constant, because the address previously differed between the contact
 * page (hello@indiquant.com, on a domain this project does not use) and the
 * footer — so the page whose whole job is to be reachable was the one surface
 * pointing somewhere else.
 */
export const CONTACT_EMAIL = "office@indiquantresearch.in";

/**
 * The Grievance Officer. The platform carries the full procedure at
 * /legal/grievance; this site names the officer and links there.
 */
export const GRIEVANCE_OFFICER = {
  name: "Diganta Sarkar",
  role: "Co-Founder & CFO",
  email: "digantasarkar@indiquantresearch.in",
} as const;
