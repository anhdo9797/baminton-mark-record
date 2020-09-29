import React, { useEffect, useState } from 'react';
import { Row, Button, Modal } from 'antd';

import styles from './styles.less';
import { CardEmpty, CardHome } from '@/components/Card/index';
import SearchPlayer from '../SearchPlayer';

interface PropsHome {
    match: any;
}

const HomePage: React.FC<PropsHome> = props => {
    const [playerOnce, setPlayerOnce] = useState();
    const [playerTow, setPlayerTow] = useState();

    const [showModal, setShowModal] = useState(false);
    const [player, setPlayer] = useState(0);

    const selectPlayerOnce = () => {
        setShowModal(true);
        setPlayer(1);
    };

    const selectPlayerTow = () => {
        setShowModal(true);
        setPlayer(2);
    };

    const completeSelect = (e: object) => {
        //check player after set player => show Player
        player == 1 ? setPlayerOnce(e) : setPlayerTow(e);
        setShowModal(false);
    };

    return (
        <div className={'container'}>
            <div className={styles.homePage}>
                <h2>Select players</h2>
                <Row justify="space-between">
                    {playerOnce ? (
                        <CardHome
                            avatar={playerOnce.avatar}
                            name={playerOnce.name}
                        />
                    ) : (
                        <CardEmpty onClick={selectPlayerOnce} />
                    )}

                    <h2 className={styles.vs}>vs</h2>

                    {playerTow ? (
                        <CardHome
                            avatar={playerTow.avatar}
                            name={playerTow.name}
                        />
                    ) : (
                        <CardEmpty onClick={selectPlayerTow} />
                    )}
                </Row>

                <Row justify="space-between"></Row>

                {playerOnce && playerTow ? (
                    <Button type="primary" block>
                        Start Game
                    </Button>
                ) : null}

                <Modal visible={showModal}>
                    <SearchPlayer selectUser={completeSelect} />
                </Modal>
            </div>
        </div>
    );
};

export default HomePage;
