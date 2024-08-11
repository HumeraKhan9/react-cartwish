import React, { useEffect, useState } from 'react';
import './ProductsList.css'
import ProductCard from './ProductCard';
import useData from '../../hooks/useData';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category")
  const {data, error, isLoading} = useData("/products", {
    params : {
      category,
      perPage: 10,
      page
    }
  }, [category, page]);
  useEffect(() => {
    setPage(1)
  }, [category])
  const skeletons = Array(8).fill(0);
  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight -1 && !isLoading && data && page < data.totalPages) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [data, isLoading])
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
            {data?.products && data?.products.map(product => <ProductCard key={product?._id} product={product}/>
            )}
            {isLoading && skeletons.map(skeleteon => <ProductCardSkeleton key={skeleteon}/>)}
        </div>
    </section>
  )
}

export default ProductsList