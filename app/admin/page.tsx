import AdminPanel from "@/components/AdminPanel";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Listing review
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Admin-only publish and reject gate for pending sponsor listings.
      </p>
      <div className="mt-8">
        <AdminPanel />
      </div>
    </main>
  );
}
