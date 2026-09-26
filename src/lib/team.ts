/**
 * The people behind IndiQuant, stated once for /about, /investors and the
 * structured data in __root.tsx.
 *
 * Photos are the public GitHub avatars of each person's own account
 * (github.com/myselfRaifMondal, github.com/Dig1nt1), resized to 400x400 and kept
 * in public/team/. Add nothing here that the person has not published.
 */
export type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  photo: string;
  alt: string;
};

export const FOUNDER: TeamMember = {
  name: "Raif Mondal",
  role: "Founder & CEO",
  linkedin: "https://linkedin.com/in/raifmondal",
  photo: "/team/raif-mondal.jpg",
  alt: "Raif Mondal, Founder and CEO of IndiQuant, smiling outdoors in a grey jacket",
};

export const CO_FOUNDER: TeamMember = {
  name: "Diganta Sarkar",
  role: "Co-Founder & CFO",
  linkedin: "https://linkedin.com/in/dig1nt1",
  photo: "/team/diganta-sarkar.jpg",
  alt: "Diganta Sarkar, Co-Founder and CFO of IndiQuant, in a white shirt",
};

export const TEAM: readonly TeamMember[] = [FOUNDER, CO_FOUNDER];
