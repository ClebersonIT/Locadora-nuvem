'use client'; // Garantir que o componente seja tratado como Client Component

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation'; // Usar o useRouter de next/navigation para navegação no lado do cliente
import { useState } from "react";

// Tipo para os dados dos veículos
interface Vehicle {
  id: number;
  placa: string;
  cor: string;
  ano: number;
  modelo: string;
  fabricante: string;
}

const vehicleData: Vehicle[] = [
  { id: 1, placa: 'ABC1234', cor: 'Preto', ano: 2020, modelo: 'Onix', fabricante: 'Chevrolet' },
  { id: 2, placa: 'DEF5678', cor: 'Branco', ano: 2022, modelo: 'Corolla', fabricante: 'Toyota' },
  { id: 3, placa: 'GHI9012', cor: 'Azul', ano: 2021, modelo: 'Civic', fabricante: 'Honda' },
  { id: 4, placa: 'JKL3456', cor: 'Vermelho', ano: 2019, modelo: 'Gol', fabricante: 'Volkswagen' },
  { id: 5, placa: 'MNO7890', cor: 'Prata', ano: 2023, modelo: 'HB20', fabricante: 'Hyundai' },
];

export default function VehicleTable() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehicleData);

  const handleAddVehicleClick = () => {
    router.push('/veiculos/novo');
  };

  // Tipando o parâmetro 'id' como 'number'
  const handleEditVehicle = (id: number) => {
    router.push(`/veiculos/editar?id=${id}`);
  };

  // Função para excluir o veículo
  const handleDeleteVehicle = (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este veículo?');
    if (confirmDelete) {
      // Filtra os veículos, removendo o que foi excluído
      const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
      setVehicles(updatedVehicles);
      console.log(`Veículo com ID: ${id} excluído com sucesso!`);
      // Aqui você pode adicionar a chamada para a API que exclui o veículo do banco de dados, por exemplo
    }
  };

  const handleVoltar = () => {
    router.push('/'); // Redireciona para a página da tabela de veículos ao cancelar
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Veículos</h1>
      <Table className="w-full border border-gray-300">
        <TableHeader className="bg-green-700 text-white">
          <TableRow>
            <TableHead className="p-3">Código</TableHead>
            <TableHead className="p-3">Placa</TableHead>
            <TableHead className="p-3">Cor</TableHead>
            <TableHead className="p-3">Ano</TableHead>
            <TableHead className="p-3">Modelo</TableHead>
            <TableHead className="p-3">Fabricante</TableHead>
            <TableHead className="p-3 w-1/10">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle: Vehicle, index: number) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <TableCell className="p-3 border border-gray-300">{vehicle.id}</TableCell>
              <TableCell className="p-3 border border-gray-300">{vehicle.placa}</TableCell>
              <TableCell className="p-3 border border-gray-300">{vehicle.cor}</TableCell>
              <TableCell className="p-3 border border-gray-300">{vehicle.ano}</TableCell>
              <TableCell className="p-3 border border-gray-300">{vehicle.modelo}</TableCell>
              <TableCell className="p-3 border border-gray-300">{vehicle.fabricante}</TableCell>
              <TableCell className="p-2 flex space-x-2 w-1/10">
                <button
                  onClick={() => handleEditVehicle(vehicle.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Alterar
                </button>
                <button
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Excluir
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-center space-x-4">
        <button
          onClick={handleAddVehicleClick}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Cadastrar Novo Veículo
        </button>

        <button
          type="button"
          onClick={handleVoltar}
          className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
