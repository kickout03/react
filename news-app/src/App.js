// ff5b872e799442d695232b57cf0dcbd6

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={20}/>
      </div>
    )
  }
}




