import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'

const defauldFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defauldFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defauldFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert('Cannot create user, email alredy in use');
            } else {
                console.log('user creation encountered an error', error)
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} >

                <FormInput label="Display Name" type="text" id="displayName" name='displayName' required onChange={handleChange} value={displayName} />

                <FormInput label="Email" type="email" id="email" name='email' required onChange={handleChange} value={email} />

                <FormInput label="Password" type="password" id="password" name="password" required onChange={handleChange} value={password} />

                <FormInput label="Confirm password" type="password" id="confirmPassword" name='confirmPassword' required onChange={handleChange} value={confirmPassword} />

                <Button buttonType='' type="submit">Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;