import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService'
import { withRouter } from "react-router";
import OutStandingDoctor from './OutStandingDoctor';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecailty = (item) => {
        if (this.props.history) {
            this.props.history.push(`detail-specialty/${item.id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state

        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="homepage.specialty" /></span>
                            <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='section-customize' key={index}
                                                onClick={() => this.handleViewDetailSpecailty(item)}
                                            >
                                                <div className='bg-image section-specialty' style={{ backgroundImage: `url(${item.image})` }}></div>
                                                <div className='text-image'>{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
