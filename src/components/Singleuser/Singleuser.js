import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Singleuser.css';

class Singleuser extends Component {
  state = {
    redirect: false,
  };
  navigateToUserDetails = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { first_name, last_name, age, email, web } = this.props.user;
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: `/users/${this.props.user.id}`,
          }}
        />
      );
    }
    return (
      <tr className="singleuser">
        <td style={{ cursor: 'pointer' }} onClick={this.navigateToUserDetails}>
          {first_name}
        </td>
        <td>{last_name}</td>
        <td>{age}</td>
        <td>{email}</td>
        <td>
          <a
            style={{ textDecoration: 'none', color: 'rgb(52, 155, 189)' }}
            href={web}
            target="_blank"
            rel="noopener noreferrer"
          >
            {web}
          </a>
        </td>
      </tr>
    );
  }
}

export default Singleuser;
