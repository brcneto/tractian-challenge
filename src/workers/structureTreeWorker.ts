import { IAsset, ILocation } from "@/@types";
import { structureTree } from "@/composables/structureTreeView";
interface IStructureTree {
  locations: ILocation[];
  assets: IAsset[];
}

addEventListener("message", (event: MessageEvent<IStructureTree>) => {
  const { locations, assets } = event.data;
  console.log(event.data);

  const structuredTree = structureTree(locations, assets);

  console.log(structuredTree);

  postMessage(structuredTree);
});
