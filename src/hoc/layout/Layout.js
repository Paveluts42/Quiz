import React, { Component } from "react";
import classes from "./Layout.module.css"
import MenuTogle from "../../components/navigation/meunTogleE/MenuTogle";
import Drower from "../../components/navigation/drawer/Drawer";

class Layout extends Component {
    state = {
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    render() {
        return (
            <div className={classes.Layout}>
                <Drower
                    isOpen={this.state.menu}
                />

                <MenuTogle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout