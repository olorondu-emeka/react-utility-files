import  React, { Component } from 'react';

import Wrapper from './Wrapper';
import DismissModal from '../components/UI/DismissModal';
import axios from '../axios-instance';


const errorHandler = (WrappedComponent) => {
    return class errorHandler extends Component {
        state = {
           error: null,
            errorPresent: false
        };

        componentDidMount(){
            // clear any previous error for every new request
            axios.interceptors.request.use(request => {
                //this.setState({ error: null });
                return request;
            });

            // intercept the response for the error
            axios.interceptors.response.use(response => response, error => {

                this.setState({ error: error.message, errorPresent: true });
            });
        }

        
       render() {
            // check if error is present;
           let errorTester = this.state.error !== null ;  // returns true or false

           // show error message if error is present
           let errorMessage = errorTester ? this.state.error : null;

           return (
               <Wrapper>
                 <DismissModal showModal={errorTester} modalTitle="Error" modalMessage={errorMessage}/>
                 <WrappedComponent {...this.props}/>
               </Wrapper>
           )
       }
    }
};

errorHandler.displayName = 'errorHandler';

export default errorHandler;
