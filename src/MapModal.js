import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";
import Modal from 'react-modal';
import './MapModal.scss';
import key  from './gcpKey.json';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Accessibility for the modal
Modal.setAppElement(document.getElementById('root'));
// Setting API key for reverse geocoding
Geocode.setApiKey(key.gcApi);

export default function MapModal({ order, closeModal, isOpen }) {
  const [originCoords, setOriginCoords] = useState({})
  const [shippingCoords, setShippingCoords] = useState({})
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key.gcApi,
  });

  useEffect(() => {
    Geocode.fromAddress(order.origin_address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setOriginCoords({ lat, lng })
      },
      (error) => {
        console.error(error);
      }
    );
    Geocode.fromAddress(order.shipping_address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setShippingCoords({ lat, lng })
      },
      (error) => {
        console.error(error);
      }
    );
  }, [order])



  return (
    <div className="MapModal">
      <Modal

        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Order Shipment</h2>
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="MapModal__map"
            center={originCoords}
            zoom={6}
          >
            <Marker position={originCoords} />
            <Marker position={shippingCoords} />
          </GoogleMap>
        )}
        <button className='MapModal__button' onClick={closeModal}>Close Map</button>

      </Modal>
    </div>
  );
}