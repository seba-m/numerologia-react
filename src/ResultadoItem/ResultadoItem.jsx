import styles from './ResultadoItem.module.scss';

export function ResultadoItem({ resultado }) {
    return (
        <li className="accordion-item">
            <h2 className="accordion-header" id={`heading${resultado.id}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${resultado.id}`}
                    aria-expanded="false" aria-controls={`collapse${resultado.id}`}>
                    {`${resultado.nombre}: ${resultado.numero}`}
                </button>
            </h2>
            <div id={`collapse${resultado.id}`} className="accordion-collapse collapse" aria-labelledby={`heading${resultado.id}`}
                data-bs-parent="#resultado">
                <div className="accordion-body">
                    {
                        resultado.letrasPitagoricas &&
                        <p className={styles.paso}>
                            Letras usadas: {resultado.letrasPitagoricas.map((l) => l.letra).join(', ')}
                            <br />
                            Valor por letra: {resultado.letrasPitagoricas
                                .filter((value, index, self) => index === self.findIndex((t) => t.letra === value.letra))
                                //((l, i) => resultado.letrasPitagoricas.indexOf(l) === i)
                                .map((l) => l.letra + ": " + l.valor).join(', ')}
                        </p>
                    }
                    {resultado.pasos.map((p) => (
                        <p key={p.numero} className={styles.paso}>
                            paso {p.numero}: {p.suma} = {p.resultado}
                        </p>
                    ))}

                </div>
            </div>
        </li>
    )
}