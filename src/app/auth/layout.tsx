import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {	
  return (
    <div className="grid place-items-center h-screen overflow-hidden">
      <main className="md:max-w-md w-full mx-auto overflow-y-hidden grid place-items-center gap-8 border-2 border-gray-900 rounded-md px-8 py-12">
        {children}
      </main>
    </div>
  );
}
