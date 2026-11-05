/**
 * Luna generated support file
 * Role: behavior patterns
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

// Month navigation for a calendar header. The wrappers below render no box of their own
// (display: contents), so the design's pixels do not change; only behavior is added.

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export type FigmaMonth = { year: number; month: number; key: string };
type Cursor = { year: number; month: number };

function parseLabel(label: string): Cursor | null {
  const match = /^([A-Za-z]+)\.? (\d{4})$/.exec(label.trim());
  if (!match) return null;
  const index = MONTHS.findIndex((m) => m.toLowerCase().startsWith(match[1].toLowerCase().slice(0, 3)));
  return index < 0 ? null : { year: Number(match[2]), month: index };
}

function toMonth(cursor: Cursor): FigmaMonth {
  return { ...cursor, key: `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}` };
}

// The current month is readable outside React so the screen's data hook can query by it.
let current: FigmaMonth | null = null;
const listeners = new Set<() => void>();

export function getFigmaMonth(): FigmaMonth | null {
  return current;
}

export function subscribeFigmaMonth(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type NavContext = {
  cursor: Cursor;
  go: (delta: number) => void;
  today: () => void;
  pick: (year: number, month: number) => void;
  openPicker: (anchor: DOMRect) => void;
};

const NavCtx = createContext<NavContext | null>(null);

export function FigmaMonthNav({ initial, children }: { initial: string; children: ReactNode }) {
  const [cursor, setCursor] = useState<Cursor>(() => parseLabel(initial) ?? { year: new Date().getFullYear(), month: new Date().getMonth() });
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [pickerYear, setPickerYear] = useState(cursor.year);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    current = toMonth(cursor);
    listeners.forEach((l) => l());
  }, [cursor]);

  useEffect(() => {
    if (!anchor) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setAnchor(null);
    };
    const onDown = (e: globalThis.MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setAnchor(null);
    };
    panel.current?.querySelector<HTMLButtonElement>("button[aria-current=true]")?.focus();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [anchor]);

  const value: NavContext = {
    cursor,
    go: (delta) => setCursor((c) => {
      const index = c.year * 12 + c.month + delta;
      return { year: Math.floor(index / 12), month: ((index % 12) + 12) % 12 };
    }),
    today: () => setCursor({ year: new Date().getFullYear(), month: new Date().getMonth() }),
    pick: (year, month) => {
      setCursor({ year, month });
      setAnchor(null);
    },
    openPicker: (rect) => {
      setPickerYear(cursor.year);
      setAnchor(rect);
    },
  };

  return (
    <NavCtx.Provider value={value}>
      {children}
      {anchor && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Choose month and year"
          style={{ position: "fixed", left: anchor.left, top: anchor.bottom + 4, zIndex: 10000 }}
          className="rounded-lg border border-black/10 bg-white p-3 text-sm text-black shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <button type="button" aria-label="Previous year" onClick={() => setPickerYear((y) => y - 1)}>&lsaquo;</button>
            <span className="font-semibold">{pickerYear}</span>
            <button type="button" aria-label="Next year" onClick={() => setPickerYear((y) => y + 1)}>&rsaquo;</button>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((name, index) => {
              const selected = pickerYear === cursor.year && index === cursor.month;
              return (
                <button
                  key={name}
                  type="button"
                  aria-current={selected}
                  className={`rounded px-2 py-1 ${selected ? "bg-black text-white" : "hover:bg-black/10"}`}
                  onClick={() => value.pick(pickerYear, index)}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </NavCtx.Provider>
  );
}

export function useFigmaMonthLabel(fallback: string): string {
  const ctx = useContext(NavCtx);
  return ctx ? `${MONTHS[ctx.cursor.month]} ${ctx.cursor.year}` : fallback;
}

export function FigmaMonthText({ children }: { children: string }) {
  return <>{useFigmaMonthLabel(children)}</>;
}

export function FigmaMonthControl({ action, children }: { action: "prev" | "next" | "today" | "picker"; children: ReactNode }) {
  const ctx = useContext(NavCtx);
  if (!ctx) return <>{children}</>;
  const run = (target: HTMLElement) => {
    if (action === "prev") ctx.go(-1);
    else if (action === "next") ctx.go(1);
    else if (action === "today") ctx.today();
    else ctx.openPicker(target.getBoundingClientRect());
  };
  const label = { prev: "Previous month", next: "Next month", today: "Today", picker: "Choose month and year" }[action];
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-haspopup={action === "picker" ? "dialog" : undefined}
      style={{ display: "contents" }}
      onClick={(e: MouseEvent<HTMLSpanElement>) => {
        const first = e.currentTarget.firstElementChild as HTMLElement | null;
        run(first ?? e.currentTarget);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const first = e.currentTarget.firstElementChild as HTMLElement | null;
          run(first ?? e.currentTarget);
        }
      }}
    >
      {children}
    </span>
  );
}
