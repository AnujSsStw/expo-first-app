import { vv } from "@/app/(auth)/_layout";
import { createContext, useContext } from "react";

export const QueueContext = createContext<{
  state: vv | undefined;
  setState: React.Dispatch<React.SetStateAction<vv | undefined>>;
} | null>(null);
