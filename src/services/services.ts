import { AvailableFilterValue, Category, ChildrenCategory } from "../interfaces";

export const loadStoreDate = () => {
  return fetch('https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326#json');
}

export const getCategory = async (categoryId: string): Promise<Category> => {
  const res = await fetch('https://api.mercadolibre.com/categories/' + categoryId);
  const data: Category = await res.json();
  return data;
}

export const getCategories = async (categoriesInfo: AvailableFilterValue[] | ChildrenCategory[]) => {
  let categoriesAux: Category[] = [];
  await Promise.all(categoriesInfo.map(async (catInfo) => {
    const category = await getCategory(catInfo.id);
    categoriesAux.push(category);
    console.log({ category })
  }))
  return categoriesAux;
}