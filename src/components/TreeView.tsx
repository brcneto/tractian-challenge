"use client";

import { useState } from "react";
import { ITreeItem } from "@/@types";

type TreeItemProps = ITreeItem;

function TreeItem({ item }: { item: TreeItemProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
        {hasChildren && (
          <span className="cursor-pointer mr-2">{isOpen ? "-" : "+"}</span>
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
    <ul>
      {data.map((data) => (
        <TreeItem key={data.id} item={data} />
      ))}
    </ul>
  );
}
