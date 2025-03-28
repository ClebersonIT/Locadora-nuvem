'use client'

import { useState } from "react"

export function Button() {
    const [nome, setNome] = useState("Retornar")

    function handleChangeName() {
        setNome("Retornar")
    }
    
    return (
        <div>
            <button onClick={handleChangeName}>Voltar</button>
        </div>
    )
}