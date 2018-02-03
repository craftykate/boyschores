import React from 'react';

const CompletedChores = (props) => {
  let jackChores = <tr><td colSpan="2">No completed chores</td></tr>;
  if (props.jack) {
    jackChores = Object.keys(props.jack).map(key => {
      const chore = props.jack[key];
      return (
        <tr key={key}>
          <td>{chore.name}</td>
          <td>{chore.points}</td>
        </tr>
      )
    })
  }
  let nobyChores = <tr><td colSpan="2">No completed chores</td></tr>;
  if (props.noby) {
    nobyChores = Object.keys(props.noby).map(key => {
      const chore = props.noby[key];
      return (
        <tr key={key}>
          <td>{chore.name}</td>
          <td>{chore.points}</td>
        </tr>
      )
    })
  }
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Jack's chores</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {jackChores}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Noby's chores</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {nobyChores}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default CompletedChores;
