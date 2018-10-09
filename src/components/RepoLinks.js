import React, { Component } from 'react'
import PropTypes from 'prop-types';

class RepoLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRepos: []
    }
  }

  render() {
    let repoNames = []
    
    if (this.props.repos.length) {
      repoNames = this.props.repos.map((name, i) => {
        const inputId = `repo-checkbox-${i}`
        return (
          <label htmlFor={inputId}>
            {name}':'
            <input
              type="checkbox"
              id={inputId}
              key={i}
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
