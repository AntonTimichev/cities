import React, {PureComponent} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const withLoginUser = (Component) => {
  class WithLoginUser extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        email: ``,
        password: ``,
        isInvalidMail: false,
        isInvalidPass: false
      };

      this._handleInputBlur = this._handleInputBlur.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    componentDidMount() {
      const {loginError} = this.props;
      loginError(false);
      window.scrollTo(0, 0);
    }

    render() {
      const {isInvalidMail, isInvalidPass} = this.state;
      const {isAuth} = this.props;
      return isAuth
        ? <Redirect to="/favorite" />
        : <Component
          {...this.props}
          isInvalidMail={isInvalidMail}
          isInvalidPass={isInvalidPass}
          onFormSubmit={this._handleFormSubmit}
          onInputBlur={this._handleInputBlur}
        />;
    }

    _handleFormSubmit() {
      const {loginUser} = this.props;
      const {email, password, isInvalidMail, isInvalidPass} = this.state;
      if (email && password && !isInvalidMail && !isInvalidPass) {
        loginUser({email, password});
      } else {
        this.setState((_prevState) => {
          return {
            isInvalidMail: this._checkInvalidMail(email),
            isInvalidPass: (password.length < 3)
          };
        });
      }
    }

    _handleInputBlur(e) {
      const {target: {name, value}} = e;
      if (name === `password`) {
        this.setState({isInvalidPass: (value.length < 3)});
      }
      if (name === `email`) {
        this.setState({isInvalidMail: this._checkInvalidMail(value)});
      }
      this.setState({[name]: value});
    }

    _checkInvalidMail(value) {
      return !(value && /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value) && /(\.com|\.ru)$/.test(value));
    }
  }

  WithLoginUser.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
    loginError: PropTypes.func.isRequired
  };

  return WithLoginUser;
};

export default withLoginUser;
