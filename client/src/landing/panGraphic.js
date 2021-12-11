import React from 'react'
import FryingPan from '../shared/SVGS/fryingPan.js';
import anime from 'animejs/lib/anime.es.js';


class PanGraphic extends React.Component {
  constructor() {
    super()
    this.state = {};
  }

  componentDidMount() {
   anime({
     targets: '.wrp svg',
     opacity: [0, 1],
     duration: 750,
     translateY: ["30%", "0"],
     easing: 'easeOutQuad'
   })

   anime({
    targets: '#tagline',
    opacity: [0, 1],
    duration: 500,
    translateY: ["30%", "0"],
    delay: 700,
    easing: 'easeOutQuad'
  })

  anime({
    targets: '#content-break',
    opacity: [0, 1],
    duration: 1000,
    translateY: ["60%", "0"],
    delay: 1000,
    easing: 'easeOutQuad'
  })
   anime({
      loop: true,
      targets: "#Layer_11",
      opacity: [0, 1],
      duration: 5000,
      direction: "alternate",
      easing: 'easeInOutElastic(1, .3)'
     })

  let greases = document.querySelectorAll('g circle')

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  greases.forEach((el, index) => {
    anime({
      loop: true,
      targets: el,
      opacity: [0, 1, 0],
      duration: getRndInteger(400, 1000),
      translateY: getRndInteger(-30, 30),
      translateX: getRndInteger(-30, 30),
      easing: 'easeInOutSine'
   })
  })

  }

  render() {
    return (
     <div className='wrp'>
       <FryingPan />
       <span id='tagline' >Cookin' Up Some Hot Recipes!</span>
       <span id='content-break'></span>
     </div>
    )
  }
}

export default PanGraphic;