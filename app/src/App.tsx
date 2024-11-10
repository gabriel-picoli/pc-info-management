import { BrowserRouter as Router } from 'react-router-dom'

import GlobalStyle from './GlobalStyle'

import AppRouter from './routes/routes'

export default function App() {
  return (
    <>
      <Router future={{ v7_startTransition: true }}>
        <AppRouter />
      </Router>

      <GlobalStyle />
    </>
  )
}
