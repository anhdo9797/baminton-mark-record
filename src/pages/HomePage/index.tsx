import React from 'react';
import { Row, Tooltip, Button } from 'antd';

import styles from './styles.less';

const emptyUser = require('../../assets/icon/emptyUser.svg');

const HomePage: React.FC<{}> = () => {
    return (
        <div className={'container'}>
            <div className={styles.homePage}>
                <h3>Select players</h3>
                <Row justify="space-between">
                    <Tooltip title="Search for player">
                        <div className={styles.cardUser}>
                            <img src={emptyUser} className={styles.emptyUser} />
                        </div>
                    </Tooltip>

                    <h2 className={styles.vs}>vs</h2>

                    <Tooltip title="Search for player">
                        <div className={styles.cardUser}>
                            <img src={emptyUser} className={styles.emptyUser} />
                        </div>
                    </Tooltip>
                </Row>

                <Button type="primary" block>
                    Start Game
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
