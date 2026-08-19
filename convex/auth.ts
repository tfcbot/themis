import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { assertAllowlistedAdminEmail } from "./lib/auth";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = String(params.email ?? "");
        assertAllowlistedAdminEmail(email);
        return {
          email: email.trim().toLowerCase(),
        };
      },
    }),
  ],
});
