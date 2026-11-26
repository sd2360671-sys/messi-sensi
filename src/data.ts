export type PlanName = "Combo" | "Sensi" | "Optimization";

export interface Section {
  title: string;
  /** which plans include this section */
  plans: PlanName[];
  items: string[];
}

export interface Category {
  id: "pc" | "mobilator" | "mobile";
  label: string;
  tag: string;
  icon: "pc" | "mobilator" | "mobile";
  prices: Record<PlanName, number>;
  heading: string;
  sections: Section[];
}

export const categories: Category[] = [
  {
    id: "pc",
    label: "PC",
    tag: "Windows • Emulator Pro",
    icon: "pc",
    prices: { Combo: 1599, Sensi: 799, Optimization: 1299 },
    heading: "Features",
    sections: [
      {
        title: "",
        plans: ["Combo", "Sensi", "Optimization"],
        items: [
          "Stalbe X,y & Tweaks",
          "Aim & Fps Optimization",
          "Paid Emulator",
          "Aim Optimizer",
          "Brutal Regedit For Fps Or Aim",
          "Perfect Aim Technique & Smooth Aim",
          "Fps Booster",
          "Windows Optimization",
        ],
      },
    ],
  },
  {
    id: "mobilator",
    label: "MOBILATOR",
    tag: "Mobile on Emulator",
    icon: "mobilator",
    prices: { Combo: 799, Sensi: 399, Optimization: 399 },
    heading: "MOBILATOR SENSI",
    sections: [
      {
        title: "Sensitivity",
        plans: ["Combo", "Sensi"],
        items: [
          "Removed Aimshake",
          "Perfect Sensitivity & Mouse Dpi",
          "Brutal Aim Technique",
          "No Recoil",
        ],
      },
      {
        title: "OPTIMIZATION",
        plans: ["Combo", "Optimization"],
        items: [
          "Brutal Module For Fps",
          "OverClock Mobile Without Root",
          "Developer Option Perfect Settings",
          "Aimlock Breven Commands",
          "Optimizer For Ram Clean",
          "Set Edit Commands For Fps",
          "Paid Emulator By Messi",
          "Secret Accessibility Settings",
          "Remove Input Delay",
          "Secret Canta Settings",
          "Secert Ax Manager Modules For Aim",
          "Ourr Official Fps Booster for Aim",
          "Secret Tunner For Fps",
        ],
      },
    ],
  },
  {
    id: "mobile",
    label: "MOBILE",
    tag: "Android Phone",
    icon: "mobile",
    prices: { Combo: 1000, Sensi: 500, Optimization: 500 },
    heading: "ANDROID SENSI & OPTIMIZATION",
    sections: [
      {
        title: "Sensitivity",
        plans: ["Combo", "Sensi"],
        items: ["Removed Aimshake", "Perfect Sensitivity", "Brutal DPI", "No Recoil"],
      },
      {
        title: "OPTIMIZATION",
        plans: ["Combo", "Optimization"],
        items: [
          "Full Phone Optimization",
          "TalkBack and Switch Access Settings",
          "Best Optimiser App",
          "Illegal Developer Settings",
        ],
      },
    ],
  },
];

export const planOrder: PlanName[] = ["Combo", "Sensi", "Optimization"];
