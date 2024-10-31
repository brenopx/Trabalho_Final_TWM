import React from "react";
import { IconShoppingCart } from '@tabler/icons-react';

export default function IconeCarrinho(props) {
    return (
        <div className="flex justify-center items-center rounded-full 
            w-14 h-14 bg-purple-950  relative">
            <IconShoppingCart size={30} stroke={1.3} color="white"/>
            <div className="absolute top-2 right-2 bg-pink-500 
                text-white text-xs font-semibold rounded-full 
                w-5 h-5 flex items-center justify-center">
                {props.qtdeItens ?? 0}
            </div>
        </div>
    )
}
