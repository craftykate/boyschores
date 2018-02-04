import React from 'react';

const ChoreList = (props) => {
  let chores;
  if (props.chores === false) {
    chores = <tr><td>loading chores...</td></tr>;
  } else if (props.chores === null) {
    chores = <tr><td>No chores yet!</td></tr>;
  }
  if (props.chores) {
    chores = Object.keys(props.chores).map(key => {
      const chore = props.chores[key];
      let mult = chore.persistent ? <span>(multiple)</span> : null;
      return (
        <tr key={key}>
          <td>{chore.name} {mult}</td>
          <td className="narrow points">{chore.points}</td>
          <td className="narrow">
            <a onClick={() => props.completeChore('jack', key)} className="jack" >J</a>
            <a onClick={() => props.completeChore('noby', key)} className="noby" >N</a>
          </td>
        </tr>
      )
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Available Chores:</th>
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
