import React from "react";
import { Component } from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    // state = {
    //   error: null,
    // };

    // componentDidMount() {
    //   axios.interceptors.request.use((req) => {
    //     this.setState({
    //       error: null,
    //     });
    //   });

    //   axios.interceptors.response.use(
    //     ((res) => res,
    //     (error) => {
    //       this.setState({
    //         error: error,
    //       });
    //     })
    //   );
    // }

    // errorConfirmHandler = () => {
    //   this.setState({
    //     error: null,
    //   });
    // };

    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            Something went wrong !
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
