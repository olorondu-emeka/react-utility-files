import React, { Component } from 'react';
import axios from '../axios-instance';
import SuccessLabel from "../components/UI/SuccessLabel";
import ErrorLabel from "../components/UI/ErrorLabel";
import Spinner from '../components/UI/Spinner';
import DismissModal from "../components/UI/DismissModal";

const formValidator = (WrappedComponent, appState, adminStatus, adminType) => {
    return class extends Component{

        state = {
            registerForm: {...appState},
            formIsValid: false,
            responseMsg: '',
            hasError: false,
            errorMsg: null
        };




        checkValidity (value, validationRule) {
            let isValid = true;

            if (validationRule.required)  {
                isValid =( value.trim() !== '') && (isValid );
            }

            if (validationRule.minLength){
                isValid = (value.length >= validationRule.minLength) && (isValid);
            }

            if (validationRule.maxLength){
                isValid = (value.length <= validationRule.maxLength) && (isValid);
            }

            if (validationRule.email){
                let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                isValid = regex.test(value) && isValid;

            }

            if(validationRule.passwordMatcher){
                isValid = (value === this.state.registerForm.password.value) && isValid;
            }

            if (validationRule.phoneNo){
                // write a Regular Expression that allows only 11 digit phone numbers
                // eg 08012345678
                let regex = /^\d{11}$/;
                isValid = regex.test(value) && isValid;
            }

            return isValid;

        }


        inputChangedHandler = (event, inputIdentifier) => {
            const registerFormClone = { ...this.state.registerForm };
            const updatedFormElement = { ...registerFormClone[inputIdentifier] };

            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
            updatedFormElement.wasTouched = true;
            registerFormClone[inputIdentifier] = updatedFormElement;

            //check overall validity of form
            let formValidChecker = true;
            for (let formElement in this.state.registerForm){
                formValidChecker = registerFormClone[formElement].valid && formValidChecker;
            }

            //set the state on change
            this.setState({ registerForm: registerFormClone, formIsValid: formValidChecker });


        };

        onBlurHandler =(elementID) => {
            if (elementID === 'password'){
                const registerFormClone = { ...this.state.registerForm };
                const updatedFormElement = { ...registerFormClone['passwordConfirm'] };
                const match = updatedFormElement.value === this.state.registerForm['password'].value;

                if (!match){
                    updatedFormElement.valid = false;
                    registerFormClone['passwordConfirm'] = updatedFormElement;

                    //check overall validity of form
                    let formValidChecker = true;
                    for (let formElement in this.state.registerForm){
                        formValidChecker = registerFormClone[formElement].valid && formValidChecker;
                    }

                    this.setState({ registerForm: registerFormClone, formIsValid: formValidChecker });
                }

            }
        };

        // handler for submitting form
        submitForm = (event) => {
            event.preventDefault();
            // const register = document.querySelector('.register');
            document.body.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            console.log(window.scrollX, window.scrollY);

            let formValues = {};

            // show a spinner
            let theSpinner = <Spinner/>;
            this.setState({ responseMsg: theSpinner, hasError: false, errorMsg: null });

            for (let formKeys in this.state.registerForm){
                formValues[formKeys] = this.state.registerForm[formKeys].value;
            }


            // submit the form
            let thePath = this.props.match.url === '/' ? this.props.match.url + 'register_student' : this.props.match.url;

            // axios post request
            axios.post(thePath, formValues)
                .then(result => {

                    let registerFormClone = { ...this.state.registerForm };
                    let registerFormCloneKeys = [];

                    // immutably copy each key
                    for (let key in registerFormClone){
                        let tempObject =  { ...registerFormClone[key] } ;
                        registerFormCloneKeys.push(tempObject);

                    }

                    // display appropriate label based on registered status
                    let theMsg = result.data.registered ? <SuccessLabel message={result.data.message} /> : <ErrorLabel message={result.data.message}/>;
                    let theIndex = 0;

                    // redirect if registration is successful
                    if (result.data.registered){

                        // edit the cloned form fields
                        registerFormCloneKeys.forEach(theObject => {
                            theObject.value = '';
                            theObject.valid = false;

                            // if wasTouched property exists, reset to false
                            if(theObject.wasTouched){
                                theObject.wasTouched = false;
                            }
                        });

                        // set the edited values into the cloned registerForm
                        for(let key in registerFormClone){
                            registerFormClone[key] = registerFormCloneKeys[theIndex];
                            theIndex += 1;
                        }

                        // set state immutably
                        this.setState({ responseMsg: theMsg, registerForm: registerFormClone, formIsValid: false });

                        // redirection options
                        if (adminStatus === 'admin'){
                            // store token and user details in the local storage
                            window.localStorage.setItem('token', result.data.token);
                            window.localStorage.setItem('user', JSON.stringify(result.data.user) );
                            
                            switch(adminType){
                                case 'school':
                                    this.props.history.replace('/school_admin/dashboard');
                                    break;
                                case 'church':
                                    this.props.history.replace('/church_admin/dashboard');
                                    break;
                                default:
                                    this.props.history.replace(this.props.match.url);
                                    break;
                            }
                        }
                        else{
                            this.props.history.replace(this.props.match.url);
                        }
                    } // end registered if statement
                    else{
                        this.setState({ responseMsg: theMsg });
                    }

                })
                .catch(error => {
                    this.setState({ hasError: true, errorMsg: error.message, responseMsg: '' });
                });

        };  // end submit form

        dismissModal = () => {
            this.setState({
                hasError: false,
                errorMsg: null
            });
        };


        render() {
            let theForm = this.state.registerForm;
            return (
                <React.Fragment>
                    <DismissModal showModal={this.state.hasError} modalTitle="Error" modalMessage={this.state.errorMsg} dismissAction={this.dismissModal}/>

                    <WrappedComponent
                        registerForm={theForm}
                        inputChangedHandler={this.inputChangedHandler}
                        onBlurHandler={this.onBlurHandler}
                        formIsValid={this.state.formIsValid}
                        submitForm={this.submitForm}
                        responseMsg={this.state.responseMsg}
                        {...this.props}
                    />
                </React.Fragment>

                
            );
        }
    }
};

formValidator.displayName = 'formValidator';

export default formValidator;