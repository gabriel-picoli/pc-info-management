import { Routes, Route } from "react-router-dom";

import FechamentoMes from "../pages/FechamentoMes";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/fechamento" element={<FechamentoMes />} />
    </Routes>
  );
}
