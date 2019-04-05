import React, { Component } from 'react';

import './Header.css';
class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <a href="/">
                        hipages
                    </a>
                </div>
            </header>
        )
    }
}

export default Header