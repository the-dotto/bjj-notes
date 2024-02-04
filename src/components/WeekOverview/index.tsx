"use client";

import { DATE_SERVICE } from "~/services/dates";
import { useMemo } from "react";
import { Tables } from "~/services/supabase";
import styles from "./styles.module.css";
import cx from "classnames";

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
        isToday: DATE_SERVICE.isToday(date),
      };
    });
  }, [entries]);

  return (
    <div className="w-full overflow-x-hidden">
      <ul className={styles["week-container"]}>
        {entriesWithDates.map(({ entries, date, isToday }, index) => (
          <li
            key={index}
            className="border-2 border-gray-900 rounded flex flex-col snap-center"
          >
            <span
              className={cx("p-4 text-center select-none", {
                "bg-gray-900 text-white": isToday,
                "border-b-2 border-b-gray-900": !isToday,
              })}
            >
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
