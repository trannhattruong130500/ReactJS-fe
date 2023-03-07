import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailDoctoById, getAllCodeServer } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            showDetailSpecialty: false
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailDoctoById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeServer('PROVINCE')

            if (res && res.errCode === 0 && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailDoctoById({
                id: id,
                location: location
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    handleOnclickViewMore = (status) => {
        this.setState({
            showDetailSpecialty: status
        })
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, showDetailSpecialty } = this.state;
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
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div className='edit-view-more-hide' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                            <div className='button-more'>
                                <span onClick={() => this.handleOnclickViewMore(true)}> Xem Thêm </span>
                            </div>
                        </>
                        :
                        <>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div className='edit-view-more-show' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                            <div className='button-more'>
                                <span onClick={() => this.handleOnclickViewMore(false)}> Ẩn bớt </span>
                            </div>
                        </>
                    }
                </div>
                <div className='detail-special-body'>
                    <select className='select-province-doctor' onChange={(event) => this.handleOnChangeSelect(event)}>
                        {listProvince && listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })
                        }
                    </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
