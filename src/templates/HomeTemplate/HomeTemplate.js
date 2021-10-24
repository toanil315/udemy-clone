import { Fragment } from "react";
import { Route } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import Header from "../../component/Header/Header";

export const HomeTemplate = (props) => {
    const {Component, ...restProps} = props;
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Header />
            <Component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}