import { IAsset } from "@/@types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import ComponentTag from "./ComponentTag";
import SponsorTag from "./SponsorTag";

interface ComponentDetailsProps {
  component: IAsset;
}

export default function ComponentDetails({ component }: ComponentDetailsProps) {
  return (
    <div className="flex flex-col">
      <header className="py-[14px] px-4 border-b w-full flex items-center gap-1 border-[#D8DFE6]">
        <h2>{component.name}</h2>
        <ComponentTag
          sensorType={component.sensorType}
          status={component.status}
        />
      </header>
      <div className="p-6 flex flex-col gap-6 w-full">
        <div className="flex items-center gap-6">
          <div className="w-[336px] h-[226px] flex flex-col items-center justify-center bg-[#F2F8FF] border border-dashed border-[#55A6FF] text-[#55A6FF] rounded-[4px] cursor-pointer hover:opacity-60 duration-300">
            <Icon icon="lucide:inbox" width={50} />
            <span className="text-sm font-normal">
              Adicionar imagem do Ativo
            </span>
          </div>
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className=" font-semibold">Tipo de Equipamento</h3>
              <span className="text-[#88929C]">{component.sensorType}</span>
            </div>
            <span className="h-[1px] w-full bg-[#D8DFE6]"></span>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Responsáveis</h3>
              <SponsorTag sensorType={component.sensorType} />
            </div>
          </div>
        </div>

        <span className="h-[1px] w-full bg-[#D8DFE6]"></span>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 w-full">
            <h3 className=" font-semibold">Sensor</h3>
            <div className="flex items-center gap-1">
              <Icon
                icon="material-symbols:sensors"
                width={24}
                className="text-[#55A6FF]"
              />
              <span className="text-[#88929C]">{component.sensorId}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h3 className=" font-semibold">Receptor</h3>
            <div className="flex items-center gap-1">
              <Icon
                icon="material-symbols:router-outline"
                width={24}
                className="text-[#55A6FF]"
              />
              <span className="text-[#88929C]">{component.gatewayId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
