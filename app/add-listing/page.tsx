import AddListingForm from "@/components/AddListingForm";
import Nav from "@/components/Nav";

export default function AddListingPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Add listing
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Submit your tool or sponsor listing for review. Approved listings
          appear in the public directory.
        </p>
        <AddListingForm />
      </main>
    </>
  );
}
