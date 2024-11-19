import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, UseProducts } from "../../utils/ProductMethods";
import Modal from "../structure/Modal";

function Products() {
    const API_URL = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/produto';
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        idProduto: 0,
        nome: '',
        idCategoria: 0,
        foto: '',
        preco: 0.0,
        descricao: ''
    });
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const navigate = useNavigate();
    const TOKEN = '6efd0c319c124eb659fe58526a54834e82138dc3';

    const render = async () => {
        try {
            const response = await UseProducts();
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        render();
    }, []);


    const handleRegister = () => {
        navigate('/register');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = Number(e.target.value);
        setProduct({ ...product, idCategoria: selectedCategory });
    };

    const handleEditModalOpen = (idProduct, name, price, idCategory, photo, description) => {
        setIsModalEditOpen(true);
        setProduct({
            idProduto: idProduct,
            nome: name,
            preco: price,
            idCategoria: idCategory,
            foto: photo,
            descricao: description
        });
    };

    const closeModal = () => {
        setIsModalEditOpen(false);
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        const produto = {
            nome: product.nome,
            idCategoria: product.idCategoria,
            foto: product.foto,
            preco: product.preco,
            descricao: product.descricao
        };

        const formData = new URLSearchParams();
        formData.append('idProduto', product.idProduto);
        formData.append('produto', JSON.stringify(produto));

        try {
            const response = await axios.put(API_URL + `?token=${TOKEN}`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 204) {
                alert("Produto atualizado com sucesso");
                setIsModalEditOpen(false);
                render();
                navigate('/');
            } else {
                alert("Erro ao atualizar o produto");
                console.log("Erro ao atualizar: ", response);
            }
        } catch (error) {
            console.log("Erro [500]: ", error);
            alert("Erro ao editar produto");
        }
    };

    const handleDelete = async (idProduct) => {
        const response = await deleteProduct({ idProduct: idProduct });
        console.log("Deletado: ", response);
        if (response.status === 204) {
            render();
        }
    }



    return (
        <>
            <header>
                <span>
                    MACIEULS COFFEE
                </span>

                <button onClick={handleRegister}>Cadastrar novo produto</button>
            </header>
            <div>
                {products && products.length > 0 ? (
                    products.map(product => (
                        <div className="card" key={product.idProduto}>
                            <img src={product.foto} alt="Foto do produto" />
                            <h2>{product.nome}</h2>
                            <p>{product.descricao}</p>
                            <p>{parseFloat(product.preco).toFixed(2)}</p>
                            <p>Categoria: {product.idCategoria === 1 ? "Bolo" : "Bebidas"}</p>
                            <div>
                                Ações: <button onClick={() => handleEditModalOpen(product.idProduto, product.nome,
                                    product.preco, product.idCategoria, product.foto, product.descricao)}>Editar</button>
                                <button onClick={() => handleDelete(product.idProduto)}>Excluir</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>

            {isModalEditOpen && (
                <Modal>
                    <form onSubmit={handleEditProduct}>
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
                            onChange={handleChange}
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

                    <button onClick={closeModal}>Fechar</button>
                </Modal>
            )}
        </>
    );
}

export default Products;
