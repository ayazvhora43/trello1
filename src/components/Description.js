import React from 'react'
import { useState } from "react";
import "../styles/Description.css";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import TextareaAutosize from "react-textarea-autosize";
import moment from 'moment';

const Description = (props) => {

    const [toggle, setToggle] = useState(false);
    const [description, setDescription] = useState("Add Description here...");
    const Id = props.cardId;
    const cardsById = props.cardsById;
    const desc = [];
    const dateandtime = [];

    for (let card in cardsById) {
        if (cardsById[card]._id === Id) {
            dateandtime.push(cardsById[card].dateandtime)
            desc.push(cardsById[card].description)
        }
    };

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSaveDescription = () => {
        setToggle(false)

        let dispatch = props.dispatch;

        dispatch({
            type: "ADD_DESCRIPTION",
            payload: { cardId: Id, description: description }
        });
    }

    if (!toggle) {
        return (
            <div className='box_container'>
                <Box
                    onClick={() => { setToggle(true) }}
                    className='some_text'
                >
                    {desc[0]}
                </Box>
                <Box
                    className='some_text'
                >   
                    This card was added on: 
                    <br />
                    
                    {moment(dateandtime[0]).fromNow(true)} 
                    {' '} ago...
                </Box>
            </div>
        )
    } else {
        return (
            <Box style={{ margin: '20px' }}>
                <TextareaAutosize
                    autoFocus
                    defaultValue={desc[0]}
                    onChange={handleDescription}
                    minRows={3}
                    style={{
                        width: "500px",
                        margin: '10px 5px'
                    }} />
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Button onClick={handleSaveDescription} style={{ margin: '0 0 0 5px' }}> save</Button>
                    <ion-icon
                        onClick={() => { setToggle(false) }}
                        name="close"
                        style={{
                            fontSize: '30px',
                            marginLeft: '10px'
                        }} />
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = state => ({ cardsById: state.cardsById });

export default connect(mapStateToProps)(Description)
