import React, { useState } from 'react'
import ProdutoForm from '../components/ProdutoForm'
import ProdutoList from '../components/ProdutoList'; 

function ProdutosPage() {
  const [refresh, setRefresh] = useState(false);
  const atualizarLista = ()=> setRefresh(!refresh);

  return(
    <div>
      <h1>Lista de Produtos</h1>
      <ProdutoForm onProdutoAdicionado={atualizarLista}/>
      <ProdutoList key={refresh}/>
    </div>
  )
}

export default ProdutosPage;
