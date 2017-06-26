import React, { PropTypes } from 'react'
import ReactPaginate from 'react-paginate'

import styles from '../../styles/pagination.css'

const Paginate = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    previousLabel="previous"
    nextLabel="next"
    breakLabel={<a href="">...</a>}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={onPageChange}
    containerClassName={styles.pagination}
    subContainerClassName={'pages pagination'}
    activeClassName={styles.active}
    disabledClassName={styles.disabled}
  />
)

Paginate.propTypes = {
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func,
}

export default Paginate
