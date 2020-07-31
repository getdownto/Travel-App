import React from 'react'
import '../Modal/Modal.css'
import Aux from '../hoc/Auxiliary'
import Backdrop from '../BackDrop/BackDrop'

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show}></Backdrop>
            <div className="Modal" style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                <div className="Close" onClick={props.show}></div>
                {props.children}
            </div>
        </Aux>
    )
}

export default Modal