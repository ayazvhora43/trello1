import { combineReducers, createStore } from "redux";
import throttle from "lodash.throttle";

const board = (state = { lists: [] }, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { listId } = action.payload;
      return { lists: [...state.lists, listId] };
    }
    case "MOVE_LIST": {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { lists: newLists };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const filterDeleted = tmpListId => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    default:
      return state;
  }
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { listId, listTitle, dateandtime, username } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, dateandtime: dateandtime, username: username, cards: [] }
      };
    }
    case "CHANGE_LIST_TITLE": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle }
      };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case "ADD_CARD": {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
      };
    }
    case "MOVE_CARD": {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId
      } = action.payload;

      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards }
        };
      }

      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards }
      };
    }

    case "DELETE_CARD": {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = cardId => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted)
        }
      };
    }
    default:
      return state;
  }
};

const cardsById = (state = {}, action) => {
  switch (action.type) {

    case "ADD_CARD": {
      const { cardText, cardId, dateandtime } = action.payload;
      return { ...state, [cardId]: { text: cardText, _id: cardId, dateandtime: dateandtime } };
    }

    case "CHANGE_CARD_TEXT": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }

    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }

    case "DELETE_LIST": {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }

    case "ADD_DESCRIPTION": {
      const { cardId, description } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], description: description } }
    }

    default:
      return state;
  }
};

const users = (state = { users: [] }, action) => {

  switch (action.type) {
    case "ADD_NEW_USER": {
      const { formdata } = action.payload;
      return {
        users: [...state.users, formdata]
      }
    }

    case "ADD_BOARD_NAME" :{
      const {boardname, username} = action.payload;
      let obj1 = {}
      let index1 = 0
      state.users.filter((obj, index) => {
        if(obj.name === username[0]){
          obj1 = obj;
          index1 = index
        }
      })
      obj1.boardname = boardname
      state.users[index1] = obj1
    }

    default:
      return state;
  }
};

const isauth = (state = { isauth: false }, action) => {

  switch (action.type) {
    case "IS_AUTH": {
      const { isAuth, email } = action.payload;
      return { isauth: isAuth, email: email }
    }
    default:
      return state;
  }
};

const show = (state = { show: false }, action) => {

  switch (action.type) {
    case "SHOW": {
      const { show } = action.payload;
      return { show: show }
    }
    default:
      return state;
  }
};

const comments = (state = { comments: [] }, action) => {
  switch (action.type) {

    case "ADD_REPLY": {
      const { replytext, index } = action.payload;
      let obj = state.comments[index];
      obj.replies.push(replytext);
      return {
        comments: [...state.comments]
      }
    }

    case "DELETE_REPLY_COMMENT": {
      const { index, commentindex } = action.payload;
      let obj = state.comments[commentindex];
      let replies = obj.replies;
      replies.splice(index, 1)
      return {
        comments: [...state.comments]
      }
    }

    case "ADD_COMMENT": {
      const { obj } = action.payload;
      return {
        comments: [...state.comments, obj]
      }
    }

    case "DELETE_COMMENT": {
      const { index } = action.payload;
      const templist = state.comments
      templist.splice(index, 1, {})
      return { comments: templist }
    }

    case "EDIT_COMMENT": {
      const { comment, index } = action.payload;
      let obj = state.comments[index]
      obj.comment = comment;
    }

    default:
      return state;
  }
}

const shared = (state = { shared: [] }, action) => {
  switch (action.type) {

    case "SHARED": {
      const { auth, shared } = action.payload
      let array = []

      state.shared.filter((obj1) => {
        if (obj1.auth === auth) {
          return array.push(obj1)
        }
      })

      if(array.length === 0){
        let shareddata = state.shared
        let obj = {}
        obj.auth = auth;
        obj.shared = shared;
        shareddata.push(obj);
        state.shared = shareddata;
      } else {
        let shareddata = state.shared
        let index 
        shareddata.filter((obj) => {

          if(obj.auth == ((([[array]])[0][0])[0]).auth){
            index = shareddata.indexOf(obj)
          }
        })
        let obj = shareddata[index];
        obj.shared = shared;
        shareddata.splice(index, 1, obj);
        state.shared = shareddata
      }
      
    }

    default:
      return state;
  }
}

const reducers = combineReducers({
  board,
  listsById,
  cardsById,
  users,
  comments,
  isauth,
  show,
  shared
});

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
  }
};


const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const store = createStore(reducers, persistedState);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;