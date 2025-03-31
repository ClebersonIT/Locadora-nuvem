import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type useUserProps = {
  data: User & {
    isLogged: boolean;
  };
  setData: (user: User & { isLogged: boolean }) => void;
};

export const useUser = create<useUserProps>()(
  persist(
    (set) => ({
      data: {
        username: "",
        email: "",
        name: "",
        password: "",
        isLogged: false,
      },
      setData: (user) => set({ data: user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
