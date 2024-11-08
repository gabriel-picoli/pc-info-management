import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout'

import FechamentoMes from '../pages/fechamento/FechamentoMes'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/fechamento" element={<FechamentoMes />} />
      </Route>
    </Routes>
  )
}
