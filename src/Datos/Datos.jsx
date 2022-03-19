import React from 'react';
import styles from './Datos.module.scss';

export function Datos({ nombre, fecha }) {

    function handleName(e) {
        nombre(e.target.value);
    }

    function handleDate(e) {
        fecha(e.target.value);
    }

    return (
        <section className={styles.datos}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input className="form-control input-block-level" onChange={handleName} type="text" id="nombre" placeholder="Ingrese un nombre" aria-describedby="nombre" />
            </div>

            <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input className="form-control input-block-level" onChange={handleDate} type="date" id="fecha" aria-describedby="fecha" />
            </div>
        </section>
    )
    /*
        <div className="form-group">
            <label htmlFor="verificar">&nbsp;</label>
            <button className="form-control btn btn-primary" id="verificar" aria-describedby="Verificar">Verificar</button>
        </div>
    */
}
