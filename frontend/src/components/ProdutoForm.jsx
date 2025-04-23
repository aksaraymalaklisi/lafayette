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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 16px;
`

const ProdutoForm = ({ onProdutoAdicionado }) => {
    const [nome, setNome] = useState('');
    const [estoque, setEstoque] = useState(''); 
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [previewImagemURL, setPreviewImagemURL] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("nome", nome);
          formData.append("preco", preco);
          formData.append("estoque", estoque);
          if (imagem) {
            formData.append("imagem", imagem);
          }
          await createProduto(formData);
          onProdutoAdicionado();
          setNome('');
          setEstoque(''); 
          setPreco(''); 
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) { // Mesma coisa que acima, mas quero colocar algumas condições.
        const imagemSelecionada = e.target.files[0];
        setImagem(imagemSelecionada);
        setPreviewImagemURL(URL.createObjectURL(imagemSelecionada));
      } else {
        setPreviewImagemURL(null);
      }
    };
    return (
        <Form onSubmit={handleSubmit}>
            {(previewImagemURL) && (
              <ImageContainer>
                <Label>Imagem {previewImagemURL ? 'Selecionada' : 'Atual'}:</Label>
                <Image src={previewImagemURL} alt="Imagem do Produto" />
              </ImageContainer>
            )}
            <Label htmlFor="nome">Nome do produto:</Label>
            <Input type="text" placeholder="Nome do produto" value={nome} onChange={(e)=> setNome(e.target.value)} />
            <Label htmlFor="estoque">Quantidade inicial:</Label>
            <Input type="text" placeholder="Quantidade inicial" value={estoque} onChange={(e)=> setEstoque(e.target.value)} />
            <Label htmlFor="preco">Preço:</Label>
            <Input type="text" placeholder="Preço" value={preco} onChange={(e)=> setPreco(e.target.value)} />
            <Input type="file" id="imagem" accept="image/*" onChange={handleImageChange} />
            <Button type="submit">Adicionar</Button>
        </Form>
    );
};

export default ProdutoForm;