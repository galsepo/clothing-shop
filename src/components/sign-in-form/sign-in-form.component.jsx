import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signInWithGooglePopup, createUserDocumentFromAuth, singInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';


import './sign-in-form.styles.scss'

const defauldFormFields = {
    email: "",
    password: ""
};



const SignInForm = () => {

    const [formFields, setFormFields] = useState(defauldFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defauldFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await singInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user assoiciated with this email');
                    break;
                default:
                    console.log(error);
            }
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >

                <FormInput label="Email" type="email" id="email-in" name='email' required onChange={handleChange} value={email} />

                <FormInput label="Password" type="password" id="password-in" name="password" required onChange={handleChange} value={password} />
                <div className='buttons-container'>
                    <Button buttonType="" type="submit">Sign In</Button>

                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;