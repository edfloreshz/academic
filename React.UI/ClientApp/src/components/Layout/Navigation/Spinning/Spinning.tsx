import React, { Component } from 'react'

export default class Spinning extends Component {
    render() {
        return (
            <div className="center">
                <div className="lds-ring"><div/><div/><div/><div/></div>
            </div>
        )
    }
}
