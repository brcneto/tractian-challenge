import { cn } from "@/utils";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface ComponentTagProps {
  status?: "alert" | "operating" | null;
  sensorType?: "vibration" | "energy" | null;
}

export default function ComponentTag({
  status,
  sensorType,
}: ComponentTagProps) {
  return (
    <span
      className={cn("flex items-center justify-center", {
        "text-success": status === "operating",
        "text-warning": status === "alert",
      })}
    >
      {sensorType === "energy" ? (
        <Icon icon="iconamoon:lightning-1-fill" width={14} />
      ) : (
        <Icon icon="tabler:circle-filled" width={10} />
      )}
    </span>
  );
}
