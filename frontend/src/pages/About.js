import React from "react";
import userContext from "../context/userContext";
import Base from "../components/Base";

const About = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
    color: "#333",
  };

  const headerStyle = {
    fontSize: "36px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#007BFF",
  };

  const infoStyle = {
    fontSize: "25px",
    marginBottom: "10px",
    color: "#6b5b95",
  };

  const missionStyle = {
    fontSize: "24px",
    margin: "20px 0",
  };

  const teamStyle = {
    fontSize: "24px",
    margin: "20px 0",
  };

  const welcomeStyle = {
    fontSize: "20px",
    backgroundColor: "#007BFF",
    color: "#BA55D3",
    padding: "10px 20px",
    borderRadius: "5px",
  };

  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <div style={containerStyle}>
            <h1 style={headerStyle}>About Tech Insider</h1>
            <p style={infoStyle}><i><b>Welcome to Tech Insider, your ultimate destination for all things tech.</b></i></p>
            
            <div style={missionStyle}>
              <h2>Our Mission</h2>
              <p>
                At Tech Insider, we are on a mission to provide you with the most accurate and up-to-date
                information about the ever-evolving world of technology.
              </p>
            </div>
            
            <div style={teamStyle}>
              <h2>Meet the Team</h2>
              <p>
                Our team of passionate tech enthusiasts is dedicated to delivering high-quality content that
                keeps you informed and engaged.
              </p>
            </div>
            
            {object.user && object.user.data && object.user.data.user ? (
              <div style={welcomeStyle}>
                <p>Welcome, {object.user.data.user.name}!</p>
                <p>We appreciate your continued support as we strive to deliver the best tech content.</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;