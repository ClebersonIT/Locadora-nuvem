"use client";

import { CreateVehicle } from "@/types/vehicle";
import { SkeletonForm } from "@/components/skeletonForm";
import { VehicleService } from "@/service/vehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const initialVehicleData: CreateVehicle = {
  placa: "",
  cor: "",
  modelo: "",
  fabricante: "",
  codigo: "",
};

export default function CadastrarVeiculo() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<CreateVehicle>(initialVehicleData);
  const queryClient = useQueryClient();

  const { mutate: createVehicle, isPending: creatingVehicle } = useMutation({
    mutationFn: (params: CreateVehicle) => VehicleService.create(params),
    onSuccess(data, variables, context) {
      toast.success("Veículo criado");
      queryClient.invalidateQueries({ queryKey: ["GetAllVehicles"] });
      router.push("/veiculos");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: name === "ano" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo veículo cadastrado:", vehicle);
    createVehicle(vehicle);
  };

  const handleCancel = () => {
    router.push("/veiculos"); // Redireciona para a página de listagem de veículos
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Cadastrar Novo Veículo
      </h1>
      {creatingVehicle ? (
        <SkeletonForm />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Placa:</label>
            <input
              type="text"
              name="placa"
              value={vehicle.placa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Cor:</label>
            <input
              type="text"
              name="cor"
              value={vehicle.cor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Codigo:</label>
            <input
              type="text"
              name="codigo"
              value={vehicle.codigo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Modelo:</label>
            <input
              type="text"
              name="modelo"
              value={vehicle.modelo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Fabricante:</label>
            <input
              type="text"
              name="fabricante"
              value={vehicle.fabricante}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="text-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Cadastrar
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
