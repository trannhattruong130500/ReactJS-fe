import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {

        return (
            <>
                <div className='home-footer'>
                    <p>&copy; 2022 HoidanIT Channel Youtube.
                        <a target='_blank' href='https://www.facebook.com/profile.php?id=100011283214208'> &rarr; Click here &larr;
                        </a>
                    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
