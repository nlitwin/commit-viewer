import React, { Component } from 'react'
import './App.css'
import { DateRangePicker } from 'react-dates'
import RepoLinks from './components/RepoLinks.js'
import { fetchCommits, fetchRepositories } from './api.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      repos: [],
      records: [],
      startDate: null,
      endDate: null,
      focusedInput: null
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    this.handleReposSelect = this.handleReposSelect.bind(this)
  }
  
  handleUsernameChange(event) {
    this.setState({ username: event.target.value })
  }

  handleReposSelect(selectedRepos) {
    this.setState({ records: [] })
    
    selectedRepos.forEach(repoName => {
      fetchCommits(this.state.username, repoName, {
        since: this.state.startDate.format(),
        until: this.state.endDate.format()
      })
        .then(records => {
          this.setState({
            records: this.state.records.concat(records)
          })
        })
    })
  }
  
  async handleUsernameSubmit() {
    try {
      const repos = await fetchRepositories(this.state.username)
      this.setState({ repos })
    } catch(e) {
      console.log(e)
    }
  }
  
  render() {
    let listItems = []
    if (this.state.records.length) {
      listItems = this.state.records.map((record, i) => {
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
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          isOutsideRange={() => false}
        />
        <header className="App-header">
          <h1 className="App-title">What did I work on?</h1>
        </header>
        <input type="text" name="username" placeholder="Github username" value={this.state.value} onChange={this.handleUsernameChange} />
        <button type="button" onClick={this.handleUsernameSubmit}>Get repos!</button>

        <RepoLinks repos={this.state.repos.map(({ name }) => name)} onReposSelect={this.handleReposSelect} />
        {listItems}
      </div>
    );
  }
}

export default App
