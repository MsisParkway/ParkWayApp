export default function loginReducer(state = {}, action = {}) {
  const currentState = state;

  switch (action.type) {
    case 'SET_LOGIN_ID':
      return {
        loginId: action.payload.loginId,
      };
    default:
      return currentState;
  }
}
