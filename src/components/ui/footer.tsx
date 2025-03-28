import React from "react";

export default function Footer() {
    return (
        <div className="flex flex-col items-end w-full">
            <div className="block lg:flex justify-center w-full border-t-2 border-solid border-sec_green bottom-0 h-20">
                <div className="flex flex-col justify-center w-full lg:w-1/3 text-center font-medium mt-4 lg:mt-0 pt-0 uppercase text-sm lg:text-xl text-font_footer font-openSans_bold">
                    <p className="text-xs xl:text-sm mb-2 font-semibold">
                        SSPDS.CE.GOV.BR
                    </p>
                    <h2 className=" text-font_footer text-xxs xl:text-xs font-openSans_bold ">
                        © 2017 - 2023 – GOVERNO DO ESTADO DO CEARÁ TODOS OS DIREITOS
                        RESERVADOS
                    </h2>
                </div>
                <div className="w-full lg:w-1/3 mt-4 lg:mt-0 px-1 flex flex-col justify-center text-center xl:text-start">
                    <h2 className="font-openSans_bold text-xs xl:text-sm leading-6 font-semibold uppercase mb-2  sm:mb-0">
                        SECRETARIA DA SEGURANÇA PÚBLICA E DEFESA SOCIAL
                    </h2>

                    <p className="font-openSans_bold text-xxs xl:text-xs leading-2 mb-6 lg:mb-0 uppercase">
                        Av. Aguanambi, s/n - Aeroporto, Fortaleza - CE, 60415-390 TELEFONE:
                        (85) 3101-6501
                    </p>
                </div>
                <div className="w-full lg:w-1/3 flex flex-wrap flex-col justify-center px-1 text-center xl:text-start">
                    <h1 className="font-openSans_bold text-xs xl:text-sm leading-6 uppercase font-semibold mb-2">
                        Desenvolvido por:
                    </h1>
                    <div className="font-openSans_semibold text-xxs xl:text-xs leading-4 uppercase mb-6 lg:mb-0">
                        <p>
                            <b>COTIC</b> - Coordenadoria de Tecnologia da Informação e
                            Comunicação
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
