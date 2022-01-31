import img1 from '../btn.png'
import img1Hover from '../btnHover.png'
import React from 'react'

console.log(img1)

export default function ButtonChangeTheme(props){
  const [isHover, setIsHover] = React.useState(false)
    return(
      <>
        <button onMouseEnter={
            () => {
              setIsHover(true)
            }
          }
          onMouseLeave={
            () => {
              setIsHover(false)
            }
          }
        >
          { !isHover ?
          <img src={img1.src}/>
          : <img src={img1Hover.src}/>}
        </button>
        <style jsx>{`
        button{
          cursor: pointer;
          width: 100px;
          height: 35px;
          background: transparent;
          border: none;
        }
        img{
          width: 60%;
        }

        // img:hover{
        //   box-shadow: inset 2px 2px yellow;
        // }
        `}</style>
      </>
    )
}
  