import React, { Component } from 'react'
import './App.css'
import { fetchCommits } from './api.js'

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
      await fetchCommits(this.state.username)
        .then(response => {
          this.setState({ response })
        })
    } catch(e) {
      console.log(e)
    }
  }
  
  render() {
    let listItems = []
    if (this.state.response) {
      listItems = this.state.response.map((record, i) => {
        return (
          <li key={i}>
            <a href={record.html_url} target="_blank">{record.sha.slice(0, 7)}</a>
            - <span>{record.commit.message}</span><br/>
            by <span><a href={record.author.html_url} target="_blank">{record.commit.author.name}</a></span>
            at <span className="date">{record.commit.author.date}</span>
          </li>
        )
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
