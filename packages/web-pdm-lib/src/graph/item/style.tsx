
export  const initStyle = ({primaryColor}) => {
  const colors = {
   blue: primaryColor,
   white: '#FFFFFF',
   head: 'red',
   black: 'black',
 }

  const style = {
   naviWidth: 370,
   default: {
     node: {
       fill: '#FFFFFF',
       shadowColor: 'rgba(0,0,0,0.1)',
       shadowBlur: 15,
       shadowOffsetX: 8,
       shadowOffsetY: 8,
       radius: 10,
       // stroke: undefined,
       lineWidth: 4 ,
       opacity: 0.8,
       stroke: 'white',
     },
     edge: {
       lineWidth: 2,
       size: 2,
       lineAppendWidth: 4,
       startArrow: {
         path: 'M 24,0 L -24,-12 L 8,0 L -24,12 Z',
         d: 2,
         fill: 'rgba(11,108,149)',
         shadowColor: 'rgba(0,0,0,0.1)',
        //  opacity: 1,
       },
       opacity: 0.2,
       radius: 5,
       labelCfg: {
         autoRotate: true,   // 使文本随边旋转
         style: {
           fontSize: 34,
         },
       },
       stroke: 'rgba(11,108,149)',
     },
   },
   selected: {
     node: {
       stroke: 'rgba(11,108,149)',
     },
   },
   isNoModule : {
     node: {
       opacity: 0.2,
     },
   },
 }

  return {
   colors,
   style,
 }
}
