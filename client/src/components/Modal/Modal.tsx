import { useState } from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

interface ModalProps {
  title: string;
  variant: 'primary' | 'danger';
}

const ModalComponent = ({ title, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        style={{ marginRight: '1rem', padding: '0.5rem 3rem' }}
      >
        {title}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type='password' />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary'>{title}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
