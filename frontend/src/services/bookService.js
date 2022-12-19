import React from 'react'
import axios from 'axios';
import {apiUrlPrefix, BookApiUrl} from "../const";

// Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin

class bookService{

    // Pageable endpoints
    getBooks =(currentPage) =>{
        return axios.get(`${apiUrlPrefix}/books?page=${currentPage}`)
    }
    bookSearch =(currentPage, minRating, search) =>{
        return axios.get(`${apiUrlPrefix}/search/books?keyword=${search}&rating=${minRating}&page=${currentPage}`)
    }
    // CRUD endpoints
    getById = isbn13 =>{
        return axios.get(`${apiUrlPrefix}/search/books/isbn/${isbn13}`)
    }
    borrow = (isbn13, token) =>{
        return axios.post(`${apiUrlPrefix}/checkout`, {isbn: isbn13}, {
                headers: {Authorization: 'Bearer ' + token}
        })
    }

}

export default new bookService();