import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout'

import FechamentoMes from '../pages/fechamento/FechamentoMes'
import Agenda from '../pages/agenda/Agenda'
import Registro from '../pages/registro/Registro'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/fechamento" element={<FechamentoMes />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/registro" element={<Registro />} />
      </Route>
    </Routes>
  )
}
