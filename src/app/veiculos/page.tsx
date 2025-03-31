"use client"; // Garantir que o componente seja tratado como Client Component

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { CreateVehicle, Vehicle } from "../../types/vehicle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { VehicleService } from "@/service/vehicles";
import { toast } from "react-toastify";
import { SkeletonTable } from "@/components/skeletonTable";

export default function VehicleTable() {
  const router = useRouter();

  const {
    data: vehicles,
    isFetching: loadingVehicles,
    error: getVehiclesError,
    refetch: refetchVehicles,
  } = useQuery({
    queryKey: ["GetAllVehicles"],
    queryFn: () => VehicleService.getAll(),
  });

  const { mutate: deleteVehicle, isPending: deletingVehicle } = useMutation({
    mutationFn: ({ params, id }: { params: CreateVehicle; id: string }) =>
      VehicleService.delete(params, id),
    onSuccess(data, variables, context) {
      toast.success("Veículo deletado");
      refetchVehicles();
    },
    onError(error, variables, context) {
      toast.error("Ocorreu um erro ao deletar veículo");
    },
  });

  const handleAddVehicleClick = () => {
    router.push("/veiculos/novo");
  };

  // Tipando o parâmetro 'id' como 'number'
  const handleEditVehicle = (id: string) => {
    router.push(`/veiculos/editar?id=${id}`);
  };

  // Função para excluir o veículo
  const handleDeleteVehicle = (params: CreateVehicle, id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este veículo?"
    );
    if (confirmDelete) {
      deleteVehicle({ params, id });
    }
  };

  const handleVoltar = () => {
    router.push("/"); // Redireciona para a página da tabela de veículos ao cancelar
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Veículos</h1>
      {loadingVehicles || deletingVehicle ? (
        <SkeletonTable />
      ) : (
        <Table className="w-full border border-gray-300">
          <TableHeader className="bg-green-700 text-white">
            <TableRow>
              <TableHead className="p-3">Código</TableHead>
              <TableHead className="p-3">Placa</TableHead>
              <TableHead className="p-3">Cor</TableHead>
              <TableHead className="p-3">Modelo</TableHead>
              <TableHead className="p-3">Fabricante</TableHead>
              <TableHead className="p-3 w-1/10">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles?.map((vehicle: Vehicle, index: number) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <TableCell className="p-3 border border-gray-300">
                  {vehicle.objectId}
                </TableCell>
                <TableCell className="p-3 border border-gray-300">
                  {vehicle.placa}
                </TableCell>
                <TableCell className="p-3 border border-gray-300">
                  {vehicle.cor}
                </TableCell>
                <TableCell className="p-3 border border-gray-300">
                  {vehicle.modelo}
                </TableCell>
                <TableCell className="p-3 border border-gray-300">
                  {vehicle.fabricante}
                </TableCell>
                <TableCell className="p-2 flex space-x-2 w-1/10">
                  <button
                    onClick={() => handleEditVehicle(vehicle.objectId)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Alterar
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteVehicle(vehicle, vehicle.objectId)
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="mt-4 text-center space-x-4">
        <button
          onClick={handleAddVehicleClick}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Cadastrar Novo Veículo
        </button>

        <button
          type="button"
          onClick={handleVoltar}
          className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 cursor-pointer"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
