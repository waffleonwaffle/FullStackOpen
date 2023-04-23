import {useState} from "react"
const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }
    return (<div>
        <div style={showWhenVisible}>
            {props.children}
        </div>
        <button style={hideWhenVisible} onClick={() => setVisible(true)}> {props.buttonLabel} </button>
        <button style={showWhenVisible} onClick={() => setVisible(false)}> cancel </button>

    </div>)
}

export default Togglable