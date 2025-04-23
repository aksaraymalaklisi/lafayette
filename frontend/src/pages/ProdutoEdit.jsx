import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getProduto, updateProduto, deleteProduto } from "../services/api";

const ProdutoEdit = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState({ nome: "", preco: "", estoque: "" });
    const { nome, preco, estoque } = produto;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [state, setState] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const loadProduto = async ()=>{
            setLoading(true);
            try {
                const response = await getProduto(id);
                setProduto(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                setError("Erro ao buscar produto: " + error.message);
                setLoading(false);
            }
        };
        loadProduto();
    }, [id]);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este produto?")) {
            try {
                await deleteProduto(id);
                setState("Esse produto foi apagado.");
            } catch (error) {
                console.error("Erro ao apagar produto:", error);
                setError("Erro ao apagar produto: " + error.message);
            }
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const updatedProduto = {nome, preco, estoque};
            console.log(updatedProduto)
            await updateProduto(id, updatedProduto);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            setError("Erro ao atualizar produto: " + error.message);
        }
    };

    if (loading) {
        return <p>Carregando informações do produto...</p>;
    }

    return (
        <div>
            <h1>Editar Produto</h1>
            {error && <p>{error}</p>}
            {state ? <p>{state} | <button type="button" onClick={() => navigate(-1)}>Voltar</button></p> :
            <div> 
            <form onSubmit={handleChange}>
                <label htmlFor="nome">Nome do produto:</label>
                <input type="text" id="nome" value={produto.nome} onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
                <label htmlFor="preco">Preço:</label>
                <input type="text" id="preco" value={produto.preco} onChange={(e) => setProduto({ ...produto, preco: e.target.value })} />
                <label htmlFor="estoque">Estoque:</label>
                <input type="text" id="estoque" value={produto.estoque} onChange={(e) => setProduto({ ...produto, estoque: e.target.value })} />
                <button type="submit">Salvar</button>
            </form>
            <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            <button onClick={()=>handleDelete(id)}>Apagar produto</button>
            </div> 
            } 

        </div>
    );
}

export default ProdutoEdit;