import Card from "./Card";
import "../styles/List.css";
import shortid from "shortid";
import CardEditor from "./CardEditor";
import { connect } from "react-redux";
import ListEditor from "./ListEditor";
import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

class List extends Component {
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
    const { editingTitle, addingCard, title } = this.state;
    const { searchInput } = this.props;
    const show = this.props.show;

    return (
      <Draggable draggableId={list._id} index={index} isDragDisabled={!show}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List"
          >
            {editingTitle ? (
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
                      <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        searchInput={searchInput}
                        listId={list._id}
                      />
                    ))}

                  {provided.placeholder}

                  {addingCard ? (
                    <CardEditor
                      onSave={this.addCard}
                      onCancel={this.toggleAddingCard}
                      adding
                    />
                  ) : (
                    <div className="Toggle-Add-Card" onClick={this.toggleAddingCard}>
                      <ion-icon name="add" /> Add a card
                    </div>
                  )}
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

export default connect(mapStateToProps)(List);
