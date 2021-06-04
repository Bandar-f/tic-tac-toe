import React, { useState } from 'react'
import style from './Box.module.css'

const Box = ({value,center,computerAI,updateBoard,indexrow,indexcol}) => {


   const chooseFromBoard= ()=>{

    updateBoard(indexrow,indexcol,value);
      

   }    

  return (
    <div onClick={chooseFromBoard} className={style.boxcs}>
      {value}
    </div>
  )
}

export default Box
