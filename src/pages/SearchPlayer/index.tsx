import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, Form } from 'antd';

import styles from './style.less';
import Card from '@/components/Card/CardSearch';
import { getPlayers } from '@/services/user';

interface PropsSearch {
    selectUser: any;
    playerOnce: any;
    playerTow: any;
}

const SearchPlayer: React.FC<PropsSearch> = ({
    selectUser,
    playerOnce,
    playerTow,
}) => {
    const [form] = Form.useForm();
    const [listPlayer, setListPlayer] = useState([]);

    useEffect(() => {
        getListPlayer();
    }, []);

    const getListPlayer = async () => {
        const list = await getPlayers();

        setListPlayer(list);
    };

    const onSubmit = async (value: any) => {
        let { name } = value;

        let getSearch = listPlayer.filter(
            (e: any) =>
                e.displayName.toUpperCase().indexOf(name.toUpperCase()) != -1,
        );
        setListPlayer(getSearch);
    };

    //hidden user1 and use 2
    const restPlayer = listPlayer.filter(
        e => e != playerOnce && e != playerTow,
    );

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
                    {restPlayer.map((e: any, i) => (
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
