import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', response: null }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(event) {
    this.setState({ username: event.target.value })
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch(`https://api.github.com/users/${this.state.username}/repos`)
        .then(response => response.json())
        .then(response => {
          this.setState({ response })
        })
    } catch(e) {
      alert(e)
    }
  }
  
  render() {
    let listItems = []
    if (this.state.response) {
      listItems = this.state.response.map(repo => {
        return <li key={repo.name}>{repo.name}</li>
      })
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">What did I work on?</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default App
