"use client";

import { redirect, usePathname } from "next/navigation";
import { useUser } from "@/store/user";
import LoginPage from "@/app/login/page";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useUser();
  const { isLogged } = data;
  const pathname = usePathname();
  const isRegisterPage = pathname === "/login/cadastrar/"; // Ajuste conforme sua rota
  return isLogged || isRegisterPage ? <>{children}</> : <LoginPage />;
}
