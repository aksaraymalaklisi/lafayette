import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router';
import styled from 'styled-components';
import ProdutosPage from './pages/ProdutosPage';
import ProdutoEdit from './pages/ProdutoEdit';


const PageContainer = styled.div`
      font-family: 'Comic Neue', 'Comic Sans MS', cursive, sans-serif;
      padding: 24px;
`;

function App() {
  return(
    <>
    <Router>
      <PageContainer>
        <Routes>
          <Route path="/" element={<ProdutosPage />} />
          <Route path='/editar/:id' element={<ProdutoEdit />} />
        </Routes>
      </PageContainer>
    </Router>
    </>
  );
}

export default App;
