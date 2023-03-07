import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { hadleLoginApi } from '../../services/userService';
import CreateUser from './CreateUser';
import { createNewUserService } from '../../services/userService'
import { toast } from "react-toastify";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            isShowCreateUser: false,
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await hadleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login Succeeds')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('hoidanit: ', error.response)

        }

    }
    hanleOnClickShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
    }

    handleRegister = () => {
        this.setState({
            isShowCreateUser: true
        })
    }
    toggleShowModal = () => {
        this.setState({
            isShowCreateUser: !this.state.isShowCreateUser
        })
    }

    createNewUser = async (data) => {
        let respone = await createNewUserService(data);
        if (respone && respone.errCode !== 0) {
            alert(respone.message);
        } else {
            this.setState({
                isShowCreateUser: false
            })
            toast.success('Create New User Succeed!')
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <CreateUser
                        isShowOpen={this.state.isShowCreateUser}
                        toggleShowModal={this.toggleShowModal}
                        createNewUser={this.createNewUser}
                    />
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label className='user-pass'>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label className='user-pass'>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyPress={(event) => this.handleKeyDown(event)} />
                                <span onClick={() => { this.hanleOnClickShowPassword() }}>
                                    <i className={this.state.isShowPassword ? "fa fa-eye" : "far fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 btn-loginBig'>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12 forgot-register'>
                            <div className='col-12 forgot-passwordBig' >
                                <span className="forgot-password">Forgot Password ?</span>
                            </div>
                            <div className='col-12 register' >
                                <span className="re-register" onClick={() => this.handleRegister()}>Register</span>
                            </div>
                        </div>
                        <div className='col-12 text-center Or-loginBig'>
                            <span className='Or-Login'>Or login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <a><i className="fab fa-google-plus-g google"></i></a>
                            <a><i className="fab fa-facebook-f facebook"></i></a>
                            <a><i className="fab fa-twitter twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
