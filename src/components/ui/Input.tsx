import { clsx } from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "w-full px-4 py-3 bg-white border text-[#0a0a0a] placeholder:text-[#8a8a8a] focus:outline-none transition-colors text-sm disabled:bg-[#fafaf8] disabled:text-[#8a8a8a]",
          error ? "border-[#c23232] focus:border-[#c23232]" : "border-[#e7e5e0] focus:border-[#0a0a0a]",
          className
        )}
        {...props}
      />
      {error && <p className="text-[#c23232] text-xs mt-1">{error}</p>}
    </div>
  );
}
