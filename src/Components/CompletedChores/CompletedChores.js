import React from 'react';

const CompletedChores = (props) => {
  // Default values
  const noCompleted = <tr><td colSpan="2" style={{fontWeight: "normal"}}>No completed chores</td></tr>;
  let jackChores = noCompleted;
  let nobyChores = noCompleted;
  const noRequired = <tr><td colSpan="2" style={{fontWeight: "normal"}}>No required chores :)</td></tr>;
  let jackRequiredChores = noRequired;
  let nobyRequiredChores = noRequired;
  let jackPoints = 0;
  let nobyPoints = 0;

  // fetch and return chores
  const cycleThroughCompleted = (kid, required) => {
    let kidChores;
    let kidPoints = 0;
    let chores;
    if (kid === 'jack' && required === false) chores = props.jack;
    if (kid === 'noby' && required === false) chores = props.noby;
    if (kid === 'jack' && required === true) chores = props.jackRequired;
    if (kid === 'noby' && required === true) chores = props.nobyRequired;
    if ((kid === 'jack' && chores) || (kid === 'noby' && chores)) {
      kidChores = Object.keys(chores).map(key => {
        const chore = chores[key];
        if (required) {
          const note = chore.notes ? <span className="notes"><br />{chore.notes}</span> : null;
          const initial = kid === 'jack' ? "J" : "N";
          let doneStyle = 'bold';
          let doneButton = <a onClick={() => props.toggleRequiredChore(kid, key)} className={kid} >{initial}</a>
          if (chore.completed) {
            doneStyle = 'normal';
            doneButton = <a onClick={() => props.toggleRequiredChore(kid, key)}>undo</a>
          }
          return (
            <tr key={key}>
              <td style={{ fontWeight: doneStyle }}>{chore.name} <span><a onClick={() => props.deleteRequired(kid, key)}>(x)</a></span> {note}</td>
              <td className="doneColumn">{doneButton}</td>
            </tr>
          )
        } else {
          kidPoints += chore.points
          return (
            <tr key={key}>
              <td>{chore.name} <span><a onClick={() => props.putBack(kid, key, chore)}>put back</a></span></td>
              <td>{chore.points}</td>
            </tr>
          )
        }
        
      })
    }
    if (kid === 'jack') {
      if (!required) jackPoints = kidPoints;
      return kidChores;
    } else if (kid === 'noby') {
      if (!required) nobyPoints = kidPoints;
      return kidChores;
    }
  }

  jackChores = cycleThroughCompleted('jack', false);
  nobyChores = cycleThroughCompleted('noby', false);
  jackRequiredChores = cycleThroughCompleted('jack', true);
  nobyRequiredChores = cycleThroughCompleted('noby', true);

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
