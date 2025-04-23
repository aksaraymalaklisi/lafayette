import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import { getProduto, updateProduto, deleteProduto } from "../services/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 16px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 16px;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  text-align: center;
  gap: 8px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin: 0 auto;
`;

const StateMessage = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 16px;
  color: #ffdf28;
  font-weight: bold;
  text-align: center;
`;

const Message = styled.p`
  color: green;
  font-weight: bold;
  text-align: center;
`;

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
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &[type="submit"] {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &:not([type="submit"]) {
    background-color: #f0f0f0;
    color: #333;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  &[type="delete"] { // Poderia ter utilizado id e #, mas queria testar mais esse []. 
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
`;

const ProdutoEdit = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState({ nome: "", preco: "", estoque: "", imagem: null });
    const { nome, preco, estoque, imagem } = produto;
    const [previewImagemURL, setPreviewImagemURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [state, setState] = useState(false); // Tecnicamente, state é só um nome genérico, mas aqui ele é apenas chamado quando o produto é apagado.
    const [message, setMessage] = useState(null); // Por outro lado, esse aqui aparece toda hora que o produto é modificado com sucesso.
    const navigate = useNavigate();

    useEffect(()=>{
        const loadProduto = async ()=>{
            setLoading(true);
            try {
                const response = await getProduto(id);
                setProduto(response.data);
                if (response.data.imagem) {
                  setPreviewImagemURL(response.data.imagem);
                }
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                setLoading(false);
                setState(`Erro ao buscar produto: ${error.message}`); 
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
                setError(`Erro ao apagar produto: ${error.message}`);
            }
        }
    };
    const handleChange = (e) => { // Descobri que não preciso fazer um handleChange para cada input.
        setProduto({ ...produto, [e.target.id]: e.target.value }) // e.target.id é o id do input no form
    } 

    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) { // Mesma coisa que acima, mas quero colocar algumas condições.
        const imagemSelecionada = e.target.files[0];
        setProduto({ ...produto, imagem: imagemSelecionada });
        setPreviewImagemURL(URL.createObjectURL(imagemSelecionada));
      } else {
        setPreviewImagemURL(null);
      }
    };

    const handleSubmit = async (e) => { // E também descobri que tenho que melhorar minhas nomenclaturas
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("nome", nome);
          formData.append("preco", preco);
          formData.append("estoque", estoque);
          if (imagem) {
            formData.append("imagem", imagem);
          }
          await updateProduto(id, formData);
          setMessage("Produto atualizado.");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            setError("Erro ao atualizar produto: " + error.message);
        }
    };

    return (
        <Container>
            <MessageContainer>
            {loading && <p>Carregando informações do produto...</p>}
            </MessageContainer>
            <Title>Editar Produto</Title>
            {state ? (
                  <StateMessage>
                    {state} 
                    <Button type="button" onClick={() => navigate(-1)}>Voltar</Button>
                  </StateMessage>
            ) : (
            <div> 
                <Form onSubmit={handleSubmit}>
                  {(previewImagemURL || produto.imagem) && (
                    <ImageContainer>
                      <Label>Imagem {previewImagemURL ? 'Selecionada' : 'Atual'}:</Label>
                      <Image src={previewImagemURL || produto.imagem} alt="Imagem do Produto" />
                    </ImageContainer>
                  )}
                  <Label htmlFor="nome">Nome do produto:</Label>
                  <Input type="text" id="nome" value={produto.nome} onChange={handleChange} />
                  <Label htmlFor="preco">Preço:</Label>
                  <Input type="text" id="preco" value={produto.preco} onChange={handleChange} />
                  <Label htmlFor="estoque">Estoque:</Label>
                  <Input type="text" id="estoque" value={produto.estoque} onChange={handleChange} />
                  <Input type="file" id="imagem" accept="image/*" onChange={handleImageChange} />
                  <Button type="submit">Salvar</Button>
                </Form>
                <ButtonGroup>
                    <Button type="button" onClick={() => navigate(-1)}>Voltar</Button>
                    <Button type="delete" onClick={()=>handleDelete(id)}>Apagar produto</Button>
                </ButtonGroup>
                <Message>{message}</Message>
                {error && <ErrorMessage> {error} </ErrorMessage>}
            </div> 
            )} 
        </Container>
    );
};

export default ProdutoEdit;