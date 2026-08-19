import type { MutationCtx, QueryCtx } from "../_generated/server";

function getAdminEmail(): string {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    throw new Error("Admin access is not configured");
  }
  return adminEmail;
}

export function assertAllowlistedAdminEmail(email: string): void {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail !== getAdminEmail()) {
    throw new Error("Unauthorized");
  }
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.email) {
    throw new Error("Not authenticated");
  }

  assertAllowlistedAdminEmail(identity.email);
  return identity;
}
