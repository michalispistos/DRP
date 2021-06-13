import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <>
        <div className="home">
          <h1 className="home-message">
            Build <span class="highlighted">Connections</span>
            <br></br>With The Brightest<br></br>
            <span className="highlighted">Students</span> In The UK.{" "}
          </h1>
        </div>
        <div className="home-second">
          <div className="home-second-container">
            <h1>
              Find the <span class="highlighted">right</span> project for you.
            </h1>

            <div className="project-type-list">
              <div className="project-type">
                <h2>Startups</h2>
                <div className="img-container">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="startups" />
                </div>
                <p>
                  Join the most<br></br>promising startups
                </p>
              </div>
              <div className="project-type">
                <h2>Academic</h2>
                <div className="img-container">
                  <img src="https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" alt="academic" />
                </div>
                <p>
                  Work together<br></br>with new people
                </p>
              </div>
              <div className="project-type">
                <h2>Hobby</h2>
                <div className="img-container">
                  <img src="https://images.unsplash.com/photo-1522410818928-5522dacd5066?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="hobby" />
                </div>
                <p>
                  Find others who<br></br>share your passion
                </p>
              </div>
            </div>

            <div className="find-button"><Link to="/find" className="home-button">Find</Link></div>
           
          </div>
        </div>
        <div className="home-third">
            <h1>Share your project</h1>
        </div>
      </>
    );
  }
}

export default Home;
