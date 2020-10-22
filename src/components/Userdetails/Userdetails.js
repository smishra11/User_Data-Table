import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './Userdetails.css';
import Backicon from './back.svg';
import axios from 'axios';
import Loader from '../Alluser/spinner1.gif';

class Userdetails extends Component {
  state = {
    userDetails: {},
    isLoading: true,
  };
  componentDidMount = () => {
    const userId = this.props.match.params.id;
    console.log('id', userId);
    axios
      .get(
        'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json'
      )
      .then((res) => {
        let singleUserDetails = res.data.filter((user) => {
          return user.id.toString() === userId;
        });
        // console.log('usr', singleUserDetails);
        this.setState({
          userDetails: singleUserDetails[0],
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
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
              <h2>
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
export default Userdetails;
