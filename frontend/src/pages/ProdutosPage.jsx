import React, { useState } from 'react';
import styled from 'styled-components';
import ProdutoForm from '../components/ProdutoForm';
import ProdutoList from '../components/ProdutoList';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 400px;
  padding: 24px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const DropdownButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DropdownContent = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  margin-top: 8px;
  overflow: hidden;
`;

const ProdutoFormWrapper = styled.div`
  padding: 16px;
  background-color: #f9f9f9;
`;

function ProdutosPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const atualizarLista = ()=> setRefresh(!refresh);

  return(
    <Container>
      <Title>Lista de Produtos</Title>
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          {isDropdownOpen ? 'Fechar Formulário' : 'Adicionar Novo Produto'}
        </DropdownButton>
        {isDropdownOpen && (
          <DropdownContent>
            <ProdutoFormWrapper>
              <ProdutoForm onProdutoAdicionado={atualizarLista}/>
            </ProdutoFormWrapper>
          </DropdownContent>
        )}
      </DropdownContainer>
      <ProdutoList key={refresh}/>
    </Container>
  )
}

export default ProdutosPage;
