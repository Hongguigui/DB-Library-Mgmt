import React from 'react'
import axios from 'axios';
import {apiUrlPrefix, BookApiUrl} from "../const";

// Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin

class bookService{

    // Pageable endpoints
    getBooks =(currentPage) =>{
        return axios.get(`${apiUrlPrefix}/books/page?page=${currentPage}`)
    }
    bookSearch =(currentPage, search) =>{
        return axios.get(`${apiUrlPrefix}/search/books/${search}?page=${currentPage}`)
    }
}

export default new bookService();