import React, { useState } from "react";
import { ExitToApp } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import { KeycloakService } from "@/services/keycloak";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Menu({ onLogout }: any) {
  const handleLogoutClick = () => {
    onLogout();
  };
  return (
    <div className="absolute z-10 text-black shadow-md bg-white w-10 mt-1">
      <div className="cursor-pointer text-center" onClick={handleLogoutClick}>
        <p>Sair</p>
      </div>
    </div>
  );
}

export default function Header() {
  const { data } = useSession();

  const handleLogout = async () => {
    try {
      const token = data?.id_token;
      await KeycloakService.loggout(token || "");
      signOut();
    } catch (err: any) {
      console.error(err);
      toast.warn("Erro ao deslogar usuário");
    }
  };

  const siglaName = data?.user
    ? `${data.user.name.split(" ")[0].substring(0, 1)}${data.user.name
        .split(" ")[1]
        .substring(0, 1)}`
    : "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: session } = useSession();
  const roles = session?.roles;
  const isAdmin = roles?.includes("ROLE_ADMIN");

  return (
    <div className="flex items-center text-center">
      <header className="relative z-50 w-full flex items-center bg-gray-200">
        <div className="w-full text-right overflow-x-hidden">
          <div className=" w-full h-20 m-0 flex justify-start items-center p-4 bg-gradient-to-r from-header_strong_green to-header_light_green">
            <Link href="/" className="flex md:justify-start w-full">
              <div className="text-white px-5 flex items-center">
                <div className="md:text-3x1 sm:text-3xl mt-3">
                  {/* Gerenciador de conteúdo */}
                  <Image
                    width={120}
                    height={100}
                    alt=""
                    src={"/web/gerenciador-de-conteudo/images/logo_gc.svg"}
                    priority={true}
                    className="w-[140px] h-[100px] mb-4"
                  />
                </div>
              </div>

              <div className="border-solid border-[1px] border-slate-300 h-[40px] mx-2 shadow-2xl mt-11" />

              <Image
                className="mr-4"
                width={40}
                height={55}
                src={`/web/gerenciador-de-conteudo/images/brasao_ceara.svg`}
                alt="Início"
                priority={true}
              />

              <div className="text-white text-start hidden md:flex flex-col justify-center">
                <b className="text-xs sm:text-sm lg:text-lg">
                  SECRETARIA DA SEGURANÇA PÚBLICA E DEFESA SOCIAL
                </b>
                <p className="text-xxs sm:text-xs lg:text-sm">
                  GOVERNO DO ESTADO DO CEARÁ
                </p>
              </div>
            </Link>

            <div
              className="text-white text-sm flex items-center gap-1.5 pl-1 pt-3 pb-3"
              style={{ width: "200px", justifyContent: "flex-end" }}
            >
              <p className="text-start hidden md:flex text-base">
                {data?.user.name.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                ) || ""}
              </p>
              <div className="cursor-pointer" onClick={toggleMenu}>
                {/* <ExitToApp fontSize="large" /> */}
                <Avatar style={{ backgroundColor: "#f56a00" }}>
                  <AvatarImage
                  // src="https://github.com/shadcn.png"
                  // alt="@shadcn"
                  />
                  <AvatarFallback>{siglaName.toUpperCase()}</AvatarFallback>
                </Avatar>
                {isMenuOpen && <Menu onLogout={handleLogout} />}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center bg-white border-b-2 border-solid border-header_content_menu p-4 h-8 justify-between">
            <div className="h-full ">
              {/* <Image
                className="hidden lg:flex h-4"
                width={300}
                height={50}
                src={`/web/gerenciador-de-conteudo/images/bg-bottom-menu`}
                alt=""
              /> */}
            </div>
            {isAdmin && (
              <div className="text-green-600 flex justify-between items-center w-full sm:w-2/3 lg:w-1/3 xl:w-2/5 2xl:w-1/4 mr-0  text-sm font-medium">
                <Link
                  href="/"
                  className="hover:text-orange-600 flex justify-center items-center flex-1"
                >
                  {" "}
                  <p>Home</p>{" "}
                </Link>
                <Link
                  href="/desaparecidos"
                  className="hover:text-orange-600 px-4 border-x-2 border-green-400 flex justify-center items-center flex-1 h-fit"
                >
                  {" "}
                  <p>Desaparecidos</p>{" "}
                </Link>
                {/* <Link
                href="/procurados"
                className="hover:text-orange-600 flex justify-center items-center flex-2 px-4 "
              >
                <p>Procurados</p>
              </Link> */}
              </div>
            )}
          </div>

          <div className="w-full h-fit bg-no-repeat bg-slate-100">
            <Image
              className="w-full"
              width={300}
              height={100}
              src={`/web/gerenciador-de-conteudo/images/bg-bottom-menu.svg`}
              alt=""
              priority={true}
            />
          </div>
        </div>
      </header>
    </div>
  );
}
