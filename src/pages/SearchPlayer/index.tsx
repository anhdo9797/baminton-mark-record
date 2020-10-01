import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { history, useLocation } from 'umi';
import { Input, Button, Form } from 'antd';

import styles from './style.less';
import Card from '@/components/Card/CardSearch';
import { searchData } from '@/mock/dataSearch';
import { getPlayer, searchPlayer } from '@/services/game';

interface PropsSearch {
    selectUser: any;
}

const SearchPlayer: React.FC<PropsSearch> = ({ selectUser }) => {
    const [form] = Form.useForm();
    const [listPlayer, setListPlayer] = useState([]);

    useEffect(() => {
        getListPlayer();
    }, []);

    const getListPlayer = async () => {
        const list = await getPlayer();
        setListPlayer(list);
    };

    const onSubmit = async (value: any) => {
        let { name } = value;

        let getSearch = listPlayer.find(
            (e: any) =>
                e.displayName.toUpperCase().indexOf(name.toUpperCase()) != -1,
        );
        setListPlayer(getSearch);
    };

    return (
        <div className="container">
            <div className={styles.searchPlayer}>
                <h2>Search</h2>
                <Form form={form} onFinish={onSubmit}>
                    <Form.Item name={'name'}>
                        <Input
                            prefix={
                                <Button
                                    icon={<SearchOutlined />}
                                    type="text"
                                    htmlType="submit"
                                    className={styles.buttonSearch}
                                />
                            }
                            placeholder="Type a name, e.g. John"
                        />
                    </Form.Item>
                </Form>

                <div className={styles.listUser}>
                    {listPlayer.map((e: any, i) => (
                        <Card
                            name={e.displayName}
                            avatar={e.photoURL}
                            active={'Active 5 mins ago'}
                            key={i}
                            onClick={() => selectUser(e)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPlayer;
