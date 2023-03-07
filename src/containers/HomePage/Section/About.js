import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <>
                <div className='section-share section-about'>
                    <div className='section-about-header'>
                        Truyền thông nói gì về ngành CÔNG NGHỆ THÔNG TIN
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe
                                width="570px"
                                height="320px"
                                src="https://www.youtube.com/embed/aHYzqqmooCI"
                                title="Tìm hiểu NGÀNH CÔNG NGHỆ THÔNG TIN - IT - là gì ?"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='content-rigth'>
                            <p>Hiểu một cách đơn giản, Công nghệ thông tin là ngành sử dụng máy tính và phần mềm máy tính để chuyển đổi,
                            lưu trữ, bảo vệ, xử lý, truyền và thu thập thông tin. Người làm việc trong trong ngành này thường được gọi
                            là IT (Information Technology).  Mục đích của khối khoa học tổng hợp liên ngành này là nhằm phát triển khả năng
                            sửa chữa, tạo mới và sử dụng hệ thống các thiết bị và máy tính bao gồm phần cứng, phần mềm để cung cấp giải
                            pháp xử lý thông tin trên nền công nghệ cá nhân, tổ chức có yêu cầu.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
