const config = {
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL,
  signupUrl: process.env.EXPO_PUBLIC_SIGNUP_URL,
  signinUrl: process.env.EXPO_PUBLIC_SIGNIN_URL,
  checkAuthUrl: process.env.EXPO_PUBLIC_CHECK_AUTH_URL,
  usersUrl: process.env.EXPO_PUBLIC_USERS_URL,
  searchUsersUrl: process.env.EXPO_PUBLIC_SEARCH_USERS_URL,
  passwordUpdateUrl: process.env.EXPO_PUBLIC_PASSWORD_UPDATE_URL,
  messagesUrl: process.env.EXPO_PUBLIC_MESSAGES_URL,
  roomsUrl: process.env.EXPO_PUBLIC_ROOMS_URL,
  searchRoomsUrl: process.env.EXPO_PUBLIC_SEARCH_ROOMS_URL,
  mapboxToken: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
};

export default config;
