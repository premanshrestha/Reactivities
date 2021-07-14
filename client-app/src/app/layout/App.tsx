
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import { Fragment } from 'react';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {
  const location = useLocation();
  return (
    <Fragment> 
      <Route exact path='/' component={HomePage} />
      <Route 
      path={'/(.+)'}
      render ={()=>(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
        <Route path='/' exact component={HomePage}></Route>
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
        <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}></Route>
        </Container>
        </>

      )}
      />
      </Fragment>
  );
  //location.key is use to clear al the data from edit form when we navigate fron edit to create.
}

export default observer (App); 
 