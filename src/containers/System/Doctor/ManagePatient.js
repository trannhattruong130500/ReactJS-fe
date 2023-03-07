import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService'
import moment from 'moment';
import { Button } from 'reactstrap';
import { LANGUAGES } from '../../../utils';
import RemedyModel from './RemedyModel';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isShowOpenModel: false,
            dataModel: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnComfirm = (item) => {
        console.log(`check item: `, item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isShowOpenModel: true,
            dataModel: data
        })
    }

    closeModal = () => {
        this.setState({
            isShowOpenModel: false,
            dataModel: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModel } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            patientName: dataModel.patientName,
            doctorId: dataModel.doctorId,
            patientId: dataModel.patientId,
            timeType: dataModel.timeType,
            language: this.props.language,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy succeeds!')
            await this.getDataPatient()
            this.closeModal()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send error!');
            console.log(res)
        }
    }

    render() {
        let { dataPatient, isShowOpenModel, dataModel } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='form-group col-4 ml-4'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>FullName</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Sex</th>
                                        <th>Phone Number</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 &&
                                        dataPatient.map((item, index) => {
                                            let gender = language === LANGUAGES.VI ?
                                                item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.email}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.patientData.phoneNumber}</td>
                                                    <td>{time}</td>
                                                    <td>
                                                        <button className='btn btn-primary' onClick={() => this.handleBtnComfirm(item)}>
                                                            Gửi hóa đơn
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <RemedyModel
                        isShowOpenModel={isShowOpenModel}
                        dataModel={dataModel}
                        closeModal={this.closeModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
