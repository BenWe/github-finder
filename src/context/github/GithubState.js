import axios from "axios";

import React, { useReducer } from "react";

import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  // We are in Production
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setIsLoading();

    const queryString = `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const response = await axios.get(queryString);
    const users = response.data.items;

    dispatch({
      type: SEARCH_USERS,
      payload: users,
    });
  };

  // Get User
  const getUser = async (username) => {
    setIsLoading();

    const queryString = `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const response = await axios.get(queryString);
    const user = response.data;

    dispatch({
      type: GET_USER,
      payload: user,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setIsLoading();

    const queryString = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const response = await axios.get(queryString);
    const repos = response.data;

    dispatch({
      type: GET_REPOS,
      payload: repos,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // SetIsLoading
  const setIsLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
