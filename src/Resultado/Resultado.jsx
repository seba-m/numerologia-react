import { ResultadoItem } from '../ResultadoItem/ResultadoItem';
import { Calculo } from '../Hooks/Calculo';
import styles from './Resultado.module.scss';

export function Resultado({ nombre, fecha }) {

    if (!nombre || nombre.length < 3 || !fecha || isNaN(Date.parse(fecha))) {
        return <div></div>
    }

    const resultados = Calculo(nombre, fecha);

    return (
        <section className={styles.resultado}>
            <h2 className={styles.titulo}>Resultado</h2>
            <ul id="resultado" className="accordion">
                {resultados.map((r) => (
                    <ResultadoItem key={r.id} resultado={r} />
                ))}
            </ul>
        </section>
    )
}