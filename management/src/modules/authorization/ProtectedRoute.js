import { Navigate, Route } from 'react-router-dom';
import DefaultLayout from '../../layout/default';

const ProtectedRoute = async ({ isAuthenticated }) => {
    if (isAuthenticated && await AuthenticationCheck) {
        return <Navigate to="/" />;
    }


    return <DefaultLayout />;
};

const AuthenticationCheck = async () => {
    // check if session has auth token.
    
    let valid = true;
    await fetch("http://localhost:5000/api/auth/validate")
            .then((response) => {
                if(response.status != 200){
                    console.log("not valid");
                    valid = false;
                }
            }).catch((error) => {
                console.log("not valid");
                valid = false;
            });
    

    return valid
}

export function ProtectedRoutes({ component: Component, ...rest }) {
    return (
  
      // this route takes other route assigned to it from the App.js and return the same route if condition is met
      <Route
        {...rest}
        render={(props) => {
          // get cookie from browser if logged in
          const token = cookies.get("TOKEN");
  
          // return route if there is a valid token set in the cookie
          if (token) {
            return <Component {...props} />;
          } else {
            // return the user to the landing page if there is no valid token set
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    // sets the location a user was about to assess before being redirected to login
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    );
  }

export default ProtectedRoute;
