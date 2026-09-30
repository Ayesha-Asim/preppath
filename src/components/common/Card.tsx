import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-[#E4DDED]
        dark:border-[rgba(171,132,255,0.17)]

        bg-white
        dark:bg-[#17101F]

        text-[#15111C]
        dark:text-white

        shadow-[0_8px_28px_rgba(76,29,149,0.06)]
        dark:shadow-[0_12px_32px_rgba(0,0,0,0.18)]

        transition-all
        duration-200

        ${className}
      `}
    >
      {children}
    </div>
  );
}