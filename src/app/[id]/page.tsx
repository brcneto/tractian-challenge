"use client";

import { IAsset, ITreeItem } from "@/@types";
import ComponentDetails from "@/components/ComponentDetails";
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
        <section className="flex-1 border border-[#D8DFE6] ">
          {selectedItem ? (
            <ComponentDetails component={selectedItem} />
          ) : (
            <span className="h-full flex items-center justify-center">
              Nenhum componente selecionado
            </span>
          )}
        </section>
      </div>
    </div>
  );
}
