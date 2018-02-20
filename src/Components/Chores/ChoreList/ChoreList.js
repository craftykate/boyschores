import React from 'react';

const ChoreList = (props) => {
  let chores;

  // If chores is false it hasn't searched for chores on the db yet, so display loading
  // If it's null, it has searched and there aren't chores so display no chores yet
  if (props.error) {
    chores = <tr><td colSpan="3">Error loading chores! Please refresh or try again later</td></tr>;
  } else {
    if (props.chores === false) {
      chores = <tr><td colSpan="3">loading chores...</td></tr>;
    } else if (props.chores === null) {
      chores = <tr><td colSpan="3">No chores yet!</td></tr>;
    }
  }

  // If chores have been sent, cycle through them and display a table row for each one
  if (props.chores) {
    // Go through the points of each chore and store a sorted array of each object's key in an array
    const sortedChoreKeys = Object.keys(props.chores).sort(function (a, b) { return props.chores[a].points - props.chores[b].points })
    // Go through each sorted key in order and spit out the relevant object info associated with that key
    chores = sortedChoreKeys.map(key => {
      const chore = props.chores[key];
      const mult = chore.persistent ? <span>(multiple)</span> : null;
      const delTag = <span><a onClick={() => props.deleteChore(key)}>(x)</a></span>;
      const note = chore.notes ? <span className="notes"><br />{chore.notes}</span> : null;
      return (
        <tr key={key}>
          <td>{chore.name} {mult} {delTag} {note}</td>
          <td className="narrow points">{chore.points}</td>
          <td className="narrow doneColumn">
            <a onClick={() => props.completeChore('jack', key)} className="jack" >J</a>
            <a onClick={() => props.completeChore('noby', key)} className="noby" >N</a>
          </td>
        </tr>
      )
    })
  }
  
  return (
    <table className="choreList">
      <thead>
        <tr>
          <th className="choreList">Available Chores:</th>
          <th>Points</th>
          <th><span role="img" aria-label="Done">✅</span></th>
        </tr>
      </thead>
      <tbody>
        {chores}
      </tbody>
    </table>
  )
}

export default ChoreList;
