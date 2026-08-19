import Nav from "@/components/Nav";

export default function DirectoryPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Directory
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Sponsor listings will appear here in a later milestone.
        </p>
      </main>
    </>
  );
}
