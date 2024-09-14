import { ReactNode } from "react";

export interface ICompany {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId: string | null;
}

export interface IAsset {
  id: string;
  name: string;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: "vibration" | "energy" | null;
  status?: "alert" | "operating" | null;
  gatewayId?: string | null;
  locationId?: string | null;
}

type ITreeItem = {
  id: string;
  label: {
    icon: string;
    title: string;
  };
  children?: ITreeItem[];
  data: ILocation | IAsset;
  status?: string | null;
};

export interface IFilterTreeProps {
  data: ITreeItem[];
  searchInputValue: string;
  filterByStatus: boolean;
  filterBySensorType: boolean;
}
