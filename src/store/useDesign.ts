import { DesignFormikForm } from "@/modules/design";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DesignStore = {
  form: DesignFormikForm;
  submit: (form: DesignFormikForm) => void;
  reset: () => void;
};

export const useDesign = create<DesignStore>()(
  persist(
    (set) => ({
      form: {
        // categories: [""],
        datetime: "",
        // kids_friendly: false,
        theme: "",
        type: "",
        venue: "",
      },
      submit: (form) => {
        set({ form });
      },
      reset: () =>
        set({
          form: {
            datetime: "",
            theme: "",
            type: "",
            venue: "",
          },
        }),
    }),
    {
      name: "fga-missions-miniapp-designs",
    }
  )
);
