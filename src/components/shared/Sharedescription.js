import React from 'react'
import { useState } from "react";
import './Styles/Sharedescription.css';
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import moment from 'moment';

const Sharedescription = (props) => {

    const [toggle, setToggle] = useState(false);
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
}

const mapStateToProps = state => ({ cardsById: state.cardsById });

export default connect(mapStateToProps)(Sharedescription)
