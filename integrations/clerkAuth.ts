import { getAuth } from "@clerk/nextjs/server";
export const getUserContext = (req: any) => {
  const { userId, orgId, sessionId } = getAuth(req);
  return { userId, orgId, sessionId };
};
