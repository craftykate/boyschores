import React from 'react';
import './NewChoreDetails.css';

const NewChoreDetails = (props) => {
  // If user clicks inside "add chore" input field, show the rest of the necessary input fields to add a new chore
  let details = null;
  if (props.show) {
    details = (
      <React.Fragment>
        <textarea 
          value={props.notes} 
          onChange={(event) => props.notesChange(event)} 
          placeholder="add optional note"
          className="notes" />
        Points: <select 
          value={props.points} 
          onChange={(event) => props.pointsChange(event)}
          className="points">
          <option value='0.25'>1/4</option>
          <option value="0.5">1/2</option>
          <option value="0.75">3/4</option>
          <option value="1">1</option>
          <option value='1.25'>1 1/4</option>
          <option value="1.5">1 1/2</option>
          <option value="1.75">1 3/4</option>
          <option value="2">2</option>
        </select>
        <div className="radio">
          <input
            type="radio"
            name="persistent"
            defaultChecked
            onChange={() => props.persistent(false)} /> Single Chore <br/>
            <input
            type="radio"
            name="persistent"
            onChange={() => props.persistent(true)} /> Multiple allowed
        </div>
        <button 
          onClick={props.postChore}
          disabled={!props.ready}>
          Add Chore
        </button>
        <a onClick={props.cancel}>(cancel)</a>
      </React.Fragment>
    )
  }

  return (
    <div className="addChore">
      <input
        value={props.choreName}
        onClick={props.showDetails}
        onChange={(event) => props.updateChoreName(event)}
        placeholder="Add Chore" 
        className="name"/>
      {details}
    </div>
  )
}

export default NewChoreDetails;
