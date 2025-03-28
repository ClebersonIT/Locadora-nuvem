import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold mt-9 text-6x1">
        Página 404 não encontrada!
      </h1>
      <p>Essa págia não existe</p>

      <Link href="/">Voltar</Link>
    </div>
  );
}
