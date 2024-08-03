import React from 'react';
import './ProductCard.css';
import iphone from '../../assets/iphone.jpg';
import star from '../../assets/white-star.png';
import basket from '../../assets/basket.png'
import { NavLink } from 'react-router-dom';

const ProductCard = ({id, image, price, title, rating, ratingCounts, stock}) => {
  return (
    <article className='product_card'>
        <div className='product_img'>
            <NavLink to={`/product/${id}`}><img src={`http://localhost:5001/products/${image}`} alt="Image"/></NavLink>
        </div>
        <div className="product_details">
            <h3 className="product_price">{price}</h3>
            <p className="product_title">{title}</p>
            <footer className="align_center product_info_footer">
                <div className="align_center">
                    <p className="align_center product_rating">
                        <img src={star} alt=''/>{rating}
                    </p>
                    <p className="product_review_count">{ratingCounts}</p>
                </div>
                {stock > 0 && <button className='add_to_cart'>
                    <img src={basket} alt="basket"/>
                </button>}
            </footer>
        </div>
    </article>
  )
}

export default ProductCard