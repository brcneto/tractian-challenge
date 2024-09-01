"use client";

import { ITreeItem } from "@/@types";
import TreeView from "@/components/Tree";
import { structureTree } from "@/composables/structureTreeView";
import { Company } from "@/tools/api";
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
  const [selectedItem, setSelectedItem] = useState<ITreeItem>();

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
    <div className="px-4 py-[18px] h-full">
      <header className="flex items-center justify-between text-[#24292F] mb-4">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-semibold">Ativos</h1>
          <span className="text-sm text-[#77818C]">/ {name}</span>
        </div>
        {/* Filtros */}
        <div></div>
      </header>
      <div className="flex w-full gap-2 ">
        <aside className="flex flex-col rounded-sm border border-[#D8DFE6] w-full max-w-[500px]">
          <input
            type="text"
            placeholder="Buscar Ativo ou Local"
            className="w-full py-3 px-3 h-11 border-b border-[#D8DFE6]"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
          />
          <TreeView data={companyData} />
        </aside>
      </div>
    </div>
  );
}
