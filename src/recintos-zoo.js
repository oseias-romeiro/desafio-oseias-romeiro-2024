import { animais, recintos } from './data.js';

class RecintosZoo {
    
    analisaRecintos(animal, quantidade) {
        if (animais.data[animal] === undefined)
            return {erro: 'Animal inválido'};
        else if (quantidade <= 0)
            return {erro: 'Quantidade inválida'};
        
        const rs = recintos.buscarRecintos(animal, quantidade);
        if (rs.length === 0)
            return {erro: 'Não há recinto viável'};
        
        console.log(rs);
        return {erro: false, recintosViaveis: rs}
    }
}

export { RecintosZoo as RecintosZoo };
