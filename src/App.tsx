import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DishesList from './pages/DishesList/DishesList'
import FormAddDish from './pages/FormAddDish/FormAddDish'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={'/admin/dishes'} element={<DishesList />} />
        <Route path={'/admin/add-dish'} element={<FormAddDish />} />
      </Routes>
    </Layout>
  )
}

export default App
