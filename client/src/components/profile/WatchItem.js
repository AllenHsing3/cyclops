import React from 'react'
import PropTypes from 'prop-types'

const WatchItem = ({match}) => {
    return (
        <div>
            <p>{match.params.watchId}</p>
        </div>
    )
}

WatchItem.propTypes = {

}

export default WatchItem
