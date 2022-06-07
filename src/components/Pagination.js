import React from 'react'
import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
    let {pageCount, handlePageClick, forcePage} = props;
    //console.log("--Pagination props--",props);
  return (
    <div>
        <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        onPageChange={(event)=>handlePageClick(event)}
        containerClassName="pagination"
        activeClassName="active"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        pageClassName="page-item"
        breakClassName="page-item"
        nextClassName="page-item"
        previousClassName="page-item"
        previousLabel={<>&laquo;</>}
        nextLabel={<>&raquo;</>}
        forcePage={forcePage}
      />
    </div>
  )
}
