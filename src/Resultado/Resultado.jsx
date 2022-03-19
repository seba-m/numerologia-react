import { useEffect, useState } from 'react';
import styles from './Resultado.module.scss';

export function Resultado({ datos }) {

    useEffect(() => {
        console.log('nombre: ', datos.nombre);
        console.log('fecha: ', datos.fecha);
    }, [datos]);

    if (!datos.nombre || !datos.fecha) {
        return <div></div>
    }

    return (
        <section className={styles.resultado}>
            <h2 className={styles.titulo}>Resultado:</h2>
            <div id="resultado" className="accordion">

            </div>
        </section>
    )
}
