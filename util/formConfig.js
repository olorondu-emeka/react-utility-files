export let plainTextInput = (theLabel, theType) => {
    return  {
        elementType: 'input',
        elementConfig: {
            type: theType
        },
        validation: {
            required: true,
            message: `Please supply your ${theLabel}`
        },
        valid: false,
        value: '',
        label: theLabel,
        wasTouched: false
    }
};

export let configureDropdown = (label, options) => {
    return {
        elementType: 'select',
        elementConfig: {
            optionValues: options
        },
        validation: {
            required: true,
            message: 'Please select an option'
        },
        valid: false,
        value: '',
        label: label,
        wasTouched: false
    }
};

export let email = {
    elementType: 'input',
    elementConfig: {
        type: 'email'
    },
    validation: {
        required: true,
        email: true,
        message: 'Please enter a valid email'
    },
    valid: false,
    value: '',
    label: 'Email',
    wasTouched: false
};

export let password = {
    elementType: 'input',
    elementConfig: {
        type: 'password'
    },
    validation: {
        required: true,
        minLength: 1,
        message: 'Please supply a password'
    },
    valid: false,
    value: '',
    label: 'Password',
    wasTouched: false
};

export let passwordConfirm = {
    elementType: 'input',
    elementConfig: {
        type: 'password'
    },
    validation: {
        required: true,
        passwordMatcher: true,
        minLength: 1,
        message: 'The passwords do not match'
    },
    valid: false,
    value: '',
    label: 'Confirm Password',
    wasTouched: false
};

export let phoneNo = {
    elementType: 'input',
    elementConfig: {
        type: 'tel'
    },
    validation: {
        required: true,
        minLength: 11,
        maxLength: 11,
        phoneNo: true,
        message: 'Please enter a valid phone number e.g 08012345678'
    },
    valid: false,
    value: '',
    label: 'Phone Number',
    wasTouched: false,
    placeholder: 'e.g.  08012345678'
};



