import { ITreeItem, ILocation, IAsset } from "@/@types";

export function structureTree(locations: ILocation[], assets: IAsset[]) {
  const buildLocationTree = (parentId: string | null): ITreeItem[] => {
    return locations
      .filter((location) => location.parentId === parentId)
      .map((location) => ({
        id: location.id,
        label: {
          icon: "material-symbols:location-on-outline",
          title: location.name,
        },
        data: location,
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
        label: {
          icon: asset?.sensorType
            ? "material-symbols-light:component-exchange"
            : "tabler:cube",
          title: asset.name,
        },
        status: asset.status || null,
        data: asset,
        children: buildAssetTree(asset.id),
      }));
  };

  return [...buildLocationTree(null)];
}
export function filterTree(
  items: ITreeItem[],
  searchValue: string,
  filterByStatus: boolean,
  filterBySensorType: boolean
): ITreeItem[] {
  return items
    .map((item) => {
      const matchTitle = item.label.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const isComponent = "gatewayId" in item.data;

      const matchStatus =
        filterByStatus && isComponent
          ? (item.data as IAsset)?.status === "alert"
          : filterByStatus
          ? false
          : true;

      const matchSensorType =
        filterBySensorType && isComponent
          ? (item.data as IAsset)?.sensorType === "energy"
          : filterBySensorType
          ? false
          : true;

      const filteredChildren = item.children
        ? filterTree(
            item.children,
            searchValue,
            filterByStatus,
            filterBySensorType
          )
        : [];

      const matchesCurrentItem =
        isComponent && matchTitle && matchStatus && matchSensorType;

      if (matchesCurrentItem || filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter((item) => item !== null);
}

export function checkIfComponent(data: IAsset | ILocation): data is IAsset {
  return !!(data as IAsset).sensorType;
}
