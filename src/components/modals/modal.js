  
import React from 'react';


const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                    <button className="close-modal-btn" onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default modal;