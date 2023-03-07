import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CreateUser.scss'

class Default extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {

    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    toggle = () => {
        this.props.toggleShowModal();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidDate = () => {
        let valid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                valid = false;
                alert('Please fill full information!!!')
                break;
            }
        }
        return valid;
    }

    handleAddNewUser = () => {
        let valid = this.checkValidDate();
        if (valid === true) {
            this.props.createNewUser(this.state);
        }
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isShowOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-users-container'}
                    size='lg'
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Create New Users</ModalHeader>
                    <ModalBody>
                        <div className='modal-users-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                    value={this.state.email}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                    value={this.state.password}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>First Name</label>
                                <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                    value={this.state.firstName}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Last Name</label>
                                <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                    value={this.state.lastName}
                                ></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address</label>
                                <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                    value={this.state.address}
                                ></input>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3'
                            onClick={() => { this.handleAddNewUser() }}>Add New</Button>{' '}
                        <Button color="secondary" className='px-3'
                            onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Default);
