import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import './Userdetails.css';
import Backicon from './back.svg';
import axios from 'axios';
import Loader from './spinner1.gif';

class Userdetails extends Component {
  state = {
    userDetails: {},
    isLoading: true,
    userNotFound: false,
  };
  componentDidMount = () => {
    axios
      .get(
        'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json'
      )
      .then((res) => {
        let userId = this.props.location.state;
        let filteredUserDetails = res.data.filter((user) => {
          return user.id === userId;
        });
        if (!filteredUserDetails.length) {
          this.setState({ userNotFound: true, isLoading: false });
          return;
        }
        this.setState({
          userDetails: filteredUserDetails[0],
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.userNotFound ? (
          <div
            style={{
              height: '100vh',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            User Not Found
          </div>
        ) : this.state.isLoading ? (
          <div className="spinner">
            <img src={Loader} alt="loader" />
          </div>
        ) : (
          <div className="userdetails">
            <div className="userdetails_titile">
              <Link
                to={'/user'}
                style={{
                  marginRight: '10px',
                  textAlign: 'center',
                  display: 'flex',
                }}
              >
                <img src={Backicon} alt="BackIcon" />
              </Link>
              <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>
                Details : {this.state.userDetails.first_name}{' '}
                {this.state.userDetails.last_name}
              </h2>
            </div>

            <div className="userdetails_body">
              <div className="userdetails_body_elements">
                First Name : <b>{this.state.userDetails.first_name}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                Last Name : <b>{this.state.userDetails.last_name}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                Company_name : <b>{this.state.userDetails.company_name}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                City : <b>{this.state.userDetails.city}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                State : <b>{this.state.userDetails.state}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                Zip : <b>{this.state.userDetails.zip}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                Email : <b>{this.state.userDetails.email}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                Web : <b>{this.state.userDetails.web}</b>
              </div>
              <hr />
              <div className="userdetails_body_elements">
                Age : <b>{this.state.userDetails.age}</b>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default withRouter(Userdetails);
