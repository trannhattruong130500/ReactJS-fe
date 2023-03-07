import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { createNewClinic } from '../../../services/userService'
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imnageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {

    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log(`check hoidanit base64:`, base64)
            this.setState({
                imnageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeeds!')
            this.setState({
                name: '',
                address: '',
                imnageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Add new clinic error!')
            console.log(`error code`, res)
        }
    }

    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Quản lý phòng khám</div>
                    <div className='add-new-specialty row'>
                        <div className='form-group col-6'>
                            <label>Tên phòng khám</label>
                            <input className='form-control' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')}
                            ></input>
                        </div>
                        <div className='form-group col-6'>
                            <label>Ảnh phòng khám</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangeImage(event)}
                            ></input>
                        </div>
                        <div className='form-group col-6'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control' value={this.state.address}
                                onChange={(event) => this.handleOnchangeInput(event, 'address')}
                            ></input>
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12 mt-3'>
                            <button className='btn-info btn-save-specialty' onClick={() => this.handleSaveNewClinic()}>Save</button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
