import { useEffect } from 'react';
import { ResultadoItem } from '../ResultadoItem/ResultadoItem';
import styles from './Resultado.module.scss';

export function Resultado({ nombre, fecha }) {

    useEffect(() => {
        console.log('nombre: ', nombre);
        console.log('fecha: ', fecha);

    }, [nombre, fecha]);

    if (!nombre || !fecha) {
        return <div></div>
    }

    const resultados = [];

    return (
        <section className={styles.resultado}>
            <h2 className={styles.titulo}>Resultado:</h2>
            <ul id="resultado" className="accordion">
                {resultados.map((movie) => (
                    <ResultadoItem key={movie.id} movie={movie} />
                ))}
            </ul>
        </section>
    )
}