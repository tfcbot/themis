"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { FormEvent, useState } from "react";

type PendingListing = {
  _id: Id<"listings">;
  name: string;
  category: string;
  oneLiner: string;
  kind: "organic" | "sponsored";
};

function PendingListingRow({
  listing,
  onPublish,
  onReject,
  disabled,
}: {
  listing: PendingListing;
  onPublish: (listingId: Id<"listings">) => Promise<void>;
  onReject: (listingId: Id<"listings">) => Promise<void>;
  disabled: boolean;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {listing.name}
            </h2>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              {listing.kind}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {listing.category}
          </p>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            {listing.oneLiner}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => void onPublish(listing._id)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Publish
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => void onReject(listing._id)}
            className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950"
          >
            Reject
          </button>
        </div>
      </div>
    </article>
  );
}

function AdminSignInForm() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await signIn("password", {
        email,
        password,
        flow: "signIn",
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Admin sign in
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Only the allowlisted admin account can review pending listings.
      </p>
      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-200">
        Email
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-emerald-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
        Password
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-emerald-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
        />
      </label>
      {error ? (
        <p className="mt-4 text-sm text-rose-700 dark:text-rose-300">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      >
        {submitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

function AdminReviewPanel() {
  const { signOut } = useAuthActions();
  const pendingListings = useQuery(api.admin.listPendingListings, {});
  const publishListing = useMutation(api.admin.publishListing);
  const rejectListing = useMutation(api.admin.rejectListing);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyListingId, setBusyListingId] = useState<Id<"listings"> | null>(
    null,
  );

  async function handlePublish(listingId: Id<"listings">) {
    setBusyListingId(listingId);
    setActionError(null);
    try {
      await publishListing({ listingId });
    } catch (publishError) {
      setActionError(
        publishError instanceof Error
          ? publishError.message
          : "Unable to publish listing",
      );
    } finally {
      setBusyListingId(null);
    }
  }

  async function handleReject(listingId: Id<"listings">) {
    setBusyListingId(listingId);
    setActionError(null);
    try {
      await rejectListing({ listingId });
    } catch (rejectError) {
      setActionError(
        rejectError instanceof Error
          ? rejectError.message
          : "Unable to reject listing",
      );
    } finally {
      setBusyListingId(null);
    }
  }

  if (pendingListings === undefined) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Loading pending listings...
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Pending listings
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Publish to make a listing live on the public directory. Reject to
            keep it hidden.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Sign out
        </button>
      </div>

      {actionError ? (
        <p className="mb-4 text-sm text-rose-700 dark:text-rose-300">
          {actionError}
        </p>
      ) : null}

      {pendingListings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          No pending listings right now.
        </p>
      ) : (
        <div className="space-y-4">
          {pendingListings.map((listing) => (
            <PendingListingRow
              key={listing._id}
              listing={listing}
              onPublish={handlePublish}
              onReject={handleReject}
              disabled={busyListingId === listing._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Checking admin session...
      </p>
    );
  }

  if (!isAuthenticated) {
    return <AdminSignInForm />;
  }

  return <AdminReviewPanel />;
}
