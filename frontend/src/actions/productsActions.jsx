import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'
import {productRequest, productSuccess, productFail, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductFail, deleteProductSuccess, updateProductRequest, updateProductSuccess, updateProductFail } from "../slices/productSlice"

export const getProducts = (keyword, price, category, rating, page) => async(dispatch) => {
    try {
        dispatch(productsRequest())

        let link = `/api/v1/products?page=${page}`

        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category){
            link += `&category=${category}`
        }
        if(rating){
            link += `&ratings=${rating}`
        }
        const { data } = await axios.get(link)
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
}


export const getProduct = id => async (dispatch) => {
    try {
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response.data.message))
    }
}

export const createReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(createReviewRequest())
        const config = {
            Headers : {
                'Content-type' : 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/review`, reviewData, config)
        dispatch(createReviewSuccess(data))
    } catch (error) {
        dispatch(createReviewFail(error.response.data.message))
    }
}

export const getAdminProducts = () => async(dispatch) => {
    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`/api/v1/admin/products`)
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
}

export const createNewProduct = (productData) => async(dispatch) => {
    try {
        dispatch(newProductRequest())
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData)
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))
    }
}

export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch(deleteProductRequest())
        await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch(deleteProductSuccess())
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.message))
    }
}

export const updateProduct = (id, productData) => async(dispatch) => {
    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData)
        dispatch(updateProductSuccess(data))
    } catch (error) {
        dispatch(updateProductFail(error.response.data.message))
    }
}