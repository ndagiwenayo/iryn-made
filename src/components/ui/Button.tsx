import { clsx } from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-semibold tracking-[0.15em] uppercase transition-colors inline-flex items-center justify-center gap-2",
        {
          "bg-[#0a0a0a] text-white hover:bg-[#b8953a]": variant === "primary",
          "border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white":
            variant === "secondary",
          "text-[#3a3a3a] hover:text-[#0a0a0a]": variant === "ghost",
          "bg-[#c23232] text-white hover:bg-[#a82727]": variant === "danger",
          "text-[10px] px-4 py-2": size === "sm",
          "text-[11px] px-6 py-3": size === "md",
          "text-[11px] px-8 py-4": size === "lg",
        },
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
