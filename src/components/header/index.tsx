"use client";
import { useUser } from "@/store/user";
import Link from "next/link";

export function Header() {
  const { data, setData } = useUser();
  const { isLogged } = data;
  const handleLoggout = () => {
    setData({
      email: "",
      isLogged: false,
      name: "",
      password: "",
      username: "",
    });
  };
  return (
    <header className="flex px-2 py-4 bg-blue-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
        <div>Locadora de Veículos</div>
        {isLogged && (
          <nav>
            <ul className="flex items-center justify-center gap-2">
              <li className="px-6 bg-blue-900 rounded-lg hover:bg-blue-700">
                <Link href="/">Home</Link>
              </li>
              <li className="px-6 bg-blue-900 rounded-lg hover:bg-blue-700">
                <Link href="/veiculos">Veículos</Link>
              </li>
              <li className="px-6 bg-blue-900 rounded-lg hover:bg-blue-700">
                <div onClick={handleLoggout} className="cursor-pointer">
                  Sair
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
