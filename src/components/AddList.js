import shortid from "shortid";
import "../styles/AddList.css";
import ListEditor from "./ListEditor";
import { connect } from "react-redux";
import EditButtons from "./EditButtons";
import React, { Component } from "react";

class AddList extends Component {
  state = {
    title: "",
    time: null
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  };

  createList = async () => {

    const { title } = this.state;
    const { dispatch } = this.props;
    const { username } = this.props;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const dateandtime = date + ' ' + time;

    this.props.toggleAddingList();

    if (title) {
      dispatch({
        type: "ADD_LIST",
        payload: { listId: shortid.generate(), listTitle: title, dateandtime: dateandtime, username: username.username }
      });
    } else {
      alert("list title can't be empty!")
    }
  };

  render() {
    const { toggleAddingList } = this.props;
    const { title } = this.state;

    return (
      <div className="Add-List-Editor">
        <ListEditor
          title={title}
          handleChangeTitle={this.handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={this.createList}
        />

        <EditButtons
          handleSave={this.createList}
          saveLabel={"Add List"}
          handleCancel={toggleAddingList}
        />
      </div>
    );
  }
}

export default connect()(AddList);
