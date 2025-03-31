import { CreateVehicle, Vehicle } from "@/types/vehicle";
import { api } from "./api";

export const VehicleService = {
  getAll: async (): Promise<Vehicle[]> => await api.get("/classes/Veiculo/"),
  findById: async (id: string): Promise<Vehicle> =>
    await api.get(`/classes/Veiculo/${id}`),
  create: async (params: CreateVehicle): Promise<Vehicle> =>
    await api.post("/classes/Veiculo/", params),
  delete: async (params: CreateVehicle, id: string): Promise<void> =>
    await api.delete(`/classes/Veiculo/${id}`, { data: params }),
  edit: async (params: CreateVehicle, id: string): Promise<void> =>
    await api.put(`/classes/Veiculo/${id}`, params),
};
