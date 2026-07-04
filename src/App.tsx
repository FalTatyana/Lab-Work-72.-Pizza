import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DishesList from './pages/adminPages/DishesListAdmin/DishesList'
import FormAddDish from './pages/adminPages/FormAddDish/FormAddDish'
import EditDish from './pages/adminPages/EditDish/EditDish'
import DishesListClient from './pages/clientPages/DishesListClient/DishesListClient'
import Orders from './pages/adminPages/Orders/Orders'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={'/admin/dishes'} element={<DishesList />} />
        <Route path={'/admin/add-dish'} element={<FormAddDish />} />
        <Route path={'/admin/edit-dish/:id'} element={<EditDish />}/>
        <Route path={'/'} element={<DishesListClient/>}/>
        <Route path={'/admin/orders'} element={<Orders/>}/>
      </Routes>
    </Layout>
  )
}

export default App
