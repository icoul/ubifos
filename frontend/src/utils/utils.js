import React from "react";
import {
  TiBatteryCharge,
  TiBatteryHigh,
  TiBatteryMid,
  TiBatteryLow,
} from "react-icons/ti";

export const statusTypeStandardization = (type) => {
  switch (type) {
    case "o2":
      return (
        <span>
          O<sub>2</sub>(%)
        </span>
      );
    case "ch4":
      return (
        <p>
          CH<sub>4</sub>(%LEL)
        </p>
      );
    case "co":
      return <span>CO(ppm)</span>;
    case "co2":
      return (
        <span>
          CO<sub>2</sub>(%)
        </span>
      );
    case "h2s":
      return (
        <span>
          H<sub>2</sub>S(ppm)
        </span>
      );
    case "ph":
      return <span>pH</span>;
    case "hf":
      return <span>HF(%)</span>;
    case "conductivity":
      return <span>conductivity</span>;
    case "leakage":
      return <span>leakage</span>;
    case "nh3":
      return (
        <span>
          NH<sub>3</sub>(ppm)
        </span>
      );
    default:
      return <span>{type}</span>;
  }
};

export const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

export const convertSubTagString = (text) => {
  return text
    .split("")
    .map((text) => {
      return isNumber(text) ? `<sub>${text}</sub>` : text;
    })
    .join("");
};

export const batteryToText = (value) => {
  return Math.round(value) + "%";
};

export const batteryToImg = (value) => {
  if (value > 75) {
    return <TiBatteryCharge />;
  } else if (value > 50) {
    return <TiBatteryHigh />;
  } else if (value > 20) {
    return <TiBatteryMid />;
  } else {
    return <TiBatteryLow style={{ color: `#FF0000` }} />;
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const classifyCriterionDataByModule = (criterion, moduleIdx) => {
  if (
    criterion.find(
      (x) => x.module !== null && x.module.moduleIdx === moduleIdx
    ) !== undefined
  ) {
    return criterion
      .filter((x) => x.module !== null && x.module.moduleIdx === moduleIdx)
      .sort(function (a, b) {
        return a.criterionValueIdx - b.criterionValueIdx;
      });
  } else {
    return criterion
      .filter((x) => x.standType !== "criterion" && x.module === null)
      .sort(function (a, b) {
        return a.criterionValueIdx - b.criterionValueIdx;
      });
  }
};
