import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  disabled,
  ...props
}: Props) {
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-purple-800 text-white " +
      "hover:from-violet-500 hover:to-purple-700 " +
      "shadow-[0_10px_24px_rgba(124,58,237,0.22)]",

    secondary:
      "bg-[#FAF8FE] dark:bg-[#21152D] " +
      "text-[#15111C] dark:text-white " +
      "border border-[#E4DDED] dark:border-[rgba(171,132,255,0.17)] " +
      "hover:bg-[#F0E9FF] dark:hover:bg-[rgba(124,58,237,0.16)] " +
      "hover:border-violet-400/50",

    danger:
      "bg-red-600 text-white hover:bg-red-700 " +
      "shadow-[0_10px_24px_rgba(239,68,68,0.18)]",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        min-h-[48px]
        px-5
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-200
        ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        }
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}