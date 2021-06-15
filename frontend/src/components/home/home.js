import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <>
        <div className="home">
          <h1 className="home-message">
            Build <span className="highlighted">Connections</span>
            <br></br>With The Brightest<br></br>
            <span className="highlighted">Students</span> In The UK.{" "}
          </h1>
        </div>
        <div className="home-second">
          <div className="home-second-container">
            <h1>
              Find the <span className="highlighted">right</span> project for you.
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

            <div className="find-button-container"><Link to="/find" className="find-button">Find</Link></div>
           
          </div>
        </div>
        <div className="home-third">
            <h1>Introduce your ideas to the <span className="highlighted">world</span>.</h1>
            <div className="home-post-container">
              <div className="home-post-text">
                <h1>
                  Post your project and relax as the applications come rolling in.
                </h1>
                <p>
                  Simply post your project in 2 minutes. Choose from a variety of pre-existing tags, and if you don't like them, create your own tags!
                </p>

                <p>
                  Find only the most skilled and determined people for your project.
                </p>

                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit sollicitudin volutpat. Aenean id odio ut massa imperdiet sodales. In vulputate ipsum sed sem hendrerit, et porttitor felis sagittis. Curabitur sit amet mattis neque, non mattis libero. Vestibulum tortor felis, porttitor id cursus quis, dapibus eget dolor. Nulla orci nisi, suscipit ut dolor eu, vehicula pulvinar nisl. Pellentesque consequat posuere turpis ut convallis.</p>

                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit sollicitudin volutpat. Aenean id odio ut massa imperdiet sodales. In vulputate ipsum sed sem hendrerit, et porttitor felis sagittis. Curabitur sit amet mattis neque, non mattis libero. Vestibulum tortor felis, porttitor id cursus quis, dapibus eget dolor. Nulla orci nisi, suscipit ut dolor eu, vehicula pulvinar nisl. Pellentesque consequat posuere turpis ut convallis.</p>

                <div className="post-button-container"><Link to="/post" className="post-button">Post</Link></div>

                
              </div>
              <img className="home-post-image" src="https://images.unsplash.com/photo-1592188627153-8157de983392?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="sharing project"></img>
            </div>
            
        </div>
      </>
    );
  }
}

export default Home;
