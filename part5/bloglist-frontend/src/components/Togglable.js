import {forwardRef, useImperativeHandle, useState} from "react"
import PropTypes from 'prop-types'
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
    return (<div>
        <div style={showWhenVisible}>
            {props.children}
        </div>
        <button style={hideWhenVisible} onClick={toggleVisibility}> {props.buttonLabel} </button>
        <button style={showWhenVisible} onClick={toggleVisibility}> cancel </button>

    </div>)
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable