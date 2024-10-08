import React, { useEffect, useState } from 'react';
import './ProductsList.css'
import ProductCard from './ProductCard';
import useData from '../../hooks/useData';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category")
  const searchQuery = search.get("search")
  const {data, error, isLoading} = useData("/products", {
    params : {
      search: searchQuery,
      category,
      perPage: 10,
      page
    }
  }, [searchQuery, category, page]);
  useEffect(() => {
    setPage(1)
  }, [searchQuery, category])
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
  useEffect(() => {
    if(data && data.products) {
      const products = [...data.products]
      if (sortBy == 'price desc') {
        setSortedProducts(products.sort((a,b) => b.price - a.price))
      } else if (sortBy == 'price asc') {
        setSortedProducts(products.sort((a,b) => a.price - b.price))
      } else if (sortBy == 'rate desc') {
        setSortedProducts(products.sort((a,b) => b.reviews.rate - a.reviews.rate))
      } else if (sortBy == 'rate asc') {
        setSortedProducts(products.sort((a,b) => a.reviews.rate - b.reviews.rate))
      } else {
        setSortedProducts(products)
      }
    }
  }, [sortBy, data])
  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className='products_sorting' onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Relevenace</option>
                <option value="price desc">Price high to low</option>
                <option value="price asc">Price low to high</option>
                <option value="rate desc">Rate high to low</option>
                <option value="rate asc">Rate low to high</option>
            </select>
        </header>
        <div className="products_list">
            {error && <em className='form_error'>{error}</em>}
            {data?.products && sortedProducts.map(product => <ProductCard key={`pc-${product?._id}`} product={product}/>
            )}
            {isLoading && skeletons.map(skeleteon => <ProductCardSkeleton key={`ps-${skeleteon}`}/>)}
        </div>
    </section>
  )
}

export default ProductsList