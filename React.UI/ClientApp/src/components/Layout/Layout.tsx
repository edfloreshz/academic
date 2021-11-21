import React, { Component } from "react";
import { isLogin } from "../../utils/LoginManager";
import Menu from "./Navigation/Menu/Menu";
import TopBar from "./Navigation/TopBar/TopBar";
import "./Layout.css"

class Layout extends Component {

    renderNavigationMenu() {
        if (isLogin()) {
            return (
                <Menu />
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
                        <TopBar />
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