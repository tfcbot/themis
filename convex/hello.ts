import { query } from "./_generated/server";
import { v } from "convex/values";

export const getMessage = query({
  args: {},
  returns: v.object({
    message: v.string(),
  }),
  handler: async () => {
    return { message: "Hello from Themis" };
  },
});
