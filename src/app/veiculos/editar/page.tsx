"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { VehicleService } from "@/service/vehicles";
import { CreateVehicle, Vehicle } from "@/types/vehicle";
import { toast } from "react-toastify";
import { SkeletonForm } from "@/components/skeletonForm";

const initialVehicleData: Vehicle = {
  objectId: "",
  codigo: "",
  createdAt: "",
  updatedAt: "",
  placa: "",
  cor: "",
  modelo: "",
  fabricante: "",
};

export default function EditarVeiculo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Captura o id da query string
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicleData);

  const {
    data: vehicleFinded,
    isFetching: loadingVehicle,
    error: getVehicleError,
    refetch: refetchVehicle,
  } = useQuery({
    queryKey: ["FindVehicleById", id],
    queryFn: () => VehicleService.findById(id || ""),
  });

  const { mutate: editVehicle, isPending: editingVehicle } = useMutation({
    mutationFn: ({ params, id }: { params: CreateVehicle; id: string }) =>
      VehicleService.edit(params, id),
    onSuccess(data, variables, context) {
      toast.success("Veículo editado com sucesso");
      refetchVehicle();
    },
    onError(error, variables, context) {
      toast.error("Ocorreu um erro ao deletar veículo");
    },
  });

  useEffect(() => {
    if (!loadingVehicle && !getVehicleError && vehicleFinded) {
      setVehicle(vehicleFinded);
    }
  }, [loadingVehicle, getVehicleError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: name === "ano" ? Number(value) : value,
    });
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Dados atualizados:", vehicle);
      const { codigo, cor, fabricante, modelo, placa } = vehicle;
      const body: CreateVehicle = {
        codigo,
        cor,
        fabricante,
        modelo,
        placa,
      };
      editVehicle({ params: body, id: vehicle.objectId });
    },
    [vehicle]
  );

  const handleCancel = () => {
    router.push("/veiculos"); // Redireciona para a página da tabela de veículos ao cancelar
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Veículo</h1>
      {loadingVehicle ? (
        <SkeletonForm />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Placa:</label>
            <input
              type="text"
              name="placa"
              value={vehicle?.placa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Cor:</label>
            <input
              type="text"
              name="cor"
              value={vehicle?.cor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Codigo:</label>
            <input
              type="text"
              name="codigo"
              value={vehicle?.codigo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Modelo:</label>
            <input
              type="text"
              name="modelo"
              value={vehicle?.modelo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Fabricante:</label>
            <input
              type="text"
              name="fabricante"
              value={vehicle?.fabricante}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="text-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Salvar Alterações
            </button>

            <button
              type="button" // Alterado para 'button' ao invés de 'submit'
              onClick={handleCancel} // Adicionado evento de click para redirecionamento
              className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
