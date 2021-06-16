import AuthService from "./auth-service";

const authHeader = () => {
    const user = AuthService.getUser();
  
    if (user?.accessToken) {
      return {
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      };
    } else {
      return {
        'Content-Type': 'application/json'
      };
    }
}

export default authHeader;

