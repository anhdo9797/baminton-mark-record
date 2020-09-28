import React from 'react';
import style from './styles.scss';

import { Input, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const UpdateProFile: React.FC<{}> = () => {
    function getBase64(img: string, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handlePreview = (info: any) => {
        console.log('info', info);

        if (info.file.status === 'uploading') {
            // this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) =>
                // this.setState({
                //     imageUrl,
                //     loading: false,
                // }),
                {
                    console.log('====================================');
                    console.log(imageUrl);
                    console.log('====================================');
                },
            );
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
                />

                <h2> Your avatar? </h2>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                >
                    {/* {fileList.length >= 8 ? null : uploadButton} */}
                    {/* uploadButton */}
                    <img
                        src={require('../../assets/icon/gallery.svg')}
                        className={style.gallery}
                    />
                </Upload>
            </div>
        </div>
    );
};

export default UpdateProFile;
