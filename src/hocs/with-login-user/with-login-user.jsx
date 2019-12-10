import React, {PureComponent} from "react";
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

    render() {
      const {isInvalidMail, isInvalidPass} = this.state;
      return <Component
        {...this.props}
        isInvalidMail={isInvalidMail}
        isInvalidPass={isInvalidPass}
        onFormSubmit={this._handleFormSubmit}
        onInputBlur={this._handleInputBlur}
      />;
    }

    _handleFormSubmit() {
      const {setUser} = this.props;
      const {email, password, isInvalidMail, isInvalidPass} = this.state;
      if (email && password && !isInvalidMail && !isInvalidPass) {
        setUser({email, password});
      }
    }

    _handleInputBlur(e) {
      const {target} = e;
      if (target.name === `password`) {
        this.setState({isInvalidPass: !(target.value.length >= 3)});
      }
      if (target.name === `email`) {
        const isValid = (target.value && /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(target.value) && /(\.com|\.ru)$/.test(target.value));
        this.setState({isInvalidMail: !isValid});
      }
      this.setState({[target.name]: target.value});
    }
  }

  WithLoginUser.propTypes = {
    setUser: PropTypes.func.isRequired
  };

  return WithLoginUser;
};

export default withLoginUser;
