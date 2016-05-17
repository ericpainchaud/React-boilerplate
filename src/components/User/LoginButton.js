import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './LoginButton.css';

import * as actions from './userActions';

/**
 * Redux
 */

/* eslint-disable */
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
/* eslint-enable */

/**
 * LoginButton component
 */

class LoginButton extends Component {

  static get propTypes() {
    return {
      isLoggedIn: PropTypes.bool,
      actions: PropTypes.object,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = {};

    this.clickHandler = this.clickHandler.bind(this);
  }

    /**
   * clickHandler
   */

  clickHandler() {
    if (this.props.isLoggedIn) {
      this.props.actions.logOut();
    } else {
      this.props.actions.logIn();
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const l = (this.props.isLoggedIn) ? 'LogOut' : 'LogIn';

    return (
      <span className={styles.LoginButton}>
        <a href="#" onClick={this.clickHandler}>{l}</a>
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
