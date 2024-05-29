import React from 'react';
import KanbanComp from './KanbanComp';

function Kanban(props) {
    return (
      <>
      <KanbanComp activeOwner={props.activeOwner} handleShowModalForAll={props.handleShowModalForAll}/>
      </>
    );
}

export default Kanban;
