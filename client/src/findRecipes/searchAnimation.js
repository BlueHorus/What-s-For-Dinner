import Person from '../shared/SVGS/person.js';
import Burger from '../shared/SVGS/burger.js';
import Gyro from '../shared/SVGS/gyro.js';
import Cup from '../shared/SVGS/cup.js';
import React from 'react';
import animejs from 'animejs/lib/anime.es.js';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    var t1 = animejs.timeline({
      easing: 'easeOutExpo',
      duration: 3000,
      loop: true
    })

    t1
    .add({
      targets: '#Burger',
      delay: animejs.stagger(1500),
    keyframes: [
      {translateX: -235, delay: 300, opacity: [0, 1]},
      {translateX: -400, delay: 300, opacity: [1, 0]},
    ],
    duration: 1500,
      easing: 'easeOutExpo',
        loop: true
    })
  .add({
      targets: '#Cup',
      delay: animejs.stagger(1500),
    keyframes: [
      {translateX: -235, delay: 300, opacity: [0, 1]},
      {translateX: -400, delay: 300, opacity: [1, 0]},
    ],
    duration: 1500,
      easing: 'easeOutExpo',
      loop: true
    })
  .add({
      targets: '#gyro',
      delay: animejs.stagger(1500),
    keyframes: [
      {translateX: -235, delay: 300, opacity: [0, 1]},
      {translateX: -400, delay: 300, opacity: [1, 0]},
    ],
    duration: 1500,
      easing: 'easeOutExpo',
        loop: true
    })


  }

  render() {
    return (
      <div style={{width: '400px', height:'400px', position: 'relative', margin:'40px', backgroundColor: 'rgb(230, 230, 230)', borderRadius: '15px'}}>
        <Burger style={ {position: 'absolute', width: '70px', top: '25%', right: '0%', zIndex: '1'}} />
        <Gyro style={ {position: 'absolute', width: '70px', top: '25%', right: '0%', zIndex: '1'}} />
        <Cup style={ {position: 'absolute', width: '70px', top: '25%', right: '0%', zIndex: '1'}} />
        <Person style={ {position: 'absolute', width: '400px', top: '0', zIndex: '0'}} />
      </div>
    )
    }
  }


  export default Search