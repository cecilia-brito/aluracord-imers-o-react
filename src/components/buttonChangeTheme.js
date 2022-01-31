import img1 from '../btn.png'
import img1Hover from '../btnHover.png'
import img2 from '../btn2.png'
import img2Hover from '../btn2Hover.png'
import React, { createContext, useContext } from 'react'
// import { context } from '../context'

export const ThemeContext = createContext()
export const ContextTheme = props =>{
  const [Theme, setTheme] = React.useState( { 
    colors: { 
    one: "#242642",
    two: "#424676",
    three: "#161727"
    },
    background: 'https://i.imgur.com/tNAIOA8.png'
  })
  return(<ThemeContext.Provider value={{Theme, setTheme}}>{props.children}</ThemeContext.Provider>)
}

export function ButtonChangeTheme(props){
  const [isHover, setIsHover] = React.useState(false)
  const [img, setImage] = React.useState(img1.src)
  const [imgHover, setImageHover] = React.useState(img1Hover.src)
  const [isClicked, setIsClicked] = React.useState(false)
  const setTheme = useContext(ThemeContext)
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
          onClick = {()=>{
            if(!isClicked){
              setImage(img2.src)
              setImageHover(img2Hover.src)
              setTheme.setTheme({ 
                colors: { 
                one: "#832320",
                two: "#D93F07",
                three: "#A32D29"
                },
                background: 'http://images6.fanpop.com/image/photos/41800000/She-Ra-and-the-Princesses-of-Power-universe-backgrounds-she-ra-and-the-princesses-of-power-netflix-41800578-1280-720.jpg'
              })
              setIsClicked(true)

            } else {
              setImage(img1.src)
              setImageHover(img1Hover.src)
              setTheme.setTheme({ 
                colors: { 
                one: "#242642",
                two: "#424676",
                three: "#161727"
                },
                background: 'https://i.imgur.com/tNAIOA8.png'
              })
              setIsClicked(false)
            }
          }}
        >
          { !isHover ?
          <img src={img}/>
          : <img src={imgHover}/>}
        </button>
        <style jsx>{`
        button{
          cursor: pointer;
          width: 100px;
          height: 60px;
          background: transparent;
          border: none;
          // margin-bottom: 20px;
        }
        img{
          width: 80%;
        }

        // img:hover{
        //   box-shadow: inset 2px 2px yellow;
        // }
        `}</style>
      </>
    )
}

// export {Theme, setTheme}