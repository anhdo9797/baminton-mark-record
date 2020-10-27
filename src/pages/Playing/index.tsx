import React, { useCallback, useEffect, useState } from 'react';
import { Row, InputNumber, Button, message, Modal } from 'antd';
import { CardHome } from '@/components/Card/index';

import styles from '../HomePage/styles.less';
import stylesPage from './styles.less';
import { useParams, history } from 'umi';
import { endGame, getPlayersInRoom } from '@/services/game';

interface PropsSet {
    setValueOnce: any;
    setValueTow: any;
    set: number;
    disabled?: boolean;
}

interface set {
    value1: number;
    value2: number;
}

const WrapSet: React.FC<PropsSet> = ({
    setValueOnce,
    setValueTow,
    set,
    disabled,
}) => {
    return (
        <Row justify="space-between" className={stylesPage.setTow}>
            <InputNumber
                className={stylesPage.inputType}
                placeholder="Enter points"
                min={1}
                max={25}
                onChange={setValueOnce}
                disabled={disabled}
            />
            <p className={stylesPage.set}>set {set} </p>
            <InputNumber
                min={1}
                max={25}
                className={stylesPage.inputType}
                placeholder="Enter points"
                onChange={setValueTow}
                disabled={disabled}
            />
        </Row>
    );
};

const MyModal: React.FC<{
    onOk: any;
    visible: boolean;
    onCancel: any;
    avatar: string;
    name: string;
}> = ({ onOk, visible, onCancel, name, avatar }) => (
    <Modal title="End game" visible={visible} onOk={onOk} onCancel={onCancel}>
        <p>WIN NER </p>
        <CardHome avatar={avatar} name={name} />
    </Modal>
);

const Playing: React.FC = () => {
    let { roomId } = useParams();

    const [player1, setPlayer1] = useState<User>();
    const [player2, setPlayer2] = useState<User>();

    const [set1, setSet1] = useState<set>({ value1: 0, value2: 0 });
    const [set2, setSet2] = useState<set>({
        value1: 0,
        value2: 0,
    });
    const [set3, setSet3] = useState<set>({ value1: 0, value2: 0 });
    const [isModal, setIsModal] = useState(false);

    const [play1Win, setPlay1Win] = useState<number>(0);
    const [play2Win, setPlay2Win] = useState<number>(0);

    const initData = async () => {
        const players = await getPlayersInRoom(roomId);

        setPlayer1(players[0]);
        setPlayer2(players[1]);
    };

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        checkWin(set1);
        checkWin(set2);
        checkWin(set3);
        console.log('========');
        console.log(play1Win, play2Win);
    }, [set1, set2, set3]);

    const checkWin = (set: any) => {
        let { value1, value2 } = set;

        value1 - value2 == 2 && value2 >= 20 && setPlay1Win(play1Win + 1);
        value2 - value1 == 2 && value1 >= 20 && setPlay2Win(play2Win + 1);
        value2 == 25 && setPlay2Win(play2Win + 1);
        value1 == 25 && setPlay1Win(play1Win + 1);
    };

    const finishSet = (set: set) => {
        let { value1, value2 } = set;
        if (value1 - value2 == 2 && value2 > 20) {
            return true;
        } else if (value2 - value1 == 2 && value1 > 20) {
            return true;
        } else {
            return value1 == 25 || value2 == 25;
        }
    };

    const complete = async () => {
        await endGame(
            set1,
            set1,
            set3,
            roomId,
            player1?.uid || '',
            player2?.uid || '',
        );

        history.push({
            pathname: `/top-players`,
        });
    };

    return (
        <div className="container">
            <div className={styles.homePage}>
                <h2>Playing</h2>

                <Row justify="space-between">
                    <CardHome
                        avatar={player1?.photoURL || ''}
                        name={player1?.displayName || ''}
                    />

                    <h2>VS</h2>

                    <CardHome
                        avatar={player2?.photoURL || ''}
                        name={player2?.displayName || ''}
                    />
                </Row>

                <WrapSet
                    set={1}
                    setValueOnce={(value1: number) =>
                        setSet1({ ...set1, value1 })
                    }
                    setValueTow={(value2: number) =>
                        setSet1({ ...set1, value2 })
                    }
                    disabled={finishSet(set1)}
                />

                {finishSet(set1) ? (
                    <WrapSet
                        set={2}
                        setValueOnce={(value1: number) =>
                            setSet2({ ...set2, value1 })
                        }
                        setValueTow={(value2: number) =>
                            setSet2({ ...set2, value2 })
                        }
                        disabled={finishSet(set2)}
                    />
                ) : null}

                {finishSet(set2) && play2Win < 2 && play1Win < 2 ? (
                    <WrapSet
                        set={3}
                        setValueOnce={(value1: number) =>
                            setSet3({ ...set3, value1 })
                        }
                        setValueTow={(value2: number) =>
                            setSet3({ ...set3, value2 })
                        }
                        disabled={finishSet(set3)}
                    />
                ) : null}

                <MyModal
                    onCancel={() => setIsModal(false)}
                    onOk={() => setIsModal(false)}
                    visible={isModal}
                    avatar={
                        play1Win > 1
                            ? player1?.photoURL || ''
                            : player2?.photoURL || ''
                    }
                    name={
                        play1Win > 1
                            ? player1?.displayName || ''
                            : player2?.displayName || ''
                    }
                />

                <Button type={'primary'} onClick={complete}>
                    End game
                </Button>
            </div>
        </div>
    );
};

export default Playing;
