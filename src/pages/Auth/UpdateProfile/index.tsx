import React, { useState } from 'react';
import styles from '../index.less';

import { Input, Upload, message, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
//style Img crop
import 'antd/es/modal/style';
import 'antd/es/slider/style';

import ButtonCustom from '@/components/Button';
import Loading from '@/components/Loading/Loading';

const gallery = require('../../../assets/icon/gallery.svg');
function getBase64(img: Blob, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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
        <div className={styles.container}>
            <div className={styles.updateProFile}>
                <h3> Set up your profile </h3>
                <h2> What’s your name? </h2>
                <Input
                    className={styles.inputName}
                    placeholder="Type you name"
                    onChange={name => setUseName(name.target.value)}
                />
                <h2> Your avatar? </h2>
                <ImgCrop>
                    <Upload
                        name="avatar"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
                    <Button type="primary" block>
                        Finish
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default UpdateProFile;
