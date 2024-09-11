"use client";

import { useState } from "react";
import { IAsset, ITreeItem } from "@/@types";
import { Icon } from "@iconify-icon/react";
import { cn } from "@/utils";
import { checkIfComponent } from "@/composables/structureTreeView";
import ComponentTag from "../ComponentTag";

interface TreeItemProps {
  item: ITreeItem;
  setSelectedItem: (item: IAsset) => void;
  selectedItemId?: string;
}

export default function TreeItem({
  item,
  setSelectedItem,
  selectedItemId,
}: TreeItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isComponent = checkIfComponent(item.data);
  const isSelected = item.id === selectedItemId;

  const handleSelectItem = () => {
    if (!isComponent) return;
    setSelectedItem(item.data);
  };

  return (
    <li className=" select-none mt-1 text-sm w-full">
      <div
        className={cn("flex w-full items-center justify-start ", {
          "cursor-pointer": hasChildren,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="flex items-center">
            {isOpen ? (
              <Icon
                icon="ic:baseline-keyboard-arrow-down"
                width={16}
                height={16}
              />
            ) : (
              <Icon
                icon="ic:baseline-keyboard-arrow-right"
                width={16}
                height={16}
              />
            )}
          </span>
        )}
        <div
          data-isComponent={isComponent}
          data-isSelected={isSelected}
          className=" flex items-center w-full gap-1 data-[isComponent=true]:cursor-pointer data-[isSelected=true]:bg-primary data-[isSelected=true]:text-white"
          onClick={handleSelectItem}
        >
          <Icon
            icon={item.label.icon}
            data-isSelected={isSelected}
            className="text-primary data-[isSelected=true]:text-white"
            width={18}
          />
          {item.label.title}
          {isComponent && (
            <ComponentTag
              status={(item.data as IAsset)?.status}
              sensorType={(item.data as IAsset)?.sensorType}
            />
          )}
        </div>
      </div>
      {hasChildren && isOpen && (
        <div className="flex items-stretch gap-2 ml-6">
          <div className="w-[1px] bg-[#24292F]/20 my-2" />
          <ul className="flex-1">
            {item.children?.map((child) => (
              <TreeItem
                key={child.id}
                item={child}
                setSelectedItem={setSelectedItem}
                selectedItemId={selectedItemId}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
