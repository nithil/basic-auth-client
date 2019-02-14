import React from 'react';
import { Button, Table } from 'react-bootstrap';

const rolesTable = props => {
  return (
    <>
      <Button variant='primary' onClick={props.onNewClick}>
        New
      </Button>
      <Table striped responsive size='small'>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>#</th>
            <th style={{ width: '50%' }}>Name</th>
            <th style={{ width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.roles.map((role, index) => {
            return (
              <tr key={index}>
                <td>{role._id}</td>
                <td>{role.name}</td>
                <td>
                  {/* <Button variant='info' disabled={props.disabled} onClick={e => null}>
                    Edit
                  </Button>{' '}
                  {'   '} */}
                  <Button variant='danger' disabled={props.disabled} onClick={e => props.onDeleteClick(role._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default rolesTable;
