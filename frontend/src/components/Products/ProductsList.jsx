import React, { useEffect, useState } from 'react';
import './ProductsList.css'
import ProductCard from './ProductCard';
import apiClient from '../../utils/api-client';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    apiClient.get("/products").then(res => setProducts(res?.data?.products)).
    catch(err => setError(err?.message))
  }, [])
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
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </section>
  )
}

export default ProductsList