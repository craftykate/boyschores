import React from 'react';

const CompletedChores = (props) => {
  // Default text for no completed chores
  const noCompleted = <tr><td colSpan="2" style={{fontWeight: "normal"}}>No completed chores</td></tr>;
  let jackPoints = 0;
  let nobyPoints = 0;

  // Cycle through Jack's completed chores
  let jackChores = noCompleted;
  if (props.jack) {
    jackChores = Object.keys(props.jack).map(key => {
      const chore = props.jack[key];
      jackPoints += chore.points;
      return (
        <tr key={key}>
          <td>{chore.name} <span><a onClick={() => props.putBack('jack', key, chore)}>put back</a></span></td>
          <td>{chore.points}</td>
        </tr>
      )
    })
  }
  
  // Cycle through Noby's completed chores
  let nobyChores = noCompleted;  
  if (props.noby) {
    nobyChores = Object.keys(props.noby).map(key => {
      const chore = props.noby[key];
      nobyPoints += chore.points;
      return (
        <tr key={key}>
          <td>{chore.name} <span><a onClick={() => props.putBack('noby', key, chore)}>put back</a></span></td>
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
          <tr className="totalRow">
            <td>total:</td>
            <td>{jackPoints}</td>
          </tr>
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
          <tr className="totalRow">
            <td>total:</td>
            <td>{nobyPoints}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default CompletedChores;
