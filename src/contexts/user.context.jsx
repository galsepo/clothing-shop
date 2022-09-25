import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reduser.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReduser = (state, action) => {
  console.log('userReduser dispatched');
  console.log({ action });
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }

}
const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  console.log("UserProvider")
  const [state, dispatch] = useReducer(userReduser, INITIAL_STATE);
  const { currentUser } = state;
  console.log({ currentUser });

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }

  // const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("ChangedListener")
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log("setCurrentUser in useEffect")
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
