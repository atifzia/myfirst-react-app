import React from 'react';
import PropTypes from 'prop-types'


export const Button = ({ onClick, children, className = '' }) =>
    <button
        className={className}
        onClick={onClick} >
        {children}
    </button>

Button.prototypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

Button.defaultProps = {
    className: '',
}
export const IsLoading = () =>
    <div><h1>loading...</h1></div>



export const Sort = ({ sortKey, onSort, children, active }) => {
    const sortClass = ['btn default sortBtn']
    if (sortKey === active) {
        sortClass.push('btn-primary')
    }
    return (
        < Button
            className={sortClass.join(' ')}
            onClick={() => onSort(sortKey)}
        >
            {children}
        </Button >
    )
}
