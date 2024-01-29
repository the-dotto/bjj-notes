"use client";

import { DATE_SERVICE } from "~/services/dates";
import { useMemo } from "react";
import { Tables } from "~/services/supabase";
import styles from "./styles.module.css";

interface Props {
  entries: Tables<"entries">[];
}

export function WeekOverview({ entries }: Props) {
  const entriesWithDates = useMemo(() => {
    const dates = DATE_SERVICE.getCurrentWeekDates();

    return dates.map((date) => {
      const filteredEntries = entries.filter((entry) => {
        return DATE_SERVICE.isSameDay(entry.date, date);
      });

      return {
        date,
        entries: filteredEntries,
      };
    });
  }, [entries]);

  return (
    <div className="w-full overflow-x-hidden">
      <ul className={styles["week-container"]}>
        {entriesWithDates.map(({ entries, date }, index) => (
          <li
            key={index}
            className="border-2 border-gray-900 rounded flex flex-col snap-center"
          >
            <span className="bg-gray-900 p-4 text-white text-center select-none">
              {DATE_SERVICE.format("day", date)}
            </span>

            <div className="p-4 flex flex-col">
              {!!entries.length && (
                <ul className="list-decimal list-inside">
                  {entries.map((entry) => (
                    <li key={entry.id} className="truncate select-none">
                      {entry.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
