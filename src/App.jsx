import React, { useState } from 'react';
import { Datos } from "./Datos/Datos";
import { Header } from "./Header/Header";
import { Resultado } from './Resultado/Resultado';

export function App() {

    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');

    return (
        <React.Fragment>
            <Header />
            <Datos nombre={setNombre} fecha={setFecha} />
            <Resultado nombre={nombre} fecha={fecha} />
        </React.Fragment>
    )
}
