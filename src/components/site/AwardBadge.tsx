import { cn } from "@/lib/utils";

/**
 * The F6S award lockup: "#2 Top Company · Research · Aug '26".
 *
 * The artwork is the awarded original, unmodified — dark type and orange
 * laurels on a transparent ground. That cannot sit directly on the ink
 * background, so it rides on a white chip, which is also how F6S badges are
 * conventionally shown. Every placement is on a dark section, so one treatment
 * covers all of them and no second artwork file is needed.
 *
 * This is the site's first <img>, so it sets the convention: an absolute
 * public path (matching GlobeScene's /earth and /models loads), the intrinsic
 * width and height as attributes so the box is reserved before the PNG
 * decodes, lazy + async decoding, and alt text that states the award rather
 * than describing the picture.
 */

/**
 * DATED CLAIM. "#2 · Aug '26" states a ranking at a point in time, not a standing
 * fact. It has exactly two homes -- the footer (which reaches every page rendering
 * the site Footer) and the Recognition strip on the landing page -- and it should not
 * be added to further surfaces: repeating one award reads as insistence, not
 * credibility. When it stops being current, update or remove BOTH the artwork and the
 * caption in that strip (src/routes/index.tsx), which repeats the rank and the date in
 * words and would otherwise go stale independently of the image.
 */

/** The F6S profile the badge links out to. */
export const F6S_PROFILE_URL = "https://www.f6s.com/indiquant";

const BADGE_SRC = "/badges/f6s-top-company-research-aug-2026.png";
const BADGE_INTRINSIC_WIDTH = 936;
const BADGE_INTRINSIC_HEIGHT = 210;
const BADGE_ALT = "F6S — ranked #2 Top Company in Research, August 2026";

type Size = "sm" | "lg";

const chipSizes: Record<Size, string> = {
  sm: "px-3 py-2",
  lg: "px-4 py-2.5 sm:px-5 sm:py-3",
};

const imageSizes: Record<Size, string> = {
  sm: "h-6 sm:h-7",
  lg: "h-8 sm:h-10",
};

export function AwardBadge({ size = "sm", className }: { size?: Size; className?: string }) {
  return (
    <a
      href={F6S_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]",
        "transition-transform duration-200 ease-[cubic-bezier(0.2,0,0.1,1)] hover:-translate-y-0.5",
        "focus-visible:ring-[3px] focus-visible:ring-[var(--mint)]/70 focus-visible:outline-none",
        chipSizes[size],
        className,
      )}
    >
      <img
        src={BADGE_SRC}
        width={BADGE_INTRINSIC_WIDTH}
        height={BADGE_INTRINSIC_HEIGHT}
        alt={BADGE_ALT}
        loading="lazy"
        decoding="async"
        className={cn("w-auto", imageSizes[size])}
      />
    </a>
  );
}
