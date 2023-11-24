import { TinyColor } from "@ctrl/tinycolor";

export const Color = (value: string) => {
  return new TinyColor(value);
};

export const darken = (value: string, amount?: number) => {
  return new TinyColor(value).darken(amount).toString();
};
export const lighten = (value: string, amount?: number) => {
  return new TinyColor(value).lighten(amount).toString();
};
