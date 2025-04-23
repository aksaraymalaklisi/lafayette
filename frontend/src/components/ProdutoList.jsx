import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { listProdutos } from "../services/api";

const ProductListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductInfo = styled.span`
  flex-grow: 1;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 16px;
`;

const EditButton = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function ProdutoList(){
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);

    // o useEffect agora chama a função getProdutos.
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
            setError(`Erro ao buscar produtos: ${error.message}`);
            setLoading(false);
        }
    };

    if (loading) return (<p>Carregando produtos...</p>);
        
    return(
        <ProductListContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
                {produtos.map(prod=>(
                    <ProductItem key={prod.id}> 
                        <Image src={prod.imagem} alt="Imagem do Produto" />
                        <ProductInfo> {prod.nome} <br/> Preço: R$ {prod.preco} <br/> Estoque: {prod.estoque} un. </ProductInfo>
                        <EditButton to={`/editar/${prod.id}`}>Editar</EditButton> 
                    </ProductItem>
                ))}
        </ProductListContainer>
    );
};

export default ProdutoList;