import { useContext, useState } from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';

interface ModalProps {
  title: string;
  variant: 'primary' | 'danger';
  isSignUpFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

const ModalComponent = ({ title, variant, isSignUpFlow }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleClick = async () => {
    let data;
    if (isSignUpFlow) {
      const { data: signUpData } = await axios.post(
        'http://localhost:8000/auth/signup',
        {
          email,
          password,
        }
      );

      data = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        'http://localhost:8000/auth/login',
        {
          email,
          password,
        }
      );
      data = loginData;
    }
    if (data.errors.length) {
      return setErrorMessage(data.errors[0].msg);
    }

    setState({
      data: {
        id: data.data.id,
        email: data.data.email,
      },
      error: null,
      loading: false,
    });
    localStorage.setItem('token', data.data.token);
    axios.defaults.headers.common[
      'authorization'
    ] = `Bearer ${data.data.token}`;
    navigate('/articles');
  };

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
            <FormControl
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClick}>
            {title}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
