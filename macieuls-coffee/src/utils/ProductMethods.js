import axios from "axios";

const API_URL = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/produto';
const TOKEN = '6efd0c319c124eb659fe58526a54834e82138dc3';

export const UseProducts = async () => {
    try {
        const response = await fetch(`${API_URL}?token=${TOKEN}`, {
            method: 'GET',
        });

        if (response.status === 200) {
            return await response.json(); // Retorna os produtos
        } else if (response.status === 204) {
            return []; // Sem conteúdo, retorna um array vazio
        } else {
            console.error("Erro na API: ", response.status);
            return [];
        }
    } catch (error) {
        console.error("Erro interno ao obter produtos da API: ", error);
        return [];
    }
};

export const deleteProduct = async ({ idProduct }) => {
    try {
        console.log("O id q ta vindo: ", idProduct);
        const response = await axios.delete(`${API_URL}?token=${TOKEN}&idProduto=${idProduct}`);
        return response;
    } catch (error) {
        throw new Error("Erro ao deletar produto da API: " + error);

    }
};
