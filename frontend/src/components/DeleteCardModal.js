import React from 'react';
import { Button, Icon, Modal } from "semantic-ui-react";
import { API_ROUTE } from "../commons/Route";

class DeleteCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  onSubmit = () => {
    const { id, fetchEntries } = this.props;

    // send to backend
    fetch(`${API_ROUTE}/${id}`, {
      method: "delete",
    })
      .then(() => {
        fetchEntries();
      })
      .catch((err) => console.error(err));


    //  close modal
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    const triggerButton = (
      <Button icon color='red' style={{float: "right"}}>
        <Icon
          name='times'
        />
      </Button>
    );
    return (
      <Modal
        closeIcon
        open={isOpen}
        onOpen={() => this.setState({ isOpen: true })}
        onClose={() => this.setState({ isOpen: false })}
        trigger={triggerButton}
      >
        <Modal.Header>Are you sure?</Modal.Header>
        <Modal.Actions>
          <Button onClick={() => this.setState({ isOpen: false })} >
            No
          </Button>
          <Button color='red' onClick={this.onSubmit} >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteCardModal;
