import { ITreeItem, ILocation, IAsset } from "@/@types";

export function structureTree(locations: ILocation[], assets: IAsset[]) {
  const buildLocationTree = (parentId: string | null): ITreeItem[] => {
    return locations
      .filter((location) => location.parentId === parentId)
      .map((location) => ({
        id: location.id,
        label: location.name,
        data: location,
        type: "location",
        children: [
          ...buildLocationTree(location.id),
          ...buildAssetTree(location.id),
        ],
      }));
  };

  const buildAssetTree = (parentId: string | null): ITreeItem[] => {
    return assets
      .filter(
        (asset) => asset.locationId === parentId || asset.parentId === parentId
      )
      .map((asset) => ({
        id: asset.id,
        label: asset.name,
        type: asset.sensorType ? "component" : "asset",
        status: asset.status || null,
        data: asset,
        children: buildAssetTree(asset.id),
      }));
  };

  return [...buildLocationTree(null)];
}
