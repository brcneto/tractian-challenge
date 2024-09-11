interface SponsorTagProps {
  sensorType?: "energy" | "vibration" | null;
}

export default function SponsorTag({ sensorType }: SponsorTagProps) {
  return (
    <div className="flex items-center gap-2 text-[#88929C]">
      <span className="w-7 h-7 flex items-center justify-center text-lg bg-primary text-white rounded-full">
        {sensorType === "energy" ? "E" : "M"}
      </span>
      {sensorType === "energy" ? "Elétrica" : "Mecânica"}
    </div>
  );
}
