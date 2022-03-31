import "../styles/Card.css";
import Comments from "./Comments";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import CardEditor from "./CardEditor";
import { Form } from 'react-bootstrap';
import Description from "./Description";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Draggable } from "react-beautiful-dnd";
import CommentIcon from '@mui/icons-material/Comment';
import DescriptionIcon from '@mui/icons-material/Description';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';

class Card extends Component {
  state = {
    hover: false,
    editing: false,
    value: 0,
    show: false,
    toggle: false,
    modalinput: ''
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  handleClose = () => {
    const { dispatch } = this.props;
    this.setState({ show: false });
    dispatch({
      type: "SHOW",
      payload: { show: this.state.show }
    });
  }

  handleShow = () => {
    const { dispatch } = this.props;
    this.setState({ show: true });
    dispatch({
      type: "SHOW",
      payload: { show: this.state.show }
    });
  }

  endEditing = () => this.setState({ hover: false, editing: false });

  startEditing = () =>
    this.setState({
      hover: false,
      editing: true,
      text: this.props.card.text
    });

  handleModelInput = (e) => {
    this.setState({ modalinput: e.target.value })
  }

  handleModalInput = () => {
    const { card, dispatch } = this.props;

    if (this.state.modalinput) {
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: { cardId: card._id, cardText: this.state.modalinput }
      });
      this.setState({ show: false })
    } else {
      alert("card title can't be empty !")
    }
  }

  editCard = async text => {
    const { card, dispatch } = this.props;
    this.endEditing();
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text }
    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;
    if (window.confirm("delete this card?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
    }
  };

  render() {
    const { card, index } = this.props;
    const { editing } = this.state;
    const { searchInput } = this.props;
    const { show } = this.state;

    if (!editing) {

      if ((card.text.toLowerCase()).includes(searchInput.toLowerCase())) {
        return (
          <>
            <Draggable draggableId={card._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="Card"
                  onMouseEnter={this.startHover}
                  onMouseLeave={this.endHover}
                >
                  {(
                    <div className="Card-Icons">
                      <div className="Card-Icon" onClick={this.startEditing}>
                        <EditIcon name="create" fontSize="small" />
                      </div>
                      <div className="Card-Icon Card-Icon1" onClick={this.handleShow}>
                        <CommentIcon name="create" fontSize="small" />
                      </div>
                    </div>
                  )}
                  <Box sx={{width: '65%'}}>
                    {card.text}
                  </Box>
                </div>
              )}
            </Draggable>

            <Modal
              size="lg"
              show={show}
              onHide={this.handleClose}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <CreditCardRoundedIcon
                      style={{
                        display: 'inline',
                        marginTop: '5px',
                        color: '#172B4d'
                      }} />
                    <Form.Control
                      type="text"
                      defaultValue={card.text}
                      onChange={this.handleModelInput}
                      style={{
                        width: '630px',
                        margin: '0 10px',
                        fontWeight: 'bold',
                        color: '#172B4D'
                      }} />
                    <Box>
                      <Button onClick={this.handleModalInput}> save</Button>
                    </Box>
                  </Box>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '0' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: "10px" }}>
                  <DescriptionIcon style={{ display: 'inline', color: '#172B4d' }} />
                  <Typography style={{
                    display: 'inline',
                    padding: '0 20px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: "#172B4D",
                  }}>
                    Description
                  </Typography>
                </Box>
                <Description cardId={card._id} />
              </Modal.Body>
              <Comments cardId={card._id} />
            </Modal>
          </>
        )
      }
      else if (searchInput === '') {

        return (
          <>
            <Draggable draggableId={card._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="Card"
                  onMouseEnter={this.startHover}
                  onMouseLeave={this.endHover}
                >
                  {(
                    <div className="Card-Icons">
                      <div className="Card-Icon" onClick={this.startEditing}>
                        <EditIcon name="create" fontSize="small" />
                      </div>
                      <div className="Card-Icon Card-Icon1" onClick={this.handleShow}>
                        <CommentIcon name="create" fontSize="small" />
                      </div>
                    </div>
                  )}
                  {card.text}
                </div>
              )}
            </Draggable>
            <Modal
              size="lg"
              show={show}
              onHide={this.handleClose}
              className='modalEvent'
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <CreditCardRoundedIcon
                      style={{
                        display: 'inline',
                        marginTop: '5px',
                        color: '#172B4d'
                      }} />
                    <Form.Control
                      type="text"
                      defaultValue={card.text}
                      onChange={this.handleModelInput}
                      style={{
                        width: '630px',
                        margin: '0 10px',
                        fontWeight: 'bold',
                        color: '#172B4D'
                      }} />
                    <Box>
                      <Button onClick={this.handleModalInput}> save</Button>
                    </Box>
                  </Box>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '0' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: "10px" }}>
                  <DescriptionIcon style={{ display: 'inline', color: '#172B4d' }} />
                  <Typography style={{
                    display: 'inline',
                    padding: '0 20px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: "#172B4D",
                  }}>
                    Description
                  </Typography>
                </Box>
                <Description cardId={card._id} />
              </Modal.Body>
              <Comments cardId={card._id} />
            </Modal>
          </>
        )
      }
      else {
        return null;
      }

    } else {
      return (
        <CardEditor
          text={card.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
