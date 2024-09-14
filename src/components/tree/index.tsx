import { IAsset, ITreeItem } from "@/@types";
import TreeItem from "./TreeItem";

interface TreeViewProps {
  data: ITreeItem[];
  hasFilter: boolean;
  setSelectedItem: (item: IAsset) => void;
  selectedItemId?: string;
}

export default function TreeView({
  data,
  hasFilter,
  setSelectedItem,
  selectedItemId,
}: TreeViewProps) {
  return (
    <ul className="px-1 my-2 h-full overflow-y-auto max-h-[calc(100vh-206px)]">
      {data.map((data) => (
        <TreeItem
          key={data.id}
          hasFilter={hasFilter}
          item={data}
          setSelectedItem={setSelectedItem}
          selectedItemId={selectedItemId}
        />
      ))}
    </ul>
  );
}
