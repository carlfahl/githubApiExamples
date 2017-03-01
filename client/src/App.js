import React from 'react';
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function () {
    return {
      repos: [],
      commits: []
    }
  },
  componentWillMount: function () {
    this.getReposFromGitHub();
  },
  getReposFromGitHub: function () {
    var self = this;
    $.ajax({
      url: 'https://api.github.com/users/carlfahl/repos',
      method: 'GET'
    }).done(function (data) {
      console.log(data);
      var repos = data.map(function (item) {
        return item.name;
      });
      console.log(repos);
      self.setState({repos: repos});
    });
    $.ajax({
      url: 'https://api.github.com/users/carlfahl/events',
      method: 'GET'
    }).done(function (data) {
      var commits = data.filter(function (item) {
        return item.type === "PushEvent";
      }).map(function (item) {
        return {
          repo: item.repo.name,
          message: item.payload.commits.map(function (item) {
            return item.message;
          })
        }
      });
      console.log(commits);
      self.setState({commits: commits});
    });
  },
  reposList: function () {
    return this.state.repos.map(function (item) {
      return <li key={item}>{item}</li>
    });
  },
  commitsList: function () {
    return this.state.commits.map(function (item) {
      return <li>{item.repo} {item.message}</li>
    })
  },
  render: function () {
    console.log(this.state.repos);
    return (
      <div>
        <h1>List of Repos</h1>
        <ul>
          {this.reposList()}
        </ul>
        <h1>List of Commits</h1>
        <ul>
          {this.commitsList()}
        </ul>
      </div>
    );
  }
});

export default App;
