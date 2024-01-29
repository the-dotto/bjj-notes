import Link from "next/link";

export function ButtonAddEntry() {
  return (
    <Link
      href="/app/entries/new"
      className="rounded-md block absolute bottom-4 right-4 px-8 py-4 bg-gray-950 text-white font-bold text-xl translate-y-0 hover:-translate-y-1 focus:-translate-y-1 active:translate-y-0 transition-transform"
    >
      Add Entry
    </Link>
  );
}
