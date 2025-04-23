import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { listProdutos, deleteProduto } from "../services/api";

const EditButton = styled(Link)`
    
`
function ProdutoList(){
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    // o useEffect agora chama a função getProdutos. Muito mais prático.
    useEffect(() => {
        getProdutos();
    }, []);

    // Ao invés de colocar a geração da lista como parte do useEffect, ela foi movida para uma função separada.
    const getProdutos = async () => {
        try {
            const response = await listProdutos();
            setProdutos(response.data);
            setLoading(false);
        } catch(error) {
            console.error('Erro ao buscar produtos: ', error);
        }
    };

    if (loading) return (<p>Carregando produtos...</p>);
        
    return(
        <ul>
            {produtos.map(prod=>(
                <li key={prod.id}>{prod.nome} | Preço: {prod.preco} | Estoque: {prod.estoque} | <EditButton to={`/editar/${prod.id}`}>Editar</EditButton> </li>
            ))}
        </ul>
    );
};

export default ProdutoList;