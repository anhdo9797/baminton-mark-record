import { updateProfile, uploadAvatar } from '@/services/user';
import { Button, Form, Input, Upload } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from '../index.less';

const gallery = require('../../../assets/icon/gallery.svg');

const getBase64 = (img: File, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const UpdateProFile: React.FC<{}> = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState;

    const normFile = e => {
        if (e.file) {
            getBase64(e.file.originFileObj, (imageUrl: string) =>
                setAvatar(imageUrl),
            );
        }
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const onSubmit = async (values: any) => {
        const { name, avatar } = values;
        setLoading(true);
        const photoURL = await uploadAvatar(
            avatar[0].originFileObj,
            currentUser.uid,
        );
        if (photoURL) {
            const result = await updateProfile(name, photoURL);
            setLoading(false);
            if (result.uid) {
                history.push('/');
            }
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.updateProFile}>
                <h2> Set up your profile </h2>
                <Form validateTrigger="onBlur" form={form} onFinish={onSubmit}>
                    <h3> What’s your name? </h3>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input
                            className={styles.inputName}
                            onChange={e => setName(e.target.value)}
                            placeholder="Type you name"
                        />
                    </Form.Item>
                    <h3>Your avatar?</h3>
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Please select your avatar!',
                            },
                        ]}
                    >
                        <Upload
                            name="avatar"
                            className={styles.upload}
                            showUploadList={false}
                        >
                            <img
                                src={avatar || gallery}
                                className={avatar ? styles.active : ''}
                            />
                        </Upload>
                    </Form.Item>
                    <Button
                        style={{
                            visibility: avatar && name ? 'visible' : 'hidden',
                        }}
                        type="primary"
                        block
                        className={styles.finishButton}
                        htmlType="submit"
                        loading={loading}
                    >
                        Finish
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProFile;
