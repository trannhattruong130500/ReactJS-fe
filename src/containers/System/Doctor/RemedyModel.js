import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModel.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { CommonUtils } from '../../../utils'

class RemedyModel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModel) {
            this.setState({
                email: this.props.dataModel.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModel !== this.props.dataModel) {
            this.setState({
                email: this.props.dataModel.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }


    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleOnSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }


    render() {
        let { isShowOpenModel, closeModal, dataModel, sendRemedy } = this.props
        return (
            <>
                <Modal
                    isOpen={isShowOpenModel}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi hóa đơn khám</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control' type="email" value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn File đơn thuốc</label>
                                <input type="file" onChange={(event) => this.handleOnChangeImage(event)} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleOnSendRemedy()}>Submit</Button>
                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
