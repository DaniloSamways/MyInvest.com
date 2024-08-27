import { PropsWithChildren } from "react";

interface StatisticCardProps {
  variant?: "good" | "bad";
}

const badVariantStyles =
  "border border-red-800 text-red-800 bg-opacity-10 bg-red-400 ";
const goodVariantStyles =
  "border border-green-800 text-green-800 bg-opacity-10 bg-green-400 ";

export function StatisticCard({
  variant,
  children,
}: PropsWithChildren<StatisticCardProps>) {
  return (
    <div
      className={`border rounded py-4 px-4 ${
        variant === "bad" ? badVariantStyles : goodVariantStyles
      }}`}
    >
      <span className={variant === "bad" ? "text-red-400" : "text-green-400"}>
        {children}
      </span>
    </div>
  );
}
