import Link from "next/link";

export function Header(){
    return (
      <header className="flex px-2 py-2 py-4 bg-blue-900 text-white">
        <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
            <div>
                Locadora de Veículos
            </div>
            <nav>
                <ul className="flex items-center justify-center gap-2">
                    <li className="px-6 bg-blue-900 rounded-lg hover:bg-blue-700">
                        <Link href='/'>
                            Home
                        </Link>
                    </li>
                    <li className="px-6 bg-blue-900 rounded-lg hover:bg-blue-700">
                        <Link href='/veiculos'>
                            Veículos
                        </Link>
                    </li>
                    <li className="px-6 bg-blue-900 rounded-lg hover:bg-blue-700">
                        <Link href='/'>
                            Sair
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
    )
  }