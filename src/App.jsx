import React, { useState } from 'react';
import { Datos } from "./Datos/Datos";
import { Header } from "./Header/Header";
import { Resultado } from './Resultado/Resultado';
import { useDebounce } from './Hooks/useDebounce';

export function App() {

    const [nombre, setNombre] = useState();
    const [fecha, setFecha] = useState();

    const debouncedNombre = useDebounce(nombre, 500);
    const debouncedFecha = useDebounce(fecha, 500);

    return (
        <React.Fragment>
            <Header />
            <Datos nombre={setNombre} fecha={setFecha} />
            <Resultado nombre={debouncedNombre} fecha={debouncedFecha} />
        </React.Fragment>
    )
}
