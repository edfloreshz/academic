import React, { Component } from "react";
import { isLogin } from "../../utils/LoginManager";
import Menu from "./Navigation/Menu/Menu";
import TopBar from "./Navigation/TopBar/TopBar";
import "./Layout.css"

interface Props {
    theme: string,
    switchTheme: () => void
    setInitialTheme: () => void
}

class Layout extends Component<Props> {
    componentDidMount() {
        this.props.setInitialTheme()
    }

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
                    <div className="Menu-Bar">
                        <TopBar theme={this.props.theme} switchTheme={this.props.switchTheme} />
                    </div>
                    <div className="NavigationBar">
                        {this.renderNavigationMenu()}
                    </div>
                    <div className="Content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;