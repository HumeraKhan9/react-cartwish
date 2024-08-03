import React from 'react';
import './ProductsList.css'
import ProductCard from './ProductCard';
import useData from '../../hooks/useData';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Common/Pagination/Pagination';

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category")
  const page = search.get("page")
  const {data, error, isLoading} = useData("/products", {
    params : {
      category,
      page
    }
  }, [category, page]);
  const skeletons = Array(8).fill(0);
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search])
    setSearch({...currentParams, page: page})
  }
  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className='products_sorting'>
                <option value="">Relevenace</option>
                <option value="price desc">Price high to low</option>
                <option value="price asc">Price low to high</option>
                <option value="rate desc">Rate high to low</option>
                <option value="rate asc">Rate low to high</option>
            </select>
        </header>
        <div className="products_list">
            {error && <em className='form_error'>{error}</em>}
            {isLoading && skeletons.map(skeleteon => <ProductCardSkeleton key={skeleteon}/>)}
            {data?.products && data?.products.map(product => <ProductCard key={product?._id} id={product?._id}
              image={product?.images[0]} price={product?.price} title={product?.title}
              rating={product?.reviews?.rate} ratingCounts={product?.reviews?.counts} stock={product?.stock}/>
            )}
        </div>
        {data && <Pagination totalCount={data?.totalProducts} countPerPage={8} onClick={handlePageChange} currentPage={page}/>}
    </section>
  )
}

export default ProductsList