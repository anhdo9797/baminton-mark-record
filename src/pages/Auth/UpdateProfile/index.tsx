import React, { useState } from 'react';
import styles from '../index.less';

import { Input, Upload, message, Button } from 'antd';

import Loading from '@/components/Loading/Loading';

const gallery = require('../../../assets/icon/gallery.svg');

function getBase64(img: Blob, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const UpdateProFile: React.FC<{}> = () => {
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                setAvatar(imageUrl);
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
                <h2> Set up your profile </h2>
                <h3> What’s your name? </h3>
                <Input
                    className={styles.inputName}
                    placeholder="Type you name"
                    onChange={name => setName(name.target.value)}
                />
                <h3> Your avatar? </h3>
                <Upload
                    name="avatar"
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={handleChange}
                >
                    {avatar ? (
                        <img src={avatar} className={'ant-upload'} />
                    ) : loading ? (
                        <Loading />
                    ) : (
                        <img src={gallery} />
                    )}
                </Upload>
                {avatar && name ? (
                    <Button
                        type="primary"
                        block
                        className={styles.finishButton}
                    >
                        Finish
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default UpdateProFile;
