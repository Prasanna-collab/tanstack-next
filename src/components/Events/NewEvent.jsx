import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createEvents } from '../utils/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['event'],
    mutationFn: createEvents,
  });

  function handleSubmit(formData) {
    mutation.mutate(formData);
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
    </Modal>
  );
}
