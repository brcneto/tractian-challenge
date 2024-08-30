import { IAsset, ICompany, ILocation } from "@/@types";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://fake-api.tractian.com/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const Company = {
  getCompanies: (): Promise<ICompany[]> => requests.get("companies"),
  getLocations: (companyId: string): Promise<ILocation[]> =>
    requests.get(`companies/${companyId}/locations`),
  getAssets: (companyId: string): Promise<IAsset[]> =>
    requests.get(`companies/${companyId}/assets`),
};
