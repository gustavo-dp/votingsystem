import React from 'react'
import './bluebutton.css'

const BlueButton = ({ children, style, ...props }) => {
    return (
        <button
            className="btn-create"
            style={style}
            {...props}
        >
            {children}
        </button>
    )
}

export default BlueButton