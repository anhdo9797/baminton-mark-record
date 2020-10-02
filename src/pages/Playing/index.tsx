import React, { useCallback, useEffect, useState } from 'react';
import { Row, InputNumber, Button } from 'antd';
import { CardHome } from '@/components/Card/index';

import styles from '../HomePage/styles.less';
import stylesPage from './styles.less';
import { useParams } from 'umi';
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
                max={30}
                onChange={setValueOnce}
                disabled={disabled}
            />
            <p className={stylesPage.set}>set {set} </p>
            <InputNumber
                min={1}
                max={30}
                className={stylesPage.inputType}
                placeholder="Enter points"
                onChange={setValueTow}
                disabled={disabled}
            />
        </Row>
    );
};

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

    const initData = async () => {
        const players = await getPlayersInRoom(roomId);

        setPlayer1(players[0]);
        setPlayer2(players[1]);
    };

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {});

    const endSet = (set: set) => {
        let { value1, value2 } = set;
        if (value1 - value2 == 2 && value2 > 20) {
            return true;
        } else if (value2 - value1 == 2 && value1 > 20) {
            return true;
        } else {
            if (value1 == 30) {
                return true;
            } else if (value2 == 30) {
                return true;
            } else {
                return false;
            }
        }
    };

    const complete = async () => {
        await endGame(set1, set1, set3, roomId);
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
                    disabled={endSet(set1)}
                />

                {endSet(set1) ? (
                    <WrapSet
                        set={2}
                        setValueOnce={(value1: number) =>
                            setSet2({ ...set2, value1 })
                        }
                        setValueTow={(value2: number) =>
                            setSet2({ ...set3, value2 })
                        }
                        disabled={endSet(set2)}
                    />
                ) : null}

                {endSet(set2) ? (
                    <WrapSet
                        set={3}
                        setValueOnce={(value1: number) =>
                            setSet3({ ...set3, value1 })
                        }
                        setValueTow={(value2: number) =>
                            setSet3({ ...set1, value2 })
                        }
                        disabled={endSet(set3)}
                    />
                ) : null}

                <Button type={'primary'} onClick={complete}>
                    End game
                </Button>
            </div>
        </div>
    );
};

export default Playing;
