import React from 'react'
import axios from 'axios';
import {apiUrlPrefix, StoreApiUrl} from "../const";

// Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin

class storeService{

    // Pageable endpoints
    getBooks =(currentPage, recordPerPage) =>{
        return axios.get(`${apiUrlPrefix}/books?page=${currentPage}&size=${recordPerPage}`)
    }
    bookSearch =(currentPage, recordPerPage, search) =>{
        return axios.get(`${apiUrlPrefix}/books?search=${search}&page=${currentPage}&size=${recordPerPage}`)
    }
}

export default new storeService();