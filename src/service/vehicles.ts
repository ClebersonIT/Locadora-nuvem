import { CreateVehicle, Vehicle } from "@/types/vehicle";
import { api } from "./api";

export const VehicleService = {
  getAll: async (): Promise<Vehicle[]> => await api.get("/Veiculo/"),
  findById: async (id: string): Promise<Vehicle> =>
    await api.get(`/Veiculo/${id}`),
  create: async (params: CreateVehicle): Promise<Vehicle> =>
    await api.post("/Veiculo/", params),
  delete: async (params: CreateVehicle, id: string): Promise<void> =>
    await api.delete(`/Veiculo/${id}`, { data: params }),
  edit: async (params: CreateVehicle, id: string): Promise<void> =>
    await api.put(`/Veiculo/${id}`, params),
};
