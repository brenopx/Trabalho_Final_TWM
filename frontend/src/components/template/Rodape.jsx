import React from "react";
import {
    IconBrandWhatsapp,
} from '@tabler/icons-react';
import Logo from '../shared/Logo';

export default function Rodape() {
    return (
        <footer className="flex flex-col bg-black/30 text-zinc-400 mt-6">
            <div className="h-px bg-gradient-to-r from-violet-600/20 via-violet-600/80 to-violet-600/20"></div>
            <div className="container flex flex-col py-1 gap-1">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-5 md:gap-0">
                    <Logo />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-zinc-200 pb-1">Sobre</span>
                        <span className="text-sm">Nossa História</span>
                        <span className="text-sm">Política de Privacidade</span>
                        <span className="text-sm">Termos de Uso</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-zinc-200 pb-1">Contato</span>
                        <span className="text-sm">suporte@loja-gamer.com</span>
                        <div className=" text-sm flex items-center gap-1 justify-center md:justify-start">
                            <IconBrandWhatsapp size={10} className="text-green-500" />
                            <span>WhatsApp</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
