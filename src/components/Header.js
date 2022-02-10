import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

export const Header = ({ title, onShow, showAdd }) => {
    const { pathname } = useLocation();
    return (
        <header className='header'>
            <h1>{title}</h1>
            {pathname === '/' && <Button text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'red' : 'green'} onClick={onShow} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;