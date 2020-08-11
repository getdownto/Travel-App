import React from 'react'
import styles from './Pagination.module.css'
import { number } from 'yup'

const Pagination = (props) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i)
    }
    let classString = ''

    return (
        <div className={styles.PaginationContainer}>
            <div className={[styles.Prev, styles.Arrow].join(' ')} onClick={props.prevPage}></div>
            <ul className={styles.Pagination}>
                {pageNumbers.map(number => {
                    {props.currentPage === number ? classString = [styles.Page, styles.Active] : classString = [styles.Page]}
                    return <li className={classString.join(' ')} key={number}>
                        <div className={styles.Number} onClick={() => props.paginate(number)}>{number}</div>
                    </li>
                })}
            </ul>
            <div className={[styles.Next, styles.Arrow].join(' ')} onClick={props.nextPage}></div>
        </div>
    )
}
export default Pagination