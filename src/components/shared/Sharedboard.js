import Sharedlist from "./Sharedlist";
import "./Styles/Sharedboard.css";
import { connect } from "react-redux";
import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class Sharedboard extends Component {
  state = {
    addingList: false
  };

  toggleAddingList = () =>
    this.setState({ addingList: !this.state.addingList });

  handleDragEnd = ({ source, destination, type }) => {

    if (!destination) return;

    const { dispatch } = this.props;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index
          }
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        }
      });
    }
  };

  render() {
    const { searchInput } = this.props;
    const username = this.props;
    const board = this.props;
    const state = this.props;
    const arr = [];
    const sharedemail = this.props;

    for (const [key, value] of Object.entries(state.state.listsById)) {
      const [data] = value.username
      const data1 = data.state
      
      if (sharedemail.sharedemail === data1.email) {
        arr.push(key)
      }
    }

    return (
      <>
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
              {(provided, _snapshot) => (
                <div className="Board" ref={provided.innerRef}>
                  {board.board.lists.map((listId, index) => {
                    if (arr.includes(listId)) {
                      return <Sharedlist listId={listId} key={listId} index={index} searchInput={searchInput} username={username} />;
                    }
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
        );
  }
}

const mapStateToProps = state => ({
          board: state.board,
        users: state.users,
        state: state,
        isauth: state.isauth
});

export default connect(mapStateToProps)(Sharedboard);
