import React from 'react'
import { Button } from 'antd'
import style from './styles.scss'

interface PopsButton {
  label: string;
  onClick(): any
}


const ButtonCustom: React.FC<PopsButton> = ({ label, onClick }) => {

  return (
    <Button className={style.myButton}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}



export default ButtonCustom
