import React from 'react'
import './OrderRow.scss'
import MapModal from "./MapModal"

export const OrderRow = ({ order }) => {
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function closeModal() {
        setIsOpen(false);
      }

      function onClick() {
        setIsOpen(true);
      }
    return (
        <div className="OrderRow">
            <MapModal isOpen={modalIsOpen} closeModal={closeModal} order={order} />
            <div className="OrderRow__section">
                <h4>Order: {order.id}</h4>
                <div className="OrderRow__image"><img src={order.photo} alt="product"/></div>
            </div>
            <div className="OrderRow__section">
                <div className="OrderRow__attribute"><label>Creation Date:</label> {order.created}</div>
                <div className="OrderRow__attribute"><label>Customer:</label> {order.customer}</div>
                <div className="OrderRow__attribute"><label>Condition:</label> {order.condition}</div>
                <div><label>Status:</label><div className={`OrderRow__status OrderRow__status--${order.status}`}>{order.status}</div></div>
            </div>
            <div className="OrderRow__section">
            <div className="OrderRow__attribute"><label>Sku:</label> {order.sku}</div>
            <div className="OrderRow__attribute"><label>Type:</label> {order.type}</div>
            <div className="OrderRow__attribute"><label>Size:</label> {order.size}</div>
            <button className="OrderRow__button" onClick={onClick}>Generate Map</button>
            </div>
        </div>
    );
}