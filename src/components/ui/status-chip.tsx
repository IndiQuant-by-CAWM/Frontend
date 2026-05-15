import { cn } from "@/lib/utils";

interface StatusChipProps {
  tone: "info" | "warning" | "success";
  text: string;
}

const toneClasses: Record<StatusChipProps["tone"], string> = {
  info: "border-line text-primary-strong bg-primary/10",
  warning: "border-warning/60 text-warning bg-warning/10",
  success: "border-success/60 text-success bg-success/10",
};

export function StatusChip({ tone, text }: StatusChipProps) {
  return (
    <span
      className={cn(
        "terminal-label inline-flex items-center rounded border px-2 py-1 text-[10px]",
        toneClasses[tone]
      )}
    >
      {text}
    </span>
  );
}
