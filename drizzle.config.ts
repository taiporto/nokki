import type { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  out: "./drizzle",
  driver: "expo",
  breakpoints: true,
} satisfies Config;
