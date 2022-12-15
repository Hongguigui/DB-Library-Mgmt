import React, { Component } from 'react'
import bookService from "../../services/bookService";
import {faXmark, faUpload, faRotateBack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import './BorrowBook.css';
import Alert from 'react-s-alert-v3';

//Reference: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/
//Edited by Xiao Lin

// This component is used to update the attribute of existing stores
class BorrowBook extends Component {
    constructor(props){
        super(props);
        this.state = {
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
    // Retrieve the current store attributes using its id, and set it to state
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

    // When form field input changes, assign value to event target
    onInputChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // After submitting the form, set the current state as the attribute of the object and post it to the backend
    formHandle = event =>{
        event.preventDefault();
        const book = {
            isbn13:this.state.isbn13,
            title:this.state.title,
            authors:this.state.authors,
            categories:this.state.categories,
            thumbnail:this.state.thumbnail,
            yearPublished:this.state.yearPublished,
            averageRating:this.state.averageRating
        } ;
        bookService.update(this.state.isbn13,book).then(
            (response) =>{
                console.log(response);
                Alert.success("Store info updated!");
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
                            Borrow this book
                        </div>
                        {/* Show a form that allows the user to modify the attributes of the given store */}
                        <div className="card-body">
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
                                    <label htmlFor="thumbnailInput" className="font-ch">Thumbnail</label>
                                    <input type="text" className="form-control" name="thumbnail"
                                           placeholder={thumbnail} value={thumbnail} autoComplete="off" disabled={true}/>
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
                                {/* Display two buttons, one is the submission button, one is the return to book list button */}
                                <div className="button-group">
                                    <Button class="btn btn-info" type="submit" variant="outline-primary"><FontAwesomeIcon icon={faUpload} /> Borrow</Button>
                                    <Button class="btn btn-info" type="button" variant="outline-success" href="http://localhost:3000/book"><FontAwesomeIcon icon={faRotateBack} /> Back</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BorrowBook