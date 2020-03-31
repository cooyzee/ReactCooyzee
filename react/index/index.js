import React, { Component, Fragment } from 'react'
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'
import './index.scss'
import { UserInfoContext } from '../context/UserInfoContext'
import Modal from '../../com/components/Modal'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModal: false
    }
    this.scrollSpy = this.scrollSpy.bind(this)
    this.emitChangeDebounced = debounce(e => {
      console.log(e)
    }, 250)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount () {

  }

  // said to be the one that we can't imagine
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  // use for params click bindings
  handleClick(id) {
    return e => {
      console.log(e, id)
    }
  }

  scrollSpy(e) {
    this.emitChangeDebounced(e.target.scrollTop)
  }

  toggleModal() {
    this.setState(prev => ({
      isModal: !prev.isModal
    }))
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel()
  }

  render() {
    return (
      <div className="index-m">
        {true && <UseFragment />}
        <h3>Portal</h3>
        <button onClick={this.toggleModal}>open modal</button>
        {this.state.isModal && (
          <Modal>
            <h1 onClick={this.toggleModal}>Hello</h1>
          </Modal>
        )}
        <p>
          <button onClick={this.handleClick(12)}>Click me</button>
        </p>
        <h3><Link to="/test">To test page</Link></h3>
        <h3>Debounce scroll</h3>
        <div className="scroll-wrap" onScroll={this.scrollSpy}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(x => <div key={x}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur culpa exercitationem maxime nemo obcaecati, quae? Aut corporis dignissimos exercitationem magni nobis quidem quod saepe similique tempora ut? Expedita, nam!</div>)}
        </div>
        <h3>Context</h3>
        <p>Context provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
        <p>Such as the current authenticated user, theme, or preferred language.</p>
        <p className="red">Note: passing undefined as a provider value does not cause Consumers to use defaultValue</p>
        <h3>High-order component</h3>
        <p>
          It takes a component and return a component
        </p>
      </div>
    )
  }
}

// A common pattern in React is for a component to return multiple element.
// Key is the only attribute that can be passed to Fragment.
const UseFragment = () => (
  <Fragment>
    <h3>Creating a Toolchain from Scratch</h3>
    <ul>
      <li>A package manager</li>
      <li>A bundler</li>
      <li>A compiler</li>
    </ul>
    <UserInfoContext.Consumer>
      {userInfo => <p>{userInfo.name}</p>}
    </UserInfoContext.Consumer>
    <h3>All react components must act like pure functions with respect to their props.</h3>
  </Fragment>
)