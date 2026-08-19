"use client";

import { useMutation } from "convex/react";
import { useState, type FormEvent } from "react";
import { api } from "@/convex/_generated/api";
import { LISTING_LIMITS } from "@/convex/lib/listingValidation";

const CATEGORY_SUGGESTIONS = [
  "Automation",
  "Analytics",
  "Security",
  "Ops",
] as const;

type FormState = {
  name: string;
  category: string;
  oneLiner: string;
  url: string;
  logoUrl: string;
};

const initialFormState: FormState = {
  name: "",
  category: "",
  oneLiner: "",
  url: "",
  logoUrl: "",
};

const inputClassName =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-400";

const labelClassName =
  "block text-sm font-medium text-slate-700 dark:text-slate-200";

export default function AddListingForm() {
  const createPendingListing = useMutation(api.listings.createPendingListing);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createPendingListing({
        name: form.name,
        category: form.category,
        oneLiner: form.oneLiner,
        url: form.url,
        logoUrl: form.logoUrl,
        kind: "organic",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/40"
        role="status"
      >
        <p className="font-medium text-emerald-900 dark:text-emerald-100">
          Submitted. We will review.
        </p>
        <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
          Your listing is pending review and will not appear in the public
          directory until it is approved.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex max-w-xl flex-col gap-5 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900"
    >
      <div>
        <label htmlFor="name" className={labelClassName}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={LISTING_LIMITS.name}
          value={form.name}
          onChange={updateField("name")}
          className={inputClassName}
          placeholder="Your tool or sponsor name"
        />
      </div>

      <div>
        <label htmlFor="category" className={labelClassName}>
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          required
          maxLength={LISTING_LIMITS.category}
          list="category-suggestions"
          value={form.category}
          onChange={updateField("category")}
          className={inputClassName}
          placeholder="e.g. Automation"
        />
        <datalist id="category-suggestions">
          {CATEGORY_SUGGESTIONS.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>

      <div>
        <label htmlFor="oneLiner" className={labelClassName}>
          One-liner
        </label>
        <textarea
          id="oneLiner"
          name="oneLiner"
          required
          maxLength={LISTING_LIMITS.oneLiner}
          rows={3}
          value={form.oneLiner}
          onChange={updateField("oneLiner")}
          className={inputClassName}
          placeholder="A short description of what you offer"
        />
      </div>

      <div>
        <label htmlFor="url" className={labelClassName}>
          Website URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          maxLength={LISTING_LIMITS.url}
          value={form.url}
          onChange={updateField("url")}
          className={inputClassName}
          placeholder="https://example.com"
        />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Must be a valid HTTPS URL.
        </p>
      </div>

      <div>
        <label htmlFor="logoUrl" className={labelClassName}>
          Logo URL{" "}
          <span className="font-normal text-slate-500 dark:text-slate-400">
            (optional)
          </span>
        </label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          maxLength={LISTING_LIMITS.logoUrl}
          value={form.logoUrl}
          onChange={updateField("logoUrl")}
          className={inputClassName}
          placeholder="https://example.com/logo.png"
        />
      </div>

      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      >
        {isSubmitting ? "Submitting…" : "Submit listing"}
      </button>
    </form>
  );
}
