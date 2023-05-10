import React from 'react';
import axios from 'axios';

function Products() {
    const [products, setProducts] = React.useState([]);

    const fetchProducts = async function (e) {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:5000/products/',
            withCredentials: true
        });

        setProducts(response.data.products)
    }

    return (
        <div className='products-container'>
            <button className="login-btn" onClick={fetchProducts}>Fetch Products</button>
        </div>
    )
}

export default Products