import { IFilterTreeProps } from "@/@types";
import { filterTree } from "@/composables/structureTreeView";

addEventListener("message", (event: MessageEvent<IFilterTreeProps>) => {
  const { data, searchInputValue, filterByStatus, filterBySensorType } =
    event.data;
  console.log(event);

  console.log(data, searchInputValue, filterByStatus, filterBySensorType);

  const filteredTree = filterTree(
    data,
    searchInputValue,
    filterByStatus,
    filterBySensorType
  );

  console.log(filteredTree);

  postMessage(filteredTree);
});

// self.onmessage = function (e) {
//   const { data, searchValue, filterByStatus, filterBySensorType } = e.data;

// Função de filtragem da árvore
// export function filterTree(
//   items: ITreeItem[],
//   searchValue: string,
//   filterByStatus: boolean,
//   filterBySensorType: boolean
// ): ITreeItem[] {
//   return items
//     .map((item) => {
//       const matchTitle = item.label.title
//         .toLowerCase()
//         .includes(searchValue.toLowerCase());

//       // Verificar se o item é um ativo (IAsset)
//       const isComponent = "gatewayId" in item.data;
//       console.log(isComponent, item.label.title);

//       const matchStatus =
//         filterByStatus && isComponent
//           ? (item.data as IAsset)?.status === "alert"
//           : filterByStatus
//           ? false
//           : true;

//       const matchSensorType =
//         filterBySensorType && isComponent
//           ? (item.data as IAsset)?.sensorType === "energy"
//           : filterBySensorType
//           ? false
//           : true;

//       // Recursivamente filtrar os filhos
//       const filteredChildren = item.children
//         ? filterTree(
//             item.children,
//             searchValue,
//             filterByStatus,
//             filterBySensorType
//           )
//         : [];

//       const matchesCurrentItem =
//         isComponent && matchTitle && matchStatus && matchSensorType;

//       if (matchesCurrentItem || filteredChildren.length > 0) {
//         return {
//           ...item,
//           children: filteredChildren,
//         };
//       }

//       return null;
//     })
//     .filter((item) => item !== null);
// }

// const filteredData = filterTree(
//   data,
//   searchValue,
//   filterByStatus,
//   filterBySensorType
// );

// self.postMessage(filteredData);
// };
