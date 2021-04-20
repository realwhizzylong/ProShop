import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import Product from "../components/Product";
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNum = match.params.pageNum || 1;

    const dispatch = useDispatch();

    const { loading, products, error, page, pages } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts(keyword, pageNum));
    }, [dispatch, keyword, pageNum])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate keyword={keyword ? keyword : ''} page={page} pages={pages} />
                </>
            )}
        </>
    )
}

export default HomeScreen;