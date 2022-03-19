import React, { useState } from 'react';
import { Datos } from "./Datos/Datos";
import { Header } from "./Header/Header";
import { Resultado } from './Resultado/Resultado';

export function App() {

    const [datos, setDatos] = useState({
        nombre: null,
        fecha: null
    });

    return (
        <React.Fragment>
            <Header />
            <Datos datos={setDatos} />
            <Resultado datos={datos} />
        </React.Fragment>
    )
}
