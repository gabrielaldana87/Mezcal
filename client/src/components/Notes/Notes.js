import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllNotes } from '../../actions/note';
import NoteBox from './NoteBox';
import getLabels from '../../actions/labels';
import xmlToJson from './xmlToJSON';
import './Notes.scss';

const isJson = str => {
  try {
    JSON.parse(str);
  } catch(e) {
    return false;
  }
  return true;
};

const parseAsTask = p => {
  return isJson(xmlToJson(p)) ?
    Object.assign(JSON.parse(xmlToJson(p)),{ isComplete: false }) : p;
};

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(getAllNotes());
  }
  ;
  render () {
    const { categories } = this.props;
    const keys = Object.keys(categories);
    return (
      <>
      { keys.map(key => (
        <div className='card-view'>
          <header>{ categories[key].labelDesc.name }</header>
          { categories[key].tasks.map( task => {
            return task.noteText.match(/.*\S.*/) ? (
              <div className='card-content' style={{ backgroundColor: categories[key].labelDesc.color.backgroundColor }}>
                <div className='task-control'>
                  <div className='clearfix-module'>
                    <div className='module-content'>
                      <div className='task-info'>
                        <div className='box-text task-name'><span>{ task.taskName }</span></div>
                        <div className='box-text time'><span>{ task.time }</span></div>
                        <div className='box-text status'><span>{ task.statusName }</span></div>
                      </div>
                      <NoteBox
                        pTags={ task.noteText.split('\n').map(p => parseAsTask(p)) }
                        msgId={ task.msgId }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null})
          }
        </div>
      ))}
      </>
    )
  }
}

const mapStateToProps = state => {
  const notes = state.notes.data;
  return {
    categories: notes
}

};

export default connect(mapStateToProps)(Notes);