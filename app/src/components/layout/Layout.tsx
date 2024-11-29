import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Header from './Header'
import NavBar from './Navbar'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* garante que o layout ocupe exatamente a altura da tela */
  overflow: hidden;
`

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* permite rolagem do conteudo sem afetar o layout */
  padding: 20px;
  box-sizing: border-box; /* inclui padding dentro do tamanho do container */
`

export default function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <NavBar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  )
}
