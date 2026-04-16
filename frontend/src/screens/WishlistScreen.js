import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listWishlist, removeFromWishlist, addToWishlist } from '../actions/wishlistActions'

function WishlistScreen({ history }) {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const wishlistList = useSelector(state => state.wishlistList)
    const { loading, error, wishlistItems } = wishlistList

    const wishlistRemove = useSelector(state => state.wishlistRemove)
    const { success: successRemove } = wishlistRemove

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listWishlist())
        }
    }, [dispatch, history, userInfo, successRemove])

    const removeFromWishlistHandler = (productId) => {
        dispatch(removeFromWishlist(productId))
    }

    return (
        <Row>
            <Col md={8}>
                <h1>My Wishlist</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : wishlistItems.length === 0 ? (
                    <Message variant='info'>
                        Your wishlist is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {wishlistItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.product.image} alt={item.product.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.product.price}
                                    </Col>

                                    <Col md={3}>
                                        <Rating value={item.product.rating} text={`${item.product.numReviews} reviews`} color={'#f8e825'} />
                                    </Col>

                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromWishlistHandler(item.product._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
        </Row>
    )
}

export default WishlistScreen
