module.exports = class Car {
    /**
     * @param {number} id
     * @param {string} marca
     * @param {string} modelo
     * @param {number} anio
     * @param {number} kms
     * @param {string} color
     * @param {string} aire_acondicionado
     * @param {number} pasajeros
     * @param {string} automatico
     * */
    constructor({
            id,
            marca,
            modelo,
            anio,
            kms,
            color,
            aire_acondicionado,
            pasajeros,
            automatico
        }
    ) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.kms = kms;
        this.color = color;
        this.aire_acondicionado = aire_acondicionado;
        this.pasajeros = pasajeros;
        this.automatico = automatico;
    }
}
