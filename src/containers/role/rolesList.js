import React, { Component } from 'react';
import { connect } from 'react-redux';

import API from '../../api/baseApi';

import { addRole, fetchRoles, removeRole } from './reducer';
import { setAlert } from '../alert/reducer';

import RolesTable from '../../components/roles/rolesTable';
import Modal from '../../components/modal';

class RolesList extends Component {
  state = { showForm: false, name: '', disabled: false };

  componentDidMount() {
    this.props.dispatch(fetchRoles());
  }

  updateName = e => {
    this.setState({ name: e.target.value });
  };

  toggleForm = () => {
    const showForm = !this.state.showForm;
    this.setState({ showForm, name: showForm ? this.state.name : '' });
  };

  formSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ disabled: true });
      const apiResponse = await API('post', 'roles', { name: this.state.name, permissions: {} });
      const newRoleResponse = apiResponse.data;
      this.props.dispatch(
        setAlert({
          type: 'Success',
          message: newRoleResponse.message,
        })
      );
      this.props.dispatch(addRole(newRoleResponse.data));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ disabled: false });
      this.toggleForm();
    }
  };

  onDeleteClick = async roleId => {
    try {
      this.setState({ disabled: true });
      const apiResponse = await API('delete', `roles/${roleId}`);
      const deleteRoleResponse = apiResponse.data;
      this.props.dispatch(
        setAlert({
          type: 'Success',
          message: deleteRoleResponse.message,
        })
      );
      this.props.dispatch(removeRole(deleteRoleResponse.data));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ disabled: false });
    }
  };

  render() {
    return (
      <>
        <Modal
          disabled={this.state.disabled}
          handleClose={this.toggleForm}
          name={this.state.name}
          primaryButtonName='Create'
          show={this.state.showForm}
          submit={this.formSubmit}
          title='Create a new role'
          updateName={this.updateName}
        />
        <RolesTable
          disabled={this.state.disabled}
          onDeleteClick={this.onDeleteClick}
          onNewClick={this.toggleForm}
          roles={this.props.roles}
        />
      </>
    );
  }
}

const mapStateToProps = ({ roles }) => ({ roles });

export default connect(mapStateToProps)(RolesList);
