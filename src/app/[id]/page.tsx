"use client";

import { IAsset, ITreeItem } from "@/@types";
import TreeView from "@/components/tree";
import { structureTree } from "@/composables/structureTreeView";
import { Company } from "@/tools/api";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useEffect, useState } from "react";

export default function CompanyPage({
  params: { id },
  searchParams: { name },
}: {
  params: { id: string };
  searchParams: { name: string };
}) {
  const [companyData, setCompanyData] = useState<ITreeItem[]>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<IAsset>();

  const getData = async () => {
    const getLocations = Company.getLocations(id);
    const getAssets = Company.getAssets(id);
    const [resLocations, resAssets] = await Promise.all([
      getLocations,
      getAssets,
    ]);

    setCompanyData(structureTree(resLocations, resAssets));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(selectedItem);

  if (!companyData) return <div>Loading...</div>;

  return (
    <div className="p-4 h-full w-full flex flex-col text-[#24292F]">
      <header className="flex items-center justify-between  mb-4">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-semibold">Ativos</h1>
          <span className="text-sm text-[#77818C]">/ {name}</span>
        </div>
        {/* Filtros */}
        <div></div>
      </header>
      <div className="flex-1 flex w-full gap-2 items-stretch">
        <aside className="flex flex-col rounded-sm border border-[#D8DFE6] w-[500px]">
          <input
            type="text"
            placeholder="Buscar Ativo ou Local"
            className="w-full py-3 px-3 h-11 border-b border-[#D8DFE6]"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
          />
          <TreeView
            data={companyData}
            selectedItemId={selectedItem?.id}
            setSelectedItem={setSelectedItem}
          />
        </aside>
        <section className="flex-1 flex flex-col border border-[#D8DFE6] ">
          <header className="py-[14px] px-4 border-b w-full border-[#D8DFE6]">
            <h2>MOTORS H12D - Stage 2</h2>
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
                  <span className="text-[#88929C]">
                    Motor Elétrico (Trifásico)
                  </span>
                </div>
                <span className="h-[1px] w-full bg-[#D8DFE6]"></span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Responsáveis</h3>
                  <span className="text-[#88929C]">
                    Motor Elétrico (Trifásico)
                  </span>
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
                  <span className="text-[#88929C]">HIO4510</span>
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
                  <span className="text-[#88929C]">EUH4R27</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
