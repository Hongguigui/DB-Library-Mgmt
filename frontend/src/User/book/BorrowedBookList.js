// Reference: https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
// Edited by Xiao Lin
import { useState, useEffect } from 'react'
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import './BookList.css';

let currentPage = 1
function BorrowedBook(prop) {

  const [bookData, setBookData] = useState(null)
  let {books} = []

  
  function getBooksByPagination(page) {
    axios({
      method: "GET",
      url:"http://localhost:5000/borrowed?page="+page,
      headers: {
        Authorization: 'Bearer ' + prop.token
      }
    })
    .then((response) => {
      const res = response.data
      console.log(response)
      res.access_token && prop.setToken(res.access_token)
      setBookData(({
        books: res
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  function showNextPage() {
    getBooksByPagination(currentPage + 1);
    currentPage = currentPage + 1
  }

  function showPrevPage() {
    let prevPage = 1
    getBooksByPagination(currentPage - prevPage)
    currentPage = currentPage - 1
  }

  useEffect(() => {
    getBooksByPagination(1);
    console.log("Book data loaded.");
  }, [""]);

  return (
      <div className="Borrowed Book">
          <h3>Borrowed Book List</h3>
          {bookData && <div>
            <table className="table table-bordered border-info" align = "center">
                        <thead>
                        <tr>
                            <th>ISBN13</th>
                            <th>Late?</th>
                            <th>Time left before due</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookData.books.length===0?
                            <tr align="center"><td colSpan="5">You have no borrowed book.</td></tr>:
                            bookData.books.map(
                                (books,index) =>(
                                    <tr key = {books.isbn13}>
                                        <td>{books.isbn13}</td>
                                        <td>{books.late ? 'Yes':'No'}</td>
                                        <td>{books.timeLeft} day</td>
                                        {/* Submit buttons */}
                                        <td>
                                          <Link to={`/return/${books.isbn13}`} className="btn btn-info"><FontAwesomeIcon icon={faEdit} /> Return</Link>
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
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={currentPage === 1 } onClick={showPrevPage}
                                                                 ><FontAwesomeIcon icon={faStepBackward} /> Previous</Button></li>
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={bookData.books.length !== 10} onClick={showNextPage}
                                                                 ><FontAwesomeIcon icon={faStepForward} /> Next</Button></li>
                                </ul>
                            </nav>
                        </div>
                    </table>
            </div>
          }
      </div>
  );
}

export default BorrowedBook;