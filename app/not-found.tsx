import Link from "next/link";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          This listing does not exist or is not available.
        </p>
        <Link
          href="/directory"
          className="mt-6 inline-block text-sm font-medium text-slate-900 underline underline-offset-4 dark:text-slate-100"
        >
          Back to directory
        </Link>
      </main>
    </>
  );
}
