import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { history, useLocation } from 'umi';
import { Input, Button } from 'antd';

import styles from './style.less';
import Card from '@/components/Card/CardSearch';
import { searchData } from '@/mock/dataSearch';

interface PropsSearch {
    selectUser: any;
}

const SearchPlayer: React.FC<PropsSearch> = ({ selectUser }) => {
    return (
        <div className="container">
            <div className={styles.searchPlayer}>
                <h2>Search</h2>
                <Input
                    prefix={
                        <Button
                            icon={<SearchOutlined />}
                            type="text"
                            className={styles.buttonSearch}
                        />
                    }
                    placeholder="Type a name, e.g. John"
                />
                <div className={styles.listUser}>
                    {searchData.map((e, i) => (
                        <Card
                            name={e.name}
                            avatar={e.avatar}
                            active={e.active}
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
