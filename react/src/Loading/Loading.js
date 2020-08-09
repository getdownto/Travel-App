import React from 'react'
import '../Loading/Loading.css'
const Loading = (props) => {
    return (
        <div className="LoadingContainer">
            <img src="/loading.svg" alt="loading" />
        </div>
    )
}
export default Loading