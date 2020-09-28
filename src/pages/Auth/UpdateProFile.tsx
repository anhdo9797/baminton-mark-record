import React, { useState } from 'react';
import style from './styles.scss';

import { Input, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
//style Img crop
import 'antd/es/modal/style';
import 'antd/es/slider/style';

import '../../theme.scss';
import ButtonCustom from '@/components/Button';
import Loading from '@/components/Loading/Loading';

const gallery = require('../../assets/icon/gallery.svg');
function getBase64(img: Blob, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
    //check file img
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
const UpdateProFile: React.FC<{}> = () => {
    const [avt, setAvt] = useState('');
    const [useName, setUseName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                setAvt(imageUrl);
                setLoading(false);
            });
        }
        if (info.file.status === 'error') {
            message.error('Upload fail, please try another image!');
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className={style.updateProFile}>
                <h1> Set up your profile </h1>
                <h2> What’s your name? </h2>
                <Input
                    placeholder="Type you name"
                    className={style.inputType}
                    onChange={name => setUseName(name.target.value)}
                />
                <h2> Your avatar? </h2>
                <ImgCrop>
                    <Upload
                        name="avatar"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {avt ? (
                            <img src={avt} className={'ant-upload'} />
                        ) : loading ? (
                            <Loading />
                        ) : (
                            <img src={gallery} />
                        )}
                    </Upload>
                </ImgCrop>

                {avt && useName ? (
                    <ButtonCustom
                        label="Finish"
                        onClick={() => {}}
                        style={{ margin: '60px 0' }}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default UpdateProFile;
