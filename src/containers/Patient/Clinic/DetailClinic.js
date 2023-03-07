import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById, getAllCodeServer } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            showDetailSpecialty: false
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id: id,
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnclickViewMore = (status) => {
        this.setState({
            showDetailSpecialty: status
        })
    }

    render() {
        let { arrDoctorId, dataDetailClinic, showDetailSpecialty } = this.state;
        let { language } = this.props
        console.log(`hoidanIT: check state: `, this.state);
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='description-specialty'>
                    {/* {showDetailSpecialty === false &&
                        <>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div className='edit-view-more-hide' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                            <div className='button-more'>
                                <span onClick={() => this.handleOnclickViewMore(true)}> Xem Thêm </span>
                            </div>
                        </>
                    }
                    {showDetailSpecialty === true &&
                        <>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div className='edit-view-more-show' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                            <div className='button-more'>
                                <span onClick={() => this.handleOnclickViewMore(false)}> Ẩn bớt </span>
                            </div>
                        </>
                    } */}
                    {showDetailSpecialty === false ?
                        <>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>
                                    <div> {dataDetailClinic.name} </div>
                                    <div className='edit-view-more-hide' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                    </div>
                                </>
                            }
                            <div className='button-more'>
                                <span onClick={() => this.handleOnclickViewMore(true)}> Xem Thêm </span>
                            </div>
                        </>
                        :
                        <>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>
                                    <div> {dataDetailClinic.name} </div>
                                    <div className='edit-view-more-show' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                </>
                            }
                            <div className='button-more'>
                                <span onClick={() => this.handleOnclickViewMore(false)}> Ẩn bớt </span>
                            </div>
                        </>
                    }
                </div>
                <div className='detail-special-body'>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescripTionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //  dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='content-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='content-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
