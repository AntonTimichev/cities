import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";
import leaflet from "leaflet";

import history from "../../history.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import withPrivateRoute from "../with-private-route/with-private-route.jsx";
import Favorites from "../../components/favorites/favorites.jsx";
import Header from "../../components/header/header.jsx";
import Property from "../../components/property/property.jsx";
import {getIsLoaded} from "../../reducer/data/selectors.js";

const WithPrivateRoute = withPrivateRoute();

const withSwitchPages = (Component) => {
  class WithSwitchPages extends PureComponent {

    render() {
      const {isLoaded} = this.props;
      return isLoaded &&
      <Router history={history}>
        <Header isAuth={true} />
        <Switch>
          <Route path="/" exact render={() => <Component {...this.props} leaflet={leaflet} />} />
          <Route path="/login" component={SignIn} />
          <Route path="/offer/:id" component={Property} />
          <WithPrivateRoute path="/favorite" component={Favorites} />
        </Switch>
      </Router>;
    }
  }

  WithSwitchPages.propTypes = {
    isLoaded: PropTypes.bool.isRequired
  };

  return WithSwitchPages;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isLoaded: getIsLoaded(state)
});

export default compose(connect(mapStateToProps), withSwitchPages);
