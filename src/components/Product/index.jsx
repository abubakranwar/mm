import React from 'react';
import './index.scss';

const Product = ({ products }) =>
    products.map((product, key) => (
        <div
            className='col-6 col-lg-4 col-xl-3 product_container'
            key={`product-${key}`}
        >
            <img src='placeholder.jpeg' className='product_image' />
            <div className='product_content'>
                <h1 className='product_content--title'>{product.title}</h1>
                <p className='product_content--stock'>
                    {product.stock <= 0
                        ? 'Out of stock'
                        : product.stock <= 10
                        ? 'Few left'
                        : 'In stock'}
                </p>
                <p>{`£${product.price.toFixed(2)} ${product.amount}`}</p>
            </div>
        </div>
    ));

export default Product;
