"use client";

import { IAsset, ITreeItem } from "@/@types";
import ComponentDetails from "@/components/ComponentDetails";
import TreeView from "@/components/tree";

import { Company } from "@/tools/api";
import { cn } from "@/utils";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useEffect, useRef, useState } from "react";

export default function CompanyPage({
  params: { id },
  searchParams: { name },
}: {
  params: { id: string };
  searchParams: { name: string };
}) {
  const [data, setData] = useState<ITreeItem[]>();
  const [filteredData, setFilteredData] = useState<ITreeItem[]>();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterByStatus, setFilterByStatus] = useState(false);
  const [filterBySensorType, setFilterBySensorType] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);

  const [selectedItem, setSelectedItem] = useState<IAsset>();

  const [isLoading, setIsLoading] = useState(false);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const structureTreeWorkerRef = useRef<Worker>();
  const filterWorkerRef = useRef<Worker>();

  const getData = async () => {
    setIsLoading(true);
    const getLocations = Company.getLocations(id);
    const getAssets = Company.getAssets(id);
    const [locations, assets] = await Promise.all([getLocations, getAssets]);

    structureTreeWorkerRef.current?.postMessage({ locations, assets });
  };

  useEffect(() => {
    getData();

    structureTreeWorkerRef.current = new Worker(
      new URL("@/workers/structureTreeWorker.ts", import.meta.url)
    );

    structureTreeWorkerRef.current.onmessage = (
      e: MessageEvent<ITreeItem[]>
    ) => {
      setData(e.data);
      setFilteredData(e.data);
      setIsLoading(false);
    };

    filterWorkerRef.current = new Worker(
      new URL("@/workers/filterWorker.ts", import.meta.url)
    );

    filterWorkerRef.current.onmessage = (e: MessageEvent<ITreeItem[]>) => {
      console.log(e.data);
      setFilteredData(e.data);
      setIsLoading(false);
    };

    return () => {
      filterWorkerRef.current?.terminate();
      structureTreeWorkerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    setIsLoading(true);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      if (
        searchInputValue.trim() === "" &&
        !filterByStatus &&
        !filterBySensorType
      ) {
        setHasFilter(false);
        setFilteredData(data);
        setIsLoading(false);
      } else {
        setHasFilter(true);
        filterWorkerRef.current?.postMessage({
          data,
          searchInputValue,
          filterByStatus,
          filterBySensorType,
        });
      }
    }, 1000);
  }, [searchInputValue, filterByStatus, filterBySensorType]);

  return (
    <div className="p-4 h-full w-full flex flex-col text-[#24292F]">
      <header className="flex items-center justify-between  mb-4">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-semibold">Ativos</h1>
          <span className="text-sm text-[#77818C]">/ {name}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            className={cn(
              "flex items-center gap-1 py-[6px] px-4 text-[#77818C] border border-[#D8DFE6] rounded-[4px] duration-200",
              { "text-white bg-primary border-primary": filterBySensorType }
            )}
            onClick={() => setFilterBySensorType((prev) => !prev)}
          >
            <Icon
              icon="iconamoon:lightning-2-light"
              className={cn("text-primary text-base", {
                "text-white": filterBySensorType,
              })}
            />
            Sensor de Energia
          </button>
          <button
            className={cn(
              "flex items-center gap-1 py-[6px] px-4 text-[#77818C] border border-[#D8DFE6] rounded-[4px] duration-200",
              { "text-white bg-primary border-primary": filterByStatus }
            )}
            onClick={() => setFilterByStatus((prev) => !prev)}
          >
            <Icon
              icon="lucide:circle-alert"
              className={cn("text-primary text-base", {
                "text-white": filterByStatus,
              })}
            />
            Crítico
          </button>
        </div>
      </header>
      <div className="flex-1 flex w-full gap-2 items-stretch">
        <aside className="flex flex-col rounded-sm border border-[#D8DFE6] w-[500px] relative h-full">
          <input
            type="text"
            placeholder="Buscar Ativo ou Local"
            className="w-full py-3 px-3 h-11 border-b border-[#D8DFE6]"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          {!filteredData || isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Icon icon="line-md:loading-loop" width={60} />
            </div>
          ) : (
            <TreeView
              data={filteredData}
              hasFilter={hasFilter}
              selectedItemId={selectedItem?.id}
              setSelectedItem={setSelectedItem}
            />
          )}
        </aside>
        <section className="flex-1 border border-[#D8DFE6] ">
          {selectedItem ? (
            <ComponentDetails component={selectedItem} />
          ) : (
            <span className="h-full flex items-center justify-center text-center">
              Nenhum componente selecionado
            </span>
          )}
        </section>
      </div>
    </div>
  );
}
