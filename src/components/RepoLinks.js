import React, { Component } from 'react'
import PropTypes from 'prop-types';

class RepoLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRepos: []
    }
    this.handleCheckboxSelect = this.handleCheckboxSelect.bind(this)
    this.searchForCommits = this.searchForCommits.bind(this)
  }

  handleCheckboxSelect(event) {
    let selectedRepos = this.state.selectedRepos
    if (event.target.checked) {
      selectedRepos = [...selectedRepos, event.target.value]
    } else {
      selectedRepos = selectedRepos.filter(v => v !== event.target.value)
    }
    this.setState({
      selectedRepos
    })
  }
  
  searchForCommits() {
    const reposToSearch = this.state.isAllReposSelected ? this.props.repos : this.state.selectedRepos 
    this.props.onReposSelect(reposToSearch)
  }
  
  render() {
    let repoNames = []
    
    if (this.props.repos.length) {
      repoNames = this.props.repos.map((name, i) => {
        const inputId = `repo-checkbox-${i}`
        return (
          <label htmlFor={inputId} key={i}>
            {name}':'
            <input
              type="checkbox"
              id={inputId}
              value={name}
              onChange={this.handleCheckboxSelect}
            />
          </label>
        )
      })
    }
    
    return (
      <div className="RepoLinks">
        {repoNames}
        <button type="button" onClick={this.searchForCommits}>Search for commits!</button>
      </div>
    );
  }
}

RepoLinks.propTypes = {
  repos: PropTypes.array,
  onReposSelect: PropTypes.func.isRequired,
};

export default RepoLinks
