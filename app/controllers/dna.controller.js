const db = require("../models");
const Dna = db.dna;
const Op = db.Sequelize.Op;

// Analiza si la secuencia es de un mutante o no
exports.analizar = (req, res) => {
    const cantidadRepeticiones = 4;
    const secuencia = req.body.dna
    const esMutante = secuencia && (secuencia.length >= cantidadRepeticiones) ? validarSecuencia(secuencia, cantidadRepeticiones) : false;

    const dna = {
        secuencia: secuencia.join('|'),
        esMutante: esMutante,
    };

    Dna.create(dna)
        .then(data => {
            res.status(esMutante ? 200 : 403).send();
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al guardar la secuencia analizada."
            });
        });
};

// Devuelve la cantidad de DNA mutantes y humanos encontrados
exports.estadistica = (req, res) => {
    Dna.findAll()
        .then(data => {
            const cantidadMutantes = data.filter(secuencia => !!secuencia.esMutante).length;
            const cantidadHumanos = data.length - cantidadMutantes;
            const ratio = 0;// (cantidadMutantes / cantidadHumanos).toFixed(2);
            res.send({ count_mutant_dna: cantidadMutantes, count_human_dna: cantidadHumanos, ratio: ratio });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las estadísticas."
            });
        });
};

validarSecuencia = (secuencia, cantidadRepeticiones) => {
    let cantidadSecuenciasRepetidas = 0;
    for (var i = 0; i < secuencia.length; i++) {
        cantidadSecuenciasRepetidas += validarDna(secuencia[i]);
        if (cantidadSecuenciasRepetidas >= 2) {
            break;
        }
    }

    if (cantidadSecuenciasRepetidas < 2) {
        for (var i = 0; i < secuencia.length; i++) {
            var combinacion = '';
            for (var j = 0; j < secuencia.length; j++) {
                combinacion += secuencia[j][i];
            }
            cantidadSecuenciasRepetidas += validarDna(combinacion);
            if (cantidadSecuenciasRepetidas >= 2) {
                break;
            }
        }
    }

    if (cantidadSecuenciasRepetidas < 2) {
        var diagonalPrincipal = '';
        var diagonalSecundaria = '';
        for (var i = 0; i < secuencia.length; i++) {
            diagonalPrincipal += secuencia[i][i];
            diagonalSecundaria += secuencia[secuencia.length - i - 1][i];
        }
        cantidadSecuenciasRepetidas += validarDna(diagonalPrincipal);
        if (cantidadSecuenciasRepetidas < 2) {
            cantidadSecuenciasRepetidas += validarDna(diagonalSecundaria);
            if (cantidadSecuenciasRepetidas < 2 && secuencia.length > cantidadRepeticiones) {
                var limite = secuencia.length - cantidadRepeticiones;
                for (var i = 1; i <= limite; i++) {
                    var combinacionPrincipalInferior = '';
                    var combinacionSecundariaInferior = '';
                    var combinacionPrincipalSuperior = '';
                    var combinacionSecundariaSuperior = '';
                    for (var j = 0; j < (secuencia.length - i); j++) {
                        combinacionPrincipalInferior += secuencia[j + i][j];
                        combinacionSecundariaInferior += secuencia[j + i][secuencia.length - j - 1];
                        combinacionPrincipalSuperior += secuencia[j][j + i];
                        combinacionSecundariaSuperior += secuencia[j][secuencia.length - j - i - 1];
                    }

                    cantidadSecuenciasRepetidas += validarDna(combinacionPrincipalInferior);
                    if (cantidadSecuenciasRepetidas < 2) {
                        cantidadSecuenciasRepetidas += validarDna(combinacionSecundariaInferior);
                        if (cantidadSecuenciasRepetidas < 2) {
                            cantidadSecuenciasRepetidas += validarDna(combinacionPrincipalSuperior);
                            if (cantidadSecuenciasRepetidas < 2) {
                                cantidadSecuenciasRepetidas += validarDna(combinacionSecundariaSuperior);
                                if (cantidadSecuenciasRepetidas >= 2) {
                                    break;
                                }
                            } else { break; }
                        } else { break; }
                    } else { break; }
                }
            }
        }
    }

    return (cantidadSecuenciasRepetidas >= 2)
}

validarDna = (combinacionDna) => {
    const regExp = new RegExp(/([atcg])\1{3}/gm);
    const repeticiones = combinacionDna.toLowerCase().match(regExp);
    return repeticiones ? repeticiones.length : 0;
}