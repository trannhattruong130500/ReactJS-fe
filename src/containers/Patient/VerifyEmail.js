import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookApointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            console.log(`check props: `, this.props)
            console.log(`check token: `, token, doctorId)
            let res = await postVerifyBookApointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode ? res.errCode : -1
                })
            }
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }


    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className='verify-email-booking'>
                    {statusVerify === false ?
                        <div> Loading</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='infor-booking'>
                                    Xác nhận lịch hẹn thành công
                                </div>
                                :
                                <div className='infor-booking'>
                                    Lịch hẹn không tồn tại hoặc đã được xác nhận
                                </div>
                            }
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
