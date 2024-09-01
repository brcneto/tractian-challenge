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
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string | null;
  locationId?: string | null;
}

type ITreeItem = {
  id: string;
  label: {
    icon: string;
    title: string;
  };
  children?: TreeNode[];
  data: ILocation | IAsset;
  status?: string | null;
};
