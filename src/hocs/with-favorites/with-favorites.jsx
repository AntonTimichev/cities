import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import FavoritesEmpty from "../../components/favorites-empty/favorites-empty.jsx";
import ErrorComponent from "../../components/error-component/error-component.jsx";

import {Operation as FavoritesOperation} from "../../reducer/favorites/favorites.js";
import {
  getFavoritesData,
  getIsFavoritesEmpty,
  getLoadingErrorFavorites,
  getIsLoadedFavorites} from "../../reducer/favorites/selectors.js";

const withFavorites = (Component) => {
  class WithFavorites extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isLoaded: false
      };
    }

    componentDidMount() {
      const {loadFavorites, isLoadedFavorites} = this.props;
      // if (isLoadedFavorites) {
      //   this.setState({isLoaded: true});
      //   return;
      // }
      loadFavorites(isLoadedFavorites)
        .then((bool) => {
          if (bool) {
            this.setState({isLoaded: bool});
          }
        });
    }

    render() {
      const {isLoaded} = this.state;
      const {isFavoritesEmpty, loadingErrorFavorites, loadFavorites} = this.props;
      if (loadingErrorFavorites) {
        return <ErrorComponent
          errorMessage={loadingErrorFavorites}
          reLoadData={loadFavorites}
        />;
      }
      if (isLoaded) {
        return isFavoritesEmpty
          ? <FavoritesEmpty />
          : <Component
            {... this.props}
            onItemClick={() => {}}
            activeItem={-1}
          />;
      }
      return null;
    }
  }

  WithFavorites.propTypes = {
    loadFavorites: PropTypes.func.isRequired,
    isFavoritesEmpty: PropTypes.bool.isRequired,
    loadingErrorFavorites: PropTypes.string.isRequired,
    isLoadedFavorites: PropTypes.bool.isRequired
  };

  return WithFavorites;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isFavoritesEmpty: getIsFavoritesEmpty(state),
  favorites: getFavoritesData(state),
  loadingErrorFavorites: getLoadingErrorFavorites(state),
  isLoadedFavorites: getIsLoadedFavorites(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: (isLoadedFavorites) => dispatch(FavoritesOperation.loadFavorites(isLoadedFavorites))
});

export {withFavorites};
export default compose(connect(mapStateToProps, mapDispatchToProps), withFavorites);
