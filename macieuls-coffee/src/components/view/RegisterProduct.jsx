import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterProduct() {
    const [product, setProduct] = useState({
        token: '6efd0c319c124eb659fe58526a54834e82138dc3',
        nome: '',
        idCategoria: 0,
        foto: '',
        preco: 0,
        descricao: ''
    });
    const API_URL = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/produto';
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        console.log("Produto no handleChange:", product);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = parseInt(e.target.value, 10);
        setProduct({ ...product, idCategoria: selectedCategory });
        console.log("Produto no handleCategoryChange:", product);
    };

    const handlePriceChange = (e) => {
        const selectedPrice = parseFloat(e.target.value);
        setProduct({ ...product, preco: selectedPrice });
        console.log("Produto no handlePriceChange:", product);
    };

    const handleRegisterProduct = async (e) => {
        e.preventDefault();

        // Criação de FormData dentro do handleRegisterProduct
        const formData = new FormData();
        formData.append('token', product.token);
        formData.append('nome', product.nome);
        formData.append('idCategoria', String(product.idCategoria));
        formData.append('foto', product.foto);
        formData.append('preco', String(product.preco));  // Garantir que preco é string
        formData.append('descricao', product.descricao);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData
            });

            console.log('Resposta da API: ', response); // Verifique a resposta (status)

            // Verifica se o status da resposta é 201 (Created)
            if (response.status === 201) {
                console.log("Produto criado com sucesso");
                navigate('/');  // Navegar para a página principal ou outra após o sucesso
            } else {
                const errorText = await response.text(); // Pega a resposta como texto, caso tenha algo
                console.log("Erro ao criar produto:", errorText); // Exibe o erro para diagnóstico
                alert("Erro ao criar produto: " + errorText); // Alerta com a resposta de erro
            }
        } catch (error) {
            console.log("Erro ao criar produto: [500]", error);
            setError(error);  // Atualiza o estado de erro se ocorrer algum erro
        }
    };



    return (
        <div>
            <form onSubmit={handleRegisterProduct}>
                <label htmlFor="nome">Nome do produto:</label>
                <input
                    type="text"
                    name="nome"
                    value={product.nome}
                    onChange={handleChange}
                />

                <label htmlFor="foto">URL da foto do produto:</label>
                <input
                    type="text"
                    name="foto"
                    value={product.foto}
                    onChange={handleChange}
                />

                <label htmlFor="descricao">Descrição: </label>
                <input
                    type="text"
                    name="descricao"
                    value={product.descricao}
                    onChange={handleChange}
                />

                <label htmlFor="preco">Preço do produto:</label>
                <input
                    type="number"
                    name="preco"
                    value={product.preco}
                    onChange={handlePriceChange}
                />

                <label htmlFor="idCategoria">Escolha uma categoria</label>
                <select
                    name="idCategoria"
                    id="idCategoria"
                    value={product.idCategoria}
                    onChange={handleCategoryChange}
                >
                    <option value='1'>Bolos</option>
                    <option value='2'>Bebidas</option>
                </select>

                <button type="submit">Cadastrar</button>
            </form>
            {error && (<p>{error.message}</p>)}
        </div>
    );
}

export default RegisterProduct;
