import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as actions from  '../../store/actions/index'
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import Spinner from '../../components/UI/LoadingIndicator/LoadingIndicator'
import { Redirect } from 'react-router-dom'

const Auth = (props) => {

    const [ authForm,setAuthForm ] = useState({
        email: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Mail',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
                isEmail: true
            },
            valid: true
        },
        password: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Password',
                type: 'password'
            },
            value: '',
            validation: {
                isrequired: true,
                minLength: 7
            },
            valid: true
        },
    })
    const [isSignup, setIsSignup] = useState(true)


const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.isrequired) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}

const inputchangeHandler = (event, controlname) => {
    const updatedControls = {
        ...authForm,
        [controlname]: {
            ...authForm[controlname],
            value: event.target.value,
            valid: checkValidity(event.target.value, authForm[controlname].validation)
        }
    }
    setAuthForm(updatedControls)
}

const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
}

const authenticationHandler = (event) => {
    event.preventDefault()
    props.onAuthHandler(authForm.email.value, authForm.password.value, isSignup)
}

let formelementarray = [];
for (let key in authForm) {
    formelementarray.push({
        id: key,
        config: authForm[key]
    })
}
let form =
    <form>
        {formelementarray.map(formelement => (
            <Input key={formelement.id}
                shouldvalidate={formelement.config.validation}
                validity={formelement.config.valid}
                changd={(event) => inputchangeHandler(event, formelement.id)}
                label={formelement.id}
                elementtype={formelement.config.elementtype}
                elementconfig={formelement.config.elementconfig}
                value={formelement.config.value} />
        ))}
    </form>

let errorMessage = null
if (props.error) {
    errorMessage = <p>{props.error.message}</p>
}

let authRedirect = null;
if (props.isAuthenticated) {
        authRedirect = <Redirect to="/mytasks" />
    }

return (
    <div>
        <div className="Auth">
            {authRedirect}
            {errorMessage}
            {form}
            <button onClick={authenticationHandler} type="button" className="btn btn-light">{isSignup ? 'Create Account' : 'Log-IN'}</button>
            {props.loading && <Spinner />}
        </div>
        <div className="signupbutton">
            <button onClick={switchAuthModeHandler} type="button" className="btn btn-light">{isSignup ? 'Already have an Account. Sign-In Over here' : 'New To DoToDO ? Create New Account'}</button>
        </div>
    </div>
)
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToState = dispatch => {
    return{
        onAuthHandler: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Auth)