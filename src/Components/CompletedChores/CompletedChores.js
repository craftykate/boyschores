import React from 'react';

const CompletedChores = (props) => {
  // Default values
  const noCompleted = <tr><td colSpan="2" style={{fontWeight: "normal"}}>No completed chores</td></tr>;
  const noRequired = <tr><td colSpan="2" style={{fontWeight: "normal"}}>No required chores :)</td></tr>;
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

  // Cycle through Jack's required chores
  let jackRequiredChores = noRequired;
  if (props.jackRequired) {
    jackRequiredChores = Object.keys(props.jackRequired).map(key => {
      const chore = props.jackRequired[key];
      const note = chore.notes ? <span className="notes"><br />{chore.notes}</span> : null;
      let doneStyle = 'bold';
      let doneButton = <a onClick={() => props.toggleRequiredChore('jack', key)} className="jack" >J</a>
      if (chore.completed) {
        doneStyle = 'normal';
        doneButton = <a onClick={() => props.toggleRequiredChore('jack', key)}>undo</a>
      }
      return (
        <tr key={key}>
          <td style={{ fontWeight: doneStyle }}>{chore.name} <span><a onClick={() => props.deleteRequired('jack', key)}>(x)</a></span> {note}</td>
          <td className="doneColumn">{doneButton}</td>
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

  // Cycle through Noby's required chores
  let nobyRequiredChores = noRequired;
  if (props.nobyRequired) {
    nobyRequiredChores = Object.keys(props.nobyRequired).map(key => {
      const chore = props.nobyRequired[key];
      const note = chore.notes ? <span className="notes"><br />{chore.notes}</span> : null;
      let doneStyle = 'bold';
      let doneButton = <a onClick={() => props.toggleRequiredChore('noby', key)} className="noby" >N</a>
      if (chore.completed) {
        doneStyle = 'normal';
        doneButton = <a onClick={() => props.toggleRequiredChore('noby', key)}>undo</a>
      }
      return (
        <tr key={key}>
          <td style={{ fontWeight: doneStyle }}>{chore.name} <span><a onClick={() => props.deleteRequired('noby', key)}>(x)</a></span> {note}</td>
          <td className="doneColumn">{doneButton}</td>
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
            <th>Points / <span role="img" aria-label="Done">✅</span></th>
          </tr>
        </thead>
        <tbody>
          {jackRequiredChores}
          {jackChores}
          <tr className="totalRow">
            <td><span><a onClick={() => props.clearCompleted('jack')}>(clear completed)</a></span> total:</td>
            <td>{jackPoints}</td>
          </tr>
        </tbody>
      </table>
      
      <table>
        <thead>
          <tr>
            <th>Noby's chores</th>
            <th>Points / <span role="img" aria-label="Done">✅</span></th>
          </tr>
        </thead>
        <tbody>
          {nobyRequiredChores}
          {nobyChores}
          <tr className="totalRow">
            <td><span><a onClick={() => props.clearCompleted('noby')}>(clear completed)</a></span> total:</td>
            <td>{nobyPoints}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default CompletedChores;
