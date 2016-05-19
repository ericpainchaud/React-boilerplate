import React, { Component, PropTypes } from 'react';
import ReactF1 from 'react-f1';
import Resize from 'brindille-resize';

import { states, IDLE, SHOW, HIDE } from './PreloaderF1States';
import transitions from './PreloaderF1Transitions';
import styles from './Preloader.css';

/**
 * Preloader component
 */
export default class Preloader extends Component {

  static get propTypes() {
    return {
      onLoaded: PropTypes.func,
      onHidden: PropTypes.func,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      go: SHOW,
      progress: 0,
      width: 0,
      height: 0,
    };

    this.resizeHandler = this.resizeHandler.bind(this);
    this.completeF1Handler = this.completeF1Handler.bind(this);
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ go: IDLE });
    }, 0);

    Resize.addListener(this.resizeHandler);
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    Resize.removeListener(this.resizeHandler);
  }

  /**
   * resizeHandler
   */
  resizeHandler() {
    this.setState({
      width: Resize.width,
      height: Resize.height,
    });
  }

  /**
   * load
   */
  load() {
    window.setTimeout(() => {
      this.props.onLoaded();
      this.setState({ progress: 100 });
      this.hide();
    }, 1000);
  }

  /**
   * completeAnimationHandler
   */
  completeF1Handler() {
    switch (this.state.go) {

      case IDLE:
        this.load();
        break;

      case HIDE:
        this.props.onHidden();
        break;

      default:
        window.console.log('Preloader::completeF1Handler:', this.state.go);
    }
  }

  /**
   * hide
   */
  hide() {
    this.setState({ go: HIDE });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const styleContainer = { width: this.state.width, height: this.state.height };

    return (
      <ReactF1
        className={styles.Preloader}
        go={this.state.go}
        states={states()}
        transitions={transitions()}
        onComplete={this.completeF1Handler}
      >
        <div className={styles.container} data-f1="container" style={styleContainer}>
          <section>
            <p data-f1="title">Loading...</p>
            <div data-f1="progressbar" className={styles.progressbar} />
          </section>
        </div>
      </ReactF1>
    );
  }
}
