import '../App.css'
import { Product as IProduct } from "../interfaces"


interface IProps {
  data: IProduct,
}

export const ProductCard = ({ data }: IProps) => {


  const handleClickProduct = () => {
    window.open(data.permalink, '_blanck')
  }

  return (
    <div className="product_card col-sm" onClick={handleClickProduct}>
      <div>
        <img className="product_thumbnail" src={data.thumbnail} alt="thumbnail" />
      </div>

      <div>
        {data.title}
      </div>


    </div>
  )
}
