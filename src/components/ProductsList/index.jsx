import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategories } from '../../redux/reducers/products';
import './index.scss';
import Product from '../Product';
import Loader from '../Loader';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const productCategories = useSelector(
        (state) => state.products.productCategories
    );
    const productsLoading = useSelector((state) => state.products.loading);
    const productsError = useSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(getProductCategories());
    }, []);

    const handleSelect = (category) => {
        let productCategories = [...products];
        //Get index of category in the products state to check if it's selected
        const categoryIndex = getSelectedCategoryIndex(category);
        //Check if category is selected, if not add it to state or else remove it
        categoryIndex !== -1
            ? productCategories.splice(categoryIndex, 1)
            : productCategories.push(category);
        setProducts(productCategories);
    };

    const getSelectedCategoryIndex = (category) =>
        products.findIndex(
            (productCategory) => productCategory.title === category.title
        );

    const productList = () => {
        const allProducts = [];
        //Add all products from each category to an array and pass into products component to render
        products.forEach((product) => {
            allProducts.push(...product.data);
        });
        return <Product products={allProducts} />;
    };

    return (
        <div className='container product-list'>
            <div className='row'>
                {productsLoading ? (
                    <div className='col-12'>
                        <Loader />
                    </div>
                ) : !productsError ? (
                    <>
                        <div className='col-12 col-md-5 col-lg-3 categories'>
                            <div>
                                <button
                                    className='filter_button'
                                    onClick={() =>
                                        setProducts(productCategories)
                                    }
                                >
                                    Select All
                                </button>
                                <button
                                    className='filter_button'
                                    onClick={() => setProducts([])}
                                >
                                    Clear
                                </button>
                            </div>
                            {productCategories.map((category, key) => (
                                <button
                                    className={`category_button ${
                                        getSelectedCategoryIndex(category) !==
                                            -1 && 'active'
                                    }`}
                                    key={`category-${key}`}
                                    onClick={() => handleSelect(category)}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>
                        <div className='col-12 col-md-7 col-lg-9 products'>
                            <div className='row'>
                                {products.length ? (
                                    productList()
                                ) : (
                                    <p className='col-12 product_text--info'>
                                        Please select at least a category
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Error Loading Products</p>
                )}
            </div>
        </div>
    );
};

export default ProductsList;
