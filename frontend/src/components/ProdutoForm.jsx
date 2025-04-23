import React, { useState} from "react";
import { createProduto } from "../services/api";

const ProdutoForm = ({ onProdutoAdicionado })=> {
    const [nome, setNome] = useState('');
    const [estoque, setEstoque] = useState(''); // Modificação: estoque is required
    const [preco, setPreco] = useState(''); // Modificação: preco is required

    const handleSubmit = (e)=>{
        e.preventDefault();

        createProduto({nome, estoque, preco}) // Modificação: estoque & preco is required | Atualizar para o novo serviço
        .then(() =>{ // response foi removido porque eu não faço ideia do que aquilo era para fazer
            onProdutoAdicionado();
            setNome('');
            setEstoque(''); /* Modificação: estoque is required */
            setPreco(''); /* Modificação: estoque is required */
        }) 
        .catch(error => console.error('erro ao adicionar o produto', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome do produto" value={nome} onChange={(e)=> setNome(e.target.value)} />
            {/* Modificação: estoque is required */}
            <input type="text" placeholder="Quantidade inicial" value={estoque} onChange={(e)=> setEstoque(e.target.value)} />
            {/* Modificação: preco is required */} 
            <input type="text" placeholder="Preço" value={preco} onChange={(e)=> setPreco(e.target.value)} />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default ProdutoForm;