"use client";

import { useState } from "react";
import { ITreeItem } from "@/@types";
import { Icon } from "@iconify-icon/react";
import { cn } from "@/utils";

type TreeItemProps = ITreeItem;

function TreeItem({ item }: { item: TreeItemProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="select-none mt-1 text-sm">
      <div
        className={cn("flex items-center justify-start", {
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
        <div className="flex items-center gap-1">
          <Icon icon={item.label.icon} className="text-primary" width={16} />
          {item.label.title}
        </div>
      </div>
      {hasChildren && isOpen && (
        <div className="flex items-stretch gap-2 ml-6">
          <div className="w-[1px] bg-[#24292F]/20 my-2" />
          <ul>
            {item.children?.map((child) => (
              <TreeItem key={child.id} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function TreeView({ data }: { data: ITreeItem[] }) {
  return (
    <ul className="px-1 py-2">
      {data.map((data) => (
        <TreeItem key={data.id} item={data} />
      ))}
    </ul>
  );
}
