import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiBaseUrl from '../../config';

interface Entity {
  id: number;
  name: string;
}

const DeletePlaneForm: React.FC = () => {
  const { id, planeId, model, name } = useParams<{ id: string; planeId: string; model: string; name: string; }>();

  const [planeID, setPlaneID] = useState<string>(planeId || '');
  const [itemName, setItemName] = useState<string>(name || '');
  
  const [planeModel, setPlaneModel] = useState<string>(model || '');
  const [planeCapacity, setPlaneCapacity] = useState<number>(0);

  const [responseMessage, setResponseMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);

  useEffect(() => {
    if (planeID) {
      fetchData(planeID);
    }
  }, [planeID]);

  const fetchData = async (planeID: string) => {
    try {

      const response = await fetch(`${apiBaseUrl}/planes/${planeID}`);

      const data = await response.json();
      
      if (data.plane) 
      {
        setItemName(data.plane.name);
        setPlaneID(data.plane.plane_id);
        setPlaneModel(data.plane.model);
        setPlaneCapacity(data.plane.capacity);
      }     
      
    } 
    catch (error) 
    {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      if (!csrfToken) {
        console.error('CSRF token not found.');
        return;
      }

      const response = await fetch(`${apiBaseUrl}/planes/delete/${planeID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status) {
          setResponseStatus(1); // Success
          setResponseMessage(`Success: ${data.success}`);
        } else {
          setResponseStatus(0); // Error
          setResponseMessage(`Error: ${data.error}`);
        }
      } else {
        setResponseStatus(0); // Error
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setResponseStatus(0); // Error
      setResponseMessage('Error deleting data: An error occurred');
      console.error('Error deleting data:', error);
    }
  };

  const getResponseClass = () => {
    if (responseStatus === 1) {
      return 'text-success'; // Green color for success
    } else if (responseStatus === 0) {
      return 'text-danger'; // Red color for error
    } else {
      return ''; // No specific styles (default)
    }
  };

  return (
    <div className="col-md-6">
      <h2>Delete Plane</h2>

      <p>Are you sure you want to delete the following plane?</p>
      <p><b>Name</b>: {itemName}<br/> <b>Plane ID</b>: {planeID} <br/>  <b>Model</b>: {planeModel} <br/>  <b>Capacity</b>:{planeCapacity}</p>
      <div className="text-center mt-3">
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <p className={`response-message ${getResponseClass()} text-center mt-3`}>{responseMessage}</p>
    </div>
  );
};

export default DeletePlaneForm;