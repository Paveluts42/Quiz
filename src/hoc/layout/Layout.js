import React, {Component} from "react";
import classes from "./Layout.module.css"
import MenuTogle from "../../components/navigation/meunTogleE/MenuTogle";
import Drower from "../../components/navigation/drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drower
                    onClose={this.menuCloseHandler}
                    isOpen={this.state.menu}
                    isAutenticated={this.props.isAutenticated}
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
function mapStateToProps(state) {
return{
    isAutenticated:!!state.auth.token
}
}

export default connect(mapStateToProps)(Layout)