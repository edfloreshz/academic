import React, { Component } from "react";
import { isLogin } from "../../utils/LoginManager";
import Menu from "./Navigation/Menu/Menu";
import TopBar from "./Navigation/TopBar/TopBar";
import "./Layout.css"

interface Props {
    theme: string,
    switchTheme: () => void
}

class Layout extends Component<Props> {

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
            <div>
                <div className="wrapper">
                    <div className="NavMenu">
                        <TopBar theme={this.props.theme} switchTheme={this.props.switchTheme} />
                    </div>
                    <div className="NavigationMenu">
                        {this.renderNavigationMenu()}
                    </div>
                    <div className="Content">
                        <div className="Spacer"/>
                        <div className="Childs">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;