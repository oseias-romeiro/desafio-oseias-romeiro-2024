import { Animal, Recinto } from "./model"

class Animais {
    constructor() {
        this.data = {
            "LEAO": new Animal("LEAO", 3, ["savana"], true),
            "LEOPARDO": new Animal("LEOPARDO", 2, ["savana"], true),
            "CROCODILO": new Animal("CROCODILO", 3, ["rio"], true),
            "MACACO": new Animal("MACACO", 1, ["savana", "floresta"], false),
            "GAZELA": new Animal("GAZELA", 2, ["savana"], false),
            "HIPOPOTAMO": new Animal("HIPOPOTAMO", 4, ["savana", "rio"], false),
        };
    }
}

const animais = new Animais();

class Recintos {
    constructor() {
        this.data = {
            1: new Recinto(1, ["savana"], 10, 7, {"MACACO": 3}),
            2: new Recinto(2, ["floresta"], 5, 5, {}),
            3: new Recinto(3, ["savana", "rio"], 7, 5, {"GAZELA": 1}),
            4: new Recinto(4, ["rio"], 8, 8, {}),
            5: new Recinto(5, ["savana"], 9, 6, {"LEAO": 1})
        };
    }

    podeCoabitar(recinto, animal) {
        // 4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
        if (Object.keys(recinto.animais).length > 0 &&
            animal.nome === "HIPOPOTAMO" && !(
                recinto.biomas.includes("savana") &&
                recinto.biomas.includes("rio")
            )
        )
            return false;
        // 2) Animais carnívoros devem habitar somente com a própria espécie
        for (let a in recinto.animais) {
            // 4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            if (a === "HIPOPOTAMO" && !(
                recinto.biomas.includes("savana") &&
                recinto.biomas.includes("rio")
            ))
                return false;
            
            if (animal.carnivoro && a !== animal.nome ||
                !animal.carnivoro && animais.data[a].carnivoro
            ){
                return false;
            }
        }

        return true;
    }

    buscarRecintos(animal, quantidade) {
        let rs = []
        let tamanhoLivre = 0;
        for(let r in this.data) {
            const recinto = this.data[r];
            const animalData = animais.data[animal];
            if (
                recinto.tamanhoLivre >= animalData.tamanho * quantidade && // 1.b) Um animal se sente confortável se está com espaço suficiente para cada indivíduo
                recinto.ContemAlgumBioma(animalData.biomas) && // 1.a) Um animal se sente confortável se está num bioma adequado
                !(quantidade === 1 && animal === "MACACO" && Object.keys(recinto.animais).length === 0) && // 5) Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
                this.podeCoabitar(recinto, animalData)
            ) {
                tamanhoLivre = recinto.tamanhoLivre - animalData.tamanho * quantidade;

                // 6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
                if(
                    Object.keys(recinto.animais).length > 0 &&
                    recinto.animais[animalData.nome] === undefined
                ){
                    tamanhoLivre -= 1;
                }
                if (tamanhoLivre >= 0){
                    rs.push(`Recinto ${r} (espaço livre: ${tamanhoLivre} total: ${recinto.tamanho})`);
                }
            }
        }
        return rs;
    }
}

const recintos = new Recintos();

export { animais, recintos };