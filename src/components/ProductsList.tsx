import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Category, Product, StoreDataResponse } from "../interfaces";
import { getCategories, getCategory, loadStoreDate } from "../services/services";
import { ProductCard } from "./Product";
import { ListElement } from "./ListElement";
import '../App.css'



export const ProductsList = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  let { categorieId } = useParams();

  const productosFiltered = useMemo(() => {
    console.log({ categorieId })
    if (!categorieId) return products;
    else return products.filter(product => product.category_id === categorieId);
  }, [products, categorieId])



  console.log(categorieId)

  const filterCategoriesRepeated = (arrayToFilter: Category[], array: Category[]) => {
    return arrayToFilter.filter(cat => {
      const catFiltered = array.filter(catSaved => catSaved.id === cat.id);
      if (catFiltered.length === 0) return true;
      return false;
    })
  }

  useEffect(() => {
    loadStoreDate().then(async res => {
      const data: StoreDataResponse = await res.json();
      // console.log(data.results.slice(0, 10));
      // console.log(data.available_filters)

      // const products = data.results.slice(0, 10);
      const products = data.results
      console.log({ products })
      setProducts(products)
      console.log(data.available_filters)
      const available_filters = data.available_filters.filter(item => item.id === 'category');
      console.log(available_filters)
      let categoriesAux: Category[] = [];
      if (available_filters.length === 1) {
        const categoriesInfo = available_filters[0].values;

        categoriesAux = await getCategories(categoriesInfo);


        // setCategories(categoriesAux);
        // setCategories([...categories, ...categoriesAux]);

      }

      if (categorieId)
        getCategory(categorieId).then(async data => {
          let categoriesChildren = await getCategories(data.children_categories);

          let newCategories: Category[];
          categoriesAux = filterCategoriesRepeated(categoriesAux, categories)
          newCategories = [...categories, ...categoriesAux,];

          categoriesChildren = filterCategoriesRepeated(categoriesChildren, newCategories)
          newCategories = [...newCategories, ...categoriesChildren,];



          loadAncestors(data, newCategories).then(data => {
            setCategories(data);
          });


        })
      else setCategories([...categoriesAux]);


      setLoading(false);
    })

  }, [categorieId]);

  const loadAncestors = async (category: Category, newCategories: Category[]) => {
    // const ancestorsArray: Category[] = [];
    const ancestorFind = newCategories.filter(cat => cat.id === category.id);

    if (ancestorFind.length === 0) newCategories.push(category);


    // Load and check path to root
    const pathToRoot = category.path_from_root;
    if (pathToRoot.length > 1) {
      for (let i = 0; i < pathToRoot.length - 1; i++) {
        const catParent = pathToRoot[i];
        console.log({ catParent });

        // Buscar si existen en categories
        const categories = newCategories.filter(cat => cat.id === catParent.id);
        if (categories.length === 0) {
          const data = await getCategory(catParent.id);

          const ancestors = await loadAncestors(data, newCategories);
          newCategories.concat(ancestors);
        }

      }
    }
    console.log(newCategories)
    return newCategories;
  }

  const buldList = (categories: Category[], allCategories: Category[]) => {
    let liHtml = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const categoriesChildren = category.children_categories;

      // Verificar si categories children eliminar 
      const categoriesChildrenFiltered = allCategories.filter(cat => {
        const categoryChildrenFind = categoriesChildren.filter(catChildren => catChildren.id === cat.id);
        if (categoryChildrenFind.length === 1) {
          return true;
        } return false;
      })

      if (category.children_categories) {
        const childrenJSX = buldList(categoriesChildrenFiltered, allCategories)
        liHtml.push(<ListElement><Link to={'/' + category.id}> {category.name}</Link><ul>{childrenJSX}</ul></ListElement>)

      } else {
        liHtml.push(<ListElement> <Link to={'/' + category.id}> {category.name}</Link></ListElement>)
      }
    }

    return (
      <ul>
        {liHtml}
      </ul>
    );

  }

  const renderCategoriesMenu = useMemo(() => {
    console.log(categories)
    return buldList(categories.filter(cat => cat.path_from_root.length === 1), categories);
  }, [categories]);


  return (
    <div className="pruduct_list_container">
      {/* Menu */}
      <div >

        {renderCategoriesMenu}
      </div >
      {
        loading ? <h1>...Cargando</h1>
          :
          <div className='row'>
            {
              productosFiltered.map(product => (
                <ProductCard data={product} />
              ))

            }
          </div>
      }

    </div>

  )
}
