import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@fridaylog/env";
import { appRouter } from "@fridaylog/server/api/root";
import { createTRPCContext } from "@fridaylog/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? (_data) => {
          // const { path, error } = data;
          // console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
        }
      : undefined,
});
