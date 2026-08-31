/**
 * First focusable element on every page: lets a keyboard or screen-reader user
 * jump past the navigation straight to the content. Hidden until focused.
 */
export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-[10px] focus:bg-[var(--mint)] focus:px-4 focus:py-3 focus:font-bold focus:text-[var(--blue)] focus:outline-none"
    >
      Skip to content
    </a>
  );
}
