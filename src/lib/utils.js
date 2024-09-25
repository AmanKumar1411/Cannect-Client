import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json.json";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#7126a57] text-[#ff6060] border-[1px] border-[#ff60a3]",
  "bg-[#ff60a3a] text-[#ff60aa] border-[1px] border-[#ff60bbb]",
  "bg-[#66a60a] text-[#6666aa] border-[1px] border-[#66aabb]",
  "bg-[#4cc9f0a2] text-[#4cc9f0] border-[1px] border-[#4cc9bbb]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};
