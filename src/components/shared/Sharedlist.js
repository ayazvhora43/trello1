import Sharedcard from "../Sharedcard";
import "./Styles/Sharedlist.css";
import shortid from "shortid";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ListEditor from '../ListEditor'

class Sharedlist extends Component {
  state = {
    editingTitle: false,
    title: this.props.list.title,
    addingCard: false
  };

  toggleAddingCard = () =>
    this.setState({ addingCard: !this.state.addingCard });

  addCard = async cardText => {
    const cardId = shortid.generate();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const dateandtime = date + ' ' + time;
    const { listId, dispatch } = this.props;

    this.toggleAddingCard();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId, dateandtime }
    });
  };

  toggleEditingTitle = () =>
    this.setState({ editingTitle: !this.state.editingTitle });

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  }
  editListTitle = async () => {
    const { listId, dispatch } = this.props;
    const { title } = this.state;

    this.toggleEditingTitle();

    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title }
    });
  };

  deleteList = async () => {
    const { listId, list, dispatch } = this.props;

    if (window.confirm("delete this list?")) {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId, cards: list.cards }
      });
    }
  };

  render() {
    const { list, index } = this.props;
    const { title } = this.state;
    const { searchInput } = this.props;

    return (
      <Draggable draggableId={list._id} index={index} isDragDisabled={true}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List"
          >
            {false ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeTitle={this.handleChangeTitle}
                saveList={this.editListTitle}
                onClickOutside={this.editListTitle}
                deleteList={this.deleteList}
              />
            ) : (
              <div className="Wrapper-List">
                <div className="List-Title" onClick={this.toggleEditingTitle}>
                  {list.title}
                </div>

                <div className="List-Time" onClick={this.toggleEditingTitle}>
                  {list.dateandtime}
                </div>
              </div>
            )}

            <Droppable droppableId={list._id}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="Lists-Cards">
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <Sharedcard
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        searchInput={searchInput}
                        listId={list._id}
                      />
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
  show: state.show
});

export default connect(mapStateToProps)(Sharedlist);
