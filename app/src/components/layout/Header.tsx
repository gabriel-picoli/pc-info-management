import styled from 'styled-components'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #121212;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* garante que o header nao ultrapasse a largura */

  @media (max-width: 425px) {
    display: none;
  }
`

const Title = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin: 0;
`

export default function Header() {
  return (
    <HeaderContainer>
      <Title>PC Info & Eletro</Title>
    </HeaderContainer>
  )
}
