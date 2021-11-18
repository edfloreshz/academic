import React, { Component } from "react";
import NavMenu from './NavMenu/NavMenu'
import "./Layout.css"
import { isLogin } from "../../utils/LoginManager";
import NavigationMenu from './NavMenu/NavigationMenu';

class Layout extends Component {

    renderNavigationMenu() {
        if (isLogin()) {
            return (
                <NavigationMenu />
            );
        } else {
            return <></>;
        }
    }
    render() {
        return (
            <>
                <div className="wrapper">
                    <div className="NavMenu">
                        <NavMenu />
                    </div>
                    <div className="NavigationMenu">
                        {this.renderNavigationMenu()}
                    </div>
                    <div className="Content">
                        <div className="Spacer"></div>
                        <div className="Childs">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Layout;