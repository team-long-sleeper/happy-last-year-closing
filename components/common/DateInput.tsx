"use client";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { enUS } from "date-fns/locale";
import useEpisodeDataStore from "@/stores/add-/episodeDataStore";

type InputProps = {
  placeholder?: string;
};

export function formatSingleDate(date: Date) {
  return format(date, "MMMMMMM dd", { locale: enUS });
}

export function checkDateRange(dateRange: DateRange) {
  const { from, to } = dateRange;
  if (!from || !to) return undefined;

  const isSingleDate = from.getTime() === to.getTime();

  if (isSingleDate) return formatSingleDate(from);
  else return `${formatSingleDate(from)} ~ ${formatSingleDate(to)}`;
}

export default function DateInput({
  placeholder = "에피소드 날짜",
}: InputProps) {
  const [open, setOpen] = useState(false);
  const { date, setDate } = useEpisodeDataStore();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function onBlurDatePicker() {
    setOpen(false);
  }

  const display = date ? checkDateRange(date) : undefined;

  return (
    <div className="flex flex-col">
      <div ref={ref} className="  w-full max-w-xs">
        <div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={[
              "w-full text-left",
              "flex items-center justify-between gap-2",
              "focus:outline-none",
            ].join(" ")}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <span
              className={`text-primary text-2xl ${
                date ? "text-text-default" : "opacity-25"
              }`}
            >
              {display || placeholder}
            </span>
          </button>

          {open && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20">
              <div
                role="dialog"
                aria-label="Date picker"
                className="fixed z-50 mt-2 bg-white p-3 shadow-lg border  "
              >
                <DayPicker
                  mode="range"
                  locale={enUS}
                  selected={date || undefined}
                  autoFocus
                  onSelect={(d) => {
                    if (d) {
                      setDate(d);
                    }
                  }}
                  hideNavigation
                  startMonth={new Date(2025, 0)}
                  endMonth={new Date(2025, 11)}
                  captionLayout="dropdown-months"
                  formatters={{
                    formatWeekdayName: (weekday, options) => {
                      return format(weekday, "EEEEE", options);
                    },
                  }}
                  classNames={{
                    month: "space-y-3",
                    table: "w-full border-collapse mt-2",
                    head_row: "flex border!",

                    day: "rounded-full w-10 h-10 hover:bg-primary text-center",
                    day_selected:
                      "bg-black text-white hover:bg-black focus:bg-black",
                    day_today: "border border-zinc-300 ",
                    day_button:
                      "rounded-full w-full h-full hover:cursor-pointer hover:text-white",
                    day_outside: "text-zinc-300 bg-black border",
                    months_dropdown:
                      "focus:outline-none text-center hover:cursor-pointer",
                    caption_label: "hidden",
                    dropdowns: "flex justify-center items-center p-2 text-lg",
                    years_dropdown: "hidden",
                    month_caption: "",

                    range_middle: "bg-primary text-white",
                    range_start: "bg-primary text-white font-bold",
                    range_end: "bg-primary text-white font-bold",
                    hidden: "hover:bg-white",
                    weekdays: "text-xs",
                    weeks: "mt-4",
                  }}
                />

                <div className="mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-black/90"
                    onClick={() => setOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
