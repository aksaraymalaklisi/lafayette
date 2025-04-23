import React, { useState } from "react";
import { createProduto } from "../services/api";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 16px;
  gap: 12px;
`;

const Label = styled.label`
  font-weight: lighter;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e7e34;
  }
`;

const ProdutoForm = ({ onProdutoAdicionado }) => {
    const [nome, setNome] = useState('');
    const [estoque, setEstoque] = useState(''); 
    const [preco, setPreco] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        createProduto({nome, estoque, preco}) // Atualizar para o novo serviço
        .then(() =>{ // response foi removido porque eu não faço ideia do que aquilo era para fazer
            onProdutoAdicionado();
            setNome('');
            setEstoque(''); 
            setPreco(''); 
        }) 
        .catch(error => console.error('Erro ao adicionar o produto', error));
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="nome">Nome do produto:</Label>
            <Input type="text" placeholder="Nome do produto" value={nome} onChange={(e)=> setNome(e.target.value)} />
            <Label htmlFor="estoque">Quantidade inicial:</Label>
            <Input type="text" placeholder="Quantidade inicial" value={estoque} onChange={(e)=> setEstoque(e.target.value)} />
            <Label htmlFor="preco">Preço:</Label>
            <Input type="text" placeholder="Preço" value={preco} onChange={(e)=> setPreco(e.target.value)} />
            <Button type="submit">Adicionar</Button>
        </Form>
    );
};

export default ProdutoForm;