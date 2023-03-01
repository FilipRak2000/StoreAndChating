
export const initialState = {
    Auth: false,
  };

export const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, Auth: true };
      case "logout":
        return { ...state, Auth: false };
      default:
        throw new Error(action.type);
    }
  };
