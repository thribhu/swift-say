import React, { createContext, useReducer, useContext } from 'react';
import reducer from './navigation.reducer';

const NavigationContext = createContext({currentRoute: "/", to:"", previousRoute:""});

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer);
  const customDispatch = (action) => {
    if (typeof action === 'function') {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };

  const contextValue = {
    state,
    dispatch: customDispatch, 
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};
