import { createContext } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ProductsList } from './components/ProductsList';
import { AvailableFilterValue, Product } from './interfaces';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsList />
  },
  {
    path: "/:categorieId",
    element: <ProductsList />
  },
]);

export const DataContext = createContext<{
  products: Product[],
  categories: AvailableFilterValue[],
  setCategories: React.Dispatch<React.SetStateAction<AvailableFilterValue[]>>,
}>({
  products: [],
  categories: [],
  setCategories: () => { }
});

function App() {

  return (
    <div className='container'>
      <div>
        <h1>Web libre</h1>
        <hr />
      </div>

      <div className='home_container'>
        <RouterProvider router={router} />
      </div>

    </div>
  )
}

export default App
