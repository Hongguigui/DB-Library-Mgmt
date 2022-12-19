import React, { Component } from 'react'
import bookService from "../../services/bookService";
import {faXmark, faUpload, faRotateBack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import './BorrowBook.css';
import Alert from 'react-s-alert-v3';
import {useParams } from "react-router-dom";


//Reference: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/
//Edited by Xiao Lin

//Reference: https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6
export function withRouter(Children){
     return(props)=>{
        const match = {params: useParams()};
        return <Children {...props}  match = {match}/>
        }
     }

// This component is used to update the attribute of existing stores
class ReturnBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: props.token,
            isbn13:'',
            title:'',
            authors:'',
            categories:'',
            thumbnail:'',
            yearPublished:'',
            averageRating:''
        };
    }

    // Get the isbn of the book
    componentDidMount(){
        const isbn13 = +this.props.match.params.id;
        if(isbn13 > 0){
            this.getBookById(isbn13);
        }
    }

    // Retrieve the current book attributes using its isbn, and set it to state
    getBookById = (isbn13) =>{
        bookService.getById(isbn13).then
        ((response) =>{
                console.log(response);
                Alert.success("Book info retrieved!");
                this.setState({
                    isbn13:response.data[0].isbn13,
                    title:response.data[0].title,
                    authors:response.data[0].authors,
                    categories:response.data[0].categories,
                    thumbnail:response.data[0].thumbnail,
                    yearPublished:response.data[0].yearPublished,
                    averageRating:response.data[0].averageRating
                });
            },(error) =>{
                console.log(error);
                Alert.error("Operation failed!");
            }
        );
    }

    // After submitting the form, and post the isbn and token to the backend
    formHandle = event =>{
        event.preventDefault();
        bookService.return(this.state.isbn13, this.state.token).then(
            (response) =>{
                console.log(response);
                Alert.success("Book returned!");
            } ,(error) =>{
                console.log(error);
                Alert.error("Invalid input!");
            }
        );
    }

    render() {
        const {isbn13, title, authors, categories, thumbnail, yearPublished, averageRating} = this.state
        return (
            <div>
                <div className="container">
                    <div className="card shadow bg-transparent">
                        <div className="card-header card-font">
                            Return this book
                        </div>
                        {/* Show a form that contains the book info */}
                        <div className="card-body" align="left">
                            <form onSubmit={this.formHandle}>
                                <div className="form-group">
                                    <label htmlFor="isbnInput" className="font-ch">ISBN13</label>
                                    <input type="text" className="form-control" name="name"
                                           placeholder={isbn13} value={isbn13} autoComplete="off" disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="titleInput" className="font-ch">Title</label>
                                    <input type="text" className="form-control" name="address"
                                           placeholder={title} value={title} autoComplete="off" disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="authorsInput" className="font-ch">Authors</label>
                                    <input type="text" className="form-control" name="authors"
                                           placeholder={authors} value={authors} autoComplete="off" disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoriesInput" className="font-ch">Categories</label>
                                    <input type="text" className="form-control" name="categories"
                                           placeholder={categories} value={categories} autoComplete="off" disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="yearPublishedInput" className="font-ch">Year Published</label>
                                    <input type="text" className="form-control" name="yearPublished"
                                           placeholder={yearPublished} value={yearPublished} autoComplete="off" disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="averageRatingInput" className="font-ch">Average Rating</label>
                                    <input type="text" className="form-control" name="averageRating"
                                           placeholder={averageRating} value={averageRating} autoComplete="off" disabled={true}/>
                                </div>
                                {/* Display two buttons, one is the submission button, one is the return to borrowed book list button */}
                                <div className="button-group">
                                    <Button class="btn btn-info" type="submit" variant="outline-primary"><FontAwesomeIcon icon={faUpload} /> Return</Button>
                                    <Button class="btn btn-info" type="button" variant="outline-success" href="http://localhost:3000/borrowed/"><FontAwesomeIcon icon={faRotateBack} /> Back</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ReturnBook)