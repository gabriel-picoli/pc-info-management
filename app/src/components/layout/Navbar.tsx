import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { FaDollarSign, FaRegCalendarAlt, FaFileAlt } from 'react-icons/fa'

const NavbarContainer = styled.div`
  display: flex;
  padding-top: 20px;
  padding-left: 20px;
  gap: 50px;
  background-color: white;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);

  width: 100%;

  @media (max-width: 425px) {
    justify-content: center;
  }
`

const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #121212;
  text-decoration: none;
  font-size: 13px;
  font-weight: ${({ $isActive }) => ($isActive ? '900' : '500')};
  transition: color 0.2s;

  &:hover {
    color: black;
  }

  &:hover > div {
    transform: ${({ $isActive }) => ($isActive ? '' : 'scale(1.1)')};
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${({ $isActive }) => ($isActive ? 'red' : 'transparent')};
    transition: background-color 0.4s;
    margin-top: 5px;
  }

  &:hover::after {
    background-color: red;
  }
`

const NavIcon = styled.div`
  display: flex;
  font-size: 30px;
  margin-bottom: 5px;
  transition: transform 0.2s;
  transform-origin: center center;

  @media (max-width: 425px) {
    font-size: 25px;
  }
`

export default function NavBar() {
  const location = useLocation()

  return (
    <NavbarContainer>
      <NavItem to="/agenda" $isActive={location.pathname === '/agenda'}>
        <NavIcon>
          <FaRegCalendarAlt />
        </NavIcon>
        Agenda
      </NavItem>
      <NavItem to="/registro" $isActive={location.pathname === '/registro'}>
        <NavIcon>
          <FaFileAlt />
        </NavIcon>
        Registro
      </NavItem>
      <NavItem to="/fechamento" $isActive={location.pathname === '/fechamento'}>
        <NavIcon>
          <FaDollarSign />
        </NavIcon>
        Fechamento
      </NavItem>
    </NavbarContainer>
  )
}
