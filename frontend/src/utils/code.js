export const moduleScnMap = {
  0: {
    fullTitle: "가스감지기",
    title: "가스",
    engTitle: "gas",
    viewTitle: "가스",
  },
  1: {
    fullTitle: "전도율측정기",
    title: "전도율",
    engTitle: "cta",
    viewTitle: "전도율",
  },
  2: { fullTitle: "우수로", title: "pH", engTitle: "ph", viewTitle: "pH" },
  3: {
    fullTitle: "누액측정기",
    title: "누액",
    engTitle: "leakage",
    viewTitle: "누액",
  },
  4: { fullTitle: "HF감지기", title: "HF", engTitle: "hf", viewTitle: "HF" },
  5: {
    fullTitle: "우수로",
    title: "pH",
    engTitle: "ph_leakage",
    viewTitle: "pH",
  },
  6: {
    fullTitle: "암모니아감지기",
    title: "NH3",
    engTitle: "nh3",
    viewTitle: "NH₃",
  },
  7: {
    fullTitle: "누액측정기",
    title: "누액-채널",
    engTitle: "leakageChannel",
    viewTitle: "누액-채널",
  },
};

export const moduleScnTitleMap = {
  gas: { title: "가스", scn: 0 },
  cta: { title: "전도율", scn: 1 },
  ph: { title: "우수로", scn: 2 },
  leakage: { title: "누액", scn: 3 },
  ph_leakage: { title: "우수로", scn: 5 },
  hf: { title: "HF", scn: 4 },
  nh3: { title: "NH3", scn: 6 },
  leakagechannel: { title: "누액", scn: 7 },
};

export const titleInitial = {
  가스: "G",
  전도율: "C",
  누액: "L",
  우수로: "P",
  HF: "F",
  NH3: "F",
};

export const statusMap = {
  blue: "정상",
  warning: "경고",
  danger: "위험",
  none: "미수신",
};

export const firstWeekMap = { 0: 7, 1: 6, 2: 5, 3: 4, 4: 3, 5: 9, 6: 8 };

export const lineGraphReferenceValue = {
  o2: { max: 25, min: 18, tickAmount: 5 },
  co2: { max: 2, min: 0, tickAmount: 4 },
  h2s: { max: 12, min: 0, tickAmount: 4 },
  co: { max: 35, min: 0, tickAmount: 5 },
  ch4: { max: 12, min: 0, tickAmount: 4 },
  hf: { max: 1, min: 0, tickAmount: 4 },
  nh3: { max: 40, min: 0, tickAmount: 5 },
  leakage: { max: 1, min: 0, tickAmount: 2 },
  conductivity: { max: 100, min: 0, tickAmount: 4 },
  ph: { max: 14, min: 0, tickAmount: 7 },
  ph_leakage: { max: 1, min: 0, tickAmount: 2 },
};

export const graphOrder = {
  0: ["o2", "h2s", "co", "ch4", "co2"],
  1: ["conductivity"],
  2: ["ph"],
  3: ["leakage"],
  4: ["hf"],
  5: ["ph_leakage"],
  6: ["hf", "nh3"],
  7: [
    "leakage",
    "leakage2",
    "leakage3",
    "leakage4",
    "leakage5",
    "leakage6",
    "leakage7",
    "leakage8",
  ],
};

export const utmMap = {
  o2: "%",
  co2: "%",
  h2s: "ppm",
  co: "ppm",
  ch4: "%LEL",
  leakage: "",
  hf: "ppm",
  nh3: "ppm",
  ph: "pH",
  ph_leakage: "pH",
};

export const rangeMap = {
  A: "초과",
  B: "이상",
  C: "이하",
  D: "미만",
};

// 경고, 위험 기준값을 이용해 화면상에 정상범위를 표시해줄 때 사용하는 맵
export const reverseRangeMap = {
  A: "이하",
  B: "미만",
  C: "초과",
  D: "이상",
};
