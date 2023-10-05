import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, FormControl, Select, MenuItem, Button, Card, CardHeader, CardContent} from '@mui/material';
import { setCurrentUser } from '../actions/authedUser';
import { Auth } from '../authentication/auth';
import { Redirect, useLocation } from 'react-router-dom';


const Login = () => {
  const users = useSelector((state) => Object.keys(state.users));
  const dispatch = useDispatch();
  const location = useLocation();

  const [userId, setUserId] = useState(null);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    Auth.authenticate(() => {
      setRedirectToReferrer(true);
    });
    dispatch(setCurrentUser(userId));
  };

  if (redirectToReferrer) {
    if (location.state && location.state.from) {
      return <Redirect to={location.state.from} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Would You Rather App" />
            <CardContent>
              <form onSubmit={login}>
                <FormControl fullWidth>
                  <Select
                    value={userId || 'default'}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select User' }}
                  >
                    <MenuItem disabled value="default">
                      Select Your Hero
                    </MenuItem>
                    {users.map((id) => (
                      <MenuItem key={id} value={id}>
                        {id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Log in
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;