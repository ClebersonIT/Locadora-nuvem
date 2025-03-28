'use client';

import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

const initialVehicleData: Vehicle = {
  id: 0,
  placa: '',
  cor: '',
  ano: 0,
  modelo: '',
  fabricante: ''
};

export default function EditarVeiculo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Captura o id da query string
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicleData);

  useEffect(() => {
    if (!id) return; // Se não houver ID, retorna sem fazer nada

    const fetchedVehicle = vehicleData.find(v => v.id === Number(id)); // Busca pelo id
    if (fetchedVehicle) {
      setVehicle(fetchedVehicle); // Atualiza o estado com o veículo encontrado
    } else {
      alert('Veículo não encontrado');
      router.push('/'); // Redireciona para a página inicial
    }
  }, [id, router]); // Dependência do id e do router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: name === 'ano' ? Number(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados atualizados:', vehicle);
    router.push('/'); // Redireciona após salvar
  };

  const handleCancel = () => {
    router.push('/veiculos'); // Redireciona para a página da tabela de veículos ao cancelar
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Veículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Placa:</label>
          <input
            type="text"
            name="placa"
            value={vehicle.placa}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
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
          />
        </div>
        <div>
          <label className="block mb-1">Ano:</label>
          <input
            type="number"
            name="ano"
            value={vehicle.ano}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
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
          />
        </div>
        <div className="text-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Salvar Alterações
          </button>

          <button
            type="button" // Alterado para 'button' ao invés de 'submit'
            onClick={handleCancel} // Adicionado evento de click para redirecionamento
            className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
