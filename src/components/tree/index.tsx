import { IAsset, ITreeItem } from "@/@types";
import TreeItem from "./TreeItem";

interface TreeViewProps {
  data: ITreeItem[];
  setSelectedItem: (item: IAsset) => void;
  selectedItemId?: string;
}

export default function TreeView({
  data,
  setSelectedItem,
  selectedItemId,
}: TreeViewProps) {
  return (
    <ul className="px-1 py-2">
      {data.map((data) => (
        <TreeItem
          key={data.id}
          item={data}
          setSelectedItem={setSelectedItem}
          selectedItemId={selectedItemId}
        />
      ))}
    </ul>
  );
}
