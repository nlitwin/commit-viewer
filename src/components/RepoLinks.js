import React, { Component } from 'react'
import PropTypes from 'prop-types';

class RepoLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRepos: new Set()
    }
    this.handleCheckboxSelect = this.handleCheckboxSelect.bind(this)
    this.searchForCommits = this.searchForCommits.bind(this)
  }

  handleCheckboxSelect(event) {
    let selectedRepos = new Set(this.state.selectedRepos)
    if (event.target.checked) {
      selectedRepos.add(event.target.value)
    } else {
      selectedRepos.delete(event.target.value)
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
      // TODO: Use just repo name, or does the username need to be the 1st part of full_name?
      repoNames = this.props.repos.map((name, i) => {
        const inputId = `repo-checkbox-${i}`
        // TODO: Move to <RepoLink>
        return (
          <label htmlFor={inputId} key={i}>
            {name}:
            <input
              type="checkbox"
              id={inputId}
              value={name}
              checked={this.state.selectedRepos.has(name)}
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
