/** luna-spec-codegen: owned-layout */
import { useMemo, useState } from "react";
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaSection_n_3047_21238 } from "./FigmaSection_n_3047_21238";
import { FigmaSection_n_3047_21248 } from "./FigmaSection_n_3047_21248";
import { FigmaSection_n_3047_21251 } from "./FigmaSection_n_3047_21251";
import { FigmaSection_n_3047_21253 } from "./FigmaSection_n_3047_21253";
import { FigmaSection_n_3047_21332 } from "./FigmaSection_n_3047_21332";
import { FigmaSection_n_3047_21439 } from "./FigmaSection_n_3047_21439";
import { FigmaSection_n_3047_21443 } from "./FigmaSection_n_3047_21443";
import { FigmaSection_n_3047_21857 } from "./FigmaSection_n_3047_21857";
import { FigmaSection_n_3361_5525 } from "./FigmaSection_n_3361_5525";
import { FigmaSection_n_3047_21447 } from "./FigmaSection_n_3047_21248";

const CARD_LABELS = [
  "Instagram Reel",
  "Instagram Stories",
  "Instagram Feed",
  "Hates to see me coming",
  "Justin Bieber Trend",
] as const;

const INITIAL_VISIBLE_CARDS = 8;
const LOAD_MORE_STEP = 4;

export function FigmaContentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCardCount, setVisibleCardCount] = useState(INITIAL_VISIBLE_CARDS);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCardCount = useMemo(() => {
    if (!normalizedQuery) {
      return CARD_LABELS.length;
    }
    return CARD_LABELS.filter((label) =>
      label.toLowerCase().includes(normalizedQuery),
    ).length;
  }, [normalizedQuery]);

  const isEmpty = normalizedQuery.length > 0 && filteredCardCount === 0;

  function handleLoadMore() {
    setVisibleCardCount((count) => count + LOAD_MORE_STEP);
  }

  return (
    <div
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isEmpty
          ? "No content matches your search."
          : `Showing up to ${visibleCardCount} content items.`}
      </div>
      <div className="sr-only">
        <label htmlFor="content-library-search">Search content</label>
        <input
          id="content-library-search"
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setVisibleCardCount(INITIAL_VISIBLE_CARDS);
          }}
        />
        <button
          type="button"
          onClick={handleLoadMore}
          aria-label="Load more content"
          className="bg-surface text-text-on-light"
        />
      </div>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={2541} nodeId="3047:21237">
          <FigmaSection_n_3047_21447 />
          <FigmaSection_n_3047_21238 />
          <FigmaSection_n_3047_21248 />
          <FigmaSection_n_3047_21251 />
          <FigmaSection_n_3047_21439 />
          <FigmaSection_n_3047_21332 />
          <div
            className="contents"
            style={
              isEmpty
                ? { visibility: "hidden", pointerEvents: "none" }
                : undefined
            }
            aria-hidden={isEmpty}
          >
            <FigmaSection_n_3047_21253 />
          </div>
          <FigmaSection_n_3047_21443 onLoadMore={handleLoadMore} />
          <FigmaSection_n_3047_21857 />
          <FigmaSection_n_3361_5525 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}
