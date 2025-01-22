/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

function PopupForm({ post }) {
  const [showPopup, setShowPopup] = useState(false);

  const customerNameElement = useRef();
  const customerEmailElement = useRef();
  const reservationDayElement = useRef();

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  async function sendReservationDetails(
    customerName,
    customerEmail,
    reservationDate
  ) {
    const formData = {
      from_name: "the Reservation Team",
      to_name: customerName,
      to_email: customerEmail,
      subject: "Reservation Details",
      message: `
      Here are your reservation details:

      Service Name: ${post.serviceTitle}

      Reservation Date: ${reservationDate}

      Hourly Rate: ${post.pricing}€/h
      `,
    };

    try {
      const response = await emailjs.send(
        "service_ma5te3a", // Replace with your EmailJS Service ID
        "template_d5sktoo", // Replace with your EmailJS Template ID
        formData, // Form data passed directly
        "irzUD5hRcDrQs4iDP" // Replace with your EmailJS Public Key
      );

      alert(`Reservation Confirmed, 
        Please check your email:
        ${customerEmail} `);

      
    } catch (error) {
      alert("Failed to Reserve. Please try again.");
    } finally {
      //setIsSending(false); // Reset the loading state
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const customerName = customerNameElement.current.value;
    const customerEmail = customerEmailElement.current.value;
    const reservationDate = reservationDayElement.current.value;

    setShowPopup(false); // Close the popup after submission

    sendReservationDetails(customerName, customerEmail, reservationDate);
  };

  return (
    <div>
      <button onClick={openPopup}>Reserve</button>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>Reservation form</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  ref={customerNameElement}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  ref={customerEmailElement}
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="reservationDay">Reservation day:</label>
                <input
                  type="date"
                  id="reservationDay"
                  name="reservationDay"
                  required
                  ref={reservationDayElement}
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="bookedService">
                  <b>Service Choosen: </b>
                  {post.serviceTitle}
                </label>
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="bookedService">
                  <b>Total: </b>
                  {post.pricing}€
                </label>
              </div>

              <div style={{ marginTop: "20px" }}>
                <button type="submit">Confirm</button>
                <button
                  type="button"
                  onClick={closePopup}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles for overlay and popup
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "500px",
  textAlign: "center",
};

export default PopupForm;
