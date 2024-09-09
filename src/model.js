
export class Animal {
    constructor(nome, tamanho, biomas, carnivoro) {
        this.nome = nome;
        this.tamanho = tamanho;
        this.biomas = biomas;
        this.carnivoro = carnivoro;
    }
}

export class Recinto {
    constructor(id, biomas, tamanho, tamanhoLivre, animais) {
        this.id = id;
        this.biomas = biomas;
        this.tamanho = tamanho;
        this.tamanhoLivre = tamanhoLivre;
        this.animais = animais;
    }

    // retorna se contem um dos biomas passados
    ContemAlgumBioma(biomas) {
        for (let b in biomas) {
            if (this.biomas.includes(biomas[b]))
                return true;
        }
        return false;
    }
}
