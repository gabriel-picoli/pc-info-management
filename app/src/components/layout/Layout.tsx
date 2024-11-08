import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Header from './Header'
import NavBar from './Navbar'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
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
