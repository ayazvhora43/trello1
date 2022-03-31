import "../styles/CardEditor.css";
import EditButtons from "./EditButtons";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";

class CardEditor extends Component {
  state = {
    text: this.props.text || ""
  };

  handleChangeText = event => this.setState({ text: event.target.value });

  onEnter = e => {
    const { text } = this.state;
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
    }
  };

  render() {
    const { text } = this.state;
    const { onSave, onCancel, onDelete, adding } = this.props;

    return (
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            value={text}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
          />
        </div>
        <EditButtons
          handleSave={() => {
            if (text) {
              onSave(text)
            } else {
              alert("card title can't be empty")
            }
          }}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    );
  }
}

export default CardEditor;
