import React from 'react'
import ReactDOM from 'react-dom'

import '~/styles/index.scss'

const App = () => {
  return <div className="main__box">Hello World</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
