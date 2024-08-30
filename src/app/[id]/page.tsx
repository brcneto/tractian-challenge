"use client";

import TreeView from "@/components/TreeView";
import { structureTree } from "@/composables/structureTreeView";
import { Company } from "@/tools/api";
import { useEffect, useState } from "react";

export default function CompanyPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [companyData, setCompanyData] = useState<any>();

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
    <div className="px-4 py-[18px]">
      <header className="text-[#24292F]">Ativos</header>
      <TreeView data={companyData} />
    </div>
  );
}
