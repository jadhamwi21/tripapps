import { titlize } from "./utils";

export const parseCliArray = (str: string) => {
  const isOneElement = str.indexOf(",") < 0;
  if (isOneElement) {
    return [titlize(str.slice(1, str.length - 1).trim())];
  } else {
    return str
      .slice(1, str.length - 1)
      .split(",")
      .map((currentStr) => titlize(currentStr.trim()));
  }
};
