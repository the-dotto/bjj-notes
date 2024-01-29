import { ButtonLink } from "~/components/ButtonLink";

export default function NotFound() {
  return (
    <div className="grid place-items-center h-screen overflow-hidden px-2">
      <main className="md:max-w-md w-full mx-auto overflow-y-hidden grid place-items-center gap-8 border-2 border-gray-900 rounded-md px-8 py-12">
        <h1 className="text-4xl font-bold">Entry Not Found</h1>

        <ButtonLink href="/app/entries" isOutlined>
          Back to Entries
        </ButtonLink>
      </main>
    </div>
  );
}
