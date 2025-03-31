export type Vehicle = {
  objectId: string;
  placa: string;
  fabricante: string;
  cor: string;
  codigo: string;
  modelo: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateVehicle = Omit<
  Vehicle,
  "objectId" | "createdAt" | "updatedAt"
>;
