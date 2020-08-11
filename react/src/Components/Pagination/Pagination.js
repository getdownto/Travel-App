import React from 'react'
import styles from './Pagination.module.css'

const Pagination = (props) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i)
    }
    let classString = ''

    return (
        <div className={styles.PaginationContainer}>
            <ul className={styles.Pagination}>
                {pageNumbers.map(number => {
                    {props.currentPage === number ? classString = [styles.Page, styles.Active] : classString = [styles.Page]}
                    return <li className={classString.join(' ')} key={number}>
                        <div className={styles.Number} onClick={() => props.paginate(number)}>{number}</div>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default Pagination