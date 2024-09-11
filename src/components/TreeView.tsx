"use client";

import { ITreeItem } from "@/@types";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

function TreeItem({ item }: { item: ITreeItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
        {hasChildren && (
          <span className="cursor-pointer mr-2">
            {isOpen ? <Icon icon="material-symbols:keyboard-arrow-up"/> : <Icon icon="material-symbols:keyboard-arrow-down"/>}
          </span>
        )}     
        <span>{item.label}</span>
      </div>
      {hasChildren && isOpen && (
        <ul className="ml-4">
          {item.children?.map((child) => (
            <TreeItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TreeView({ data }: { data: ITreeItem[] }) {
  return (
    <ul className="select-none">
      {data.map((data) => (
        <TreeItem key={data.id} item={data} />
      ))}
    </ul>
  );
}
