import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Login.css';
import { emailLogin, emailSignUp, githubSignIn, googleSignIn, initLoginFramework } from './LoginManager';
import GoogleIcon from '../../img/icon/google.png';
import GithubIcon from '../../img/icon/github.png';

initLoginFramework();

const Login = () => {
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const handleSocialSignIn = signInMethod => {
        signInMethod()
        .then(res =>{
            setUser(res);
            history.replace(from);
        })
        .catch(err => handleError(err.message));
    }

    const handleFormSubmit = data => {
        const {name, email, password} = data;

        if(newUser){
            emailSignUp(name, email, password)
            .then(res => {
                setUser(res);
                history.replace(from);
                reset();
            })
            .catch(err => handleError(err.message));
        } else{
            emailLogin(email, password)
            .then(res =>{
                setUser(res);
                history.replace(from);
                reset();
            })
            .catch(err => handleError(err.message));
        }
    };

    const handleError = errorMessage => {
        setUser({
            isLoggedIn: false,
            error: errorMessage
        })
    }

    return (
        <section className="login">
            <div className="container">
                <div className="login__inner">
                    <div className="login__form--box">
                        <h2 className="login__title">{newUser ? "Create an account" : "Login"}</h2>
                        {
                            user.error && <p className="login__error">{user.error}</p>
                        }
                        <form className="login__form" onSubmit={handleSubmit(handleFormSubmit)}>
                            {
                                newUser && <div className="input__group">
                                <input
                                name="name" type="text"
                                ref={register({ required: "* Name is required" })}
                                placeholder="Name" />
                                {errors.name && <p className="error">{errors.name.message}</p>}
                            </div>
                            }
                            <div className="input__group">
                                <input name="email" type="email"
                                ref={register({
                                    required: "* Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Email address must be valid"
                                    }
                                    })}
                                    placeholder="Email" />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                            <div className="input__group">
                                <input name="password" type="password"
                                ref={register({
                                    required: "* Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter and one number digit"
                                    }
                                    })}
                                    placeholder="Password" />
                                {errors.password && <p className="error">{errors.password.message}</p>}
                            </div>
                            {
                                newUser && <div className="input__group">
                                <input name="confirmPassword" type="password"
                                ref={register({
                                    required: "* Confirmation password is required",
                                    validate: value => value === password.current || "The passwords does not match"
                                    })}
                                    placeholder="Confirm Password" />
                                {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                            </div>
                            }
                            { newUser ? (
                                    <input type="submit" className="btn btn__primary" value="Create an account" />
                                ) : (
                                    <input type="submit" className="btn btn__primary" value="Login" />
                                )}
                        </form>
                        { newUser ? (
                                <p className="login__toggle">Already have an account?<span onClick={() => setNewUser(false)}>Login</span></p>
                            ) : (
                                <p className="login__toggle">Don't have an account?<span onClick={() => setNewUser(true)}>Create an account</span></p>
                            )}
                    </div>
                    <div className="login__bottom">
                        <div className="login__divider"></div>
                        <div className="login__social--box">
                            <button onClick={()=>handleSocialSignIn(googleSignIn)} className="login__social btn"><img src={GoogleIcon} alt="Google" /><span>Continue with Google</span></button>
                            <button onClick={()=>handleSocialSignIn(githubSignIn)} className="login__social btn"><img src={GithubIcon} alt="Google" /><span>Continue with Github</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;