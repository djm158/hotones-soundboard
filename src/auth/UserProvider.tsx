import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

export interface IUserContext {
  displayName: string;
  email: string;
  photoURL: string;
}
export const UserContext = createContext<IUserContext | null>(null);
class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth: any) => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
