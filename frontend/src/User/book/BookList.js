import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../common/LoadingIndicator';
import Alert from 'react-s-alert-v3';
import 'react-s-alert-v3/dist/s-alert-default.css';
import 'react-s-alert-v3/dist/s-alert-css-effects/slide.css';
import './BookList.css';
import ReactSlider from 'react-slider';
import bookService from "../../services/bookService";
import {
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
    faWarning,
    faXmarkCircle,
    faArrowUp,
    faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Reference1: exempli-gratia
// Reference2: https://github.com/mightyjava/book-rest-api-reactjs
// Reference3: https://codebun.com/how-to-create-a-pagination-in-react-js-and-spring-boot/
// Edited by Xiao Lin

//Display a book list with dynamic pagination, with embedded edit and deletion functionalities
class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentPage:1,
            search: '',
            id: '',
            minRating: 0
        }
        this.buttonClickedRefreshBookInfo = this.buttonClickedRefreshBookInfo.bind(this);
        this.buttonClickedReRender = this.buttonClickedReRender.bind(this);
    }

    //After loaded, get current book list information from the backend
    componentDidMount() {
        this.getBooksByPagination(this.state.currentPage);
        console.log("componentDidMount: state = %o", this.state);
    }

    // Make the request to the endpoint to retrieve book list, and set the state with the response data
    // The response data is in the pageable format
    getBooksByPagination(currentPage){
        bookService.getBooks(currentPage)
        //axios.get("http://localhost:8080/book/?page="+currentPage+"&size="+this.state.recordPerPage)
            .then(response => response.data).then((data) =>{
            this.setState({
                books:data,
            });
        });
    }

    // Display next page
    showNextPage = () =>{
        if(this.state.search === ''){
            this.getBooksByPagination(this.state.currentPage + 1);
        }
        else{
            this.searchBook(this.state.currentPage + 1)
        }
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    };

    // Display previous page
    showPrevPage = () =>{
        let prevPage = 1
        if(this.state.currentPage > prevPage){
            if(this.state.search === ''){
                this.getBooksByPagination(this.state.currentPage - prevPage);
            }
            else{
                this.searchBook(this.state.currentPage - prevPage)
            }
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    };

    // When the search button is clicked, assign value to event target
    searchInput = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
        });
    };

    // Make the request to the endpoint to retrieve the updated book list using the search input
    // And set the state with the response data
    searchBook = (currentPage) => {
        bookService.bookSearch(currentPage, this.state.minRating, this.state.search)
        //axios.get("http://localhost:8080/book/"+this.state.search+"?page="+currentPage+"&size="+this.state.recordPerPage)
            .then(response => response.data).then((data) =>{
            this.setState({
                books:data
            });
        });
    };

    // Reset the search input field and reload the original pagination
    resetSearch = () => {
        this.setState({"search":''});
        this.getBooksByPagination(1);
    };

    // Set the minimum rating
    setMinRating = (minRating) => {
        this.setState({"minRating":minRating});
    };

    // Refresh book list when button is clicked
    buttonClickedRefreshBookInfo() {
        console.log('BookList was refreshed!');
        this.getBooksByPagination(this.state.currentPage);
    }

    //Render the page when button is clicked
    buttonClickedReRender() {
        this.render();
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />
        }
        console.log("Render() -> state = %o",this.state);

        const {books, currentPage, search, minRating} = this.state;
        return (
            <div className="book-container">
                <h1>Book List</h1>
                {/* The search part contains one input field, and two buttons (search button and reset button) */}
                <div className="container">
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" name="search" size="50"
                               placeholder="Search books ..." autoComplete="off" value={search} onChange={this.searchInput}/>
                        <button type="button" name="search" className="btn btn-info my-2 text-center mr-2"
                                onClick={this.searchBook} disabled={this.state.search === ''}><FontAwesomeIcon icon={faSearch} /> Search
                        </button>
                        <button type="reset" className="btn btn-secondary text-center ml-5"
                                style={{marginLeft: '10px'}} onClick={this.resetSearch}> <FontAwesomeIcon icon={faTimes} /> Clear
                        </button>
                    </div>
                </div>
                <div className="container">
                    <div style={{float: "none"}}>
                        <p>Minimum Rating Range</p>
                        <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        value={minRating}
                        min={0}
                        max={5}
                        step={0.01}
                        markers={1}
                        onChange={(value) => {this.setMinRating(value); console.log(value)}}
                    />
                    </div>
                </div>
                {/* The book list part shows the attributes of the books and has the edit buttons */}
                <div className="container">
                    <table className="table table-bordered border-info">
                        <thead>
                        <tr>
                            <th>ISBN13</th>
                            <th>Book</th>
                            <th>Authors</th>
                            <th>Categories</th>
                            <th>Thumbnail</th>
                            <th>Year Published</th>
                            <th>Average Rating</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.length===0?
                            <tr align="center"><td colSpan="5">No Record Found in Database</td></tr>:
                            books.map(
                                (books,index) =>(
                                    <tr key = {books.isbn13}>
                                        <td>{books.isbn13}</td>
                                        <td>{books.title}</td>
                                        <td>{books.authors}</td>
                                        <td>{books.categories}</td>
                                        <td><a
                                            className="App-link"
                                            href={books.thumbnail}
                                            target="_blank"
                                            rel="noopener noreferrer">{"See thumbnail"}</a></td>
                                        <td>{books.yearPublished}</td>
                                        <td>{books.averageRating}</td>
                                        {/* Edit buttons */}
                                        <td><Link to={`/update-books/${books.isbn13}`} className="btn btn-outline-primary"><FontAwesomeIcon icon={faEdit} /> Borrow</Link>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                    {/* The pagination part contains a page number display and a button group to navigate to other pages */}
                    <table className="table">
                        <div className="page-number">
                            Page {currentPage}
                        </div>
                        <div className="pagination-buttons">
                            <nav>
                                <ul className="pagination">
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={currentPage === 1 } onClick={this.showPrevPage}
                                                                 ><FontAwesomeIcon icon={faStepBackward} /> Previous</Button></li>
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={this.state.books.length !== 10} onClick={this.showNextPage}
                                                                 ><FontAwesomeIcon icon={faStepForward} /> Next</Button></li>
                                </ul>
                            </nav>
                        </div>
                    </table>
                </div>
            </div>
        );
    }
}


export default BookList;