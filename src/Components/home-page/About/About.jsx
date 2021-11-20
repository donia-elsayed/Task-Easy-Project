import React from "react";
import about_us from "../../../assets/images/about_us.png";
import "./About.css";
import { BsBookmarkStar } from "react-icons/bs";

import { BsClock } from "react-icons//bs";
import { VscChecklist } from "react-icons//vsc";
import { FiChevronRight } from "react-icons/fi";
export const About = () => {
  return (
    <>
      {/* // start about us section */}

      <div className="taskEasy__about my-5" id="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
            <div className="taskEasy__about-photo px-3">
                <img className="w-100" src={about_us} alt="profile" />
              </div>
         
            </div>
            <div className="col-md-6 col-sm-12">
                 <div className="taskEasy__about-info pt-3">
                <h2 className="text-capitalize pb-2"> About us </h2>
                <h4> TaskEasy </h4>
                <p className="py-3">
                  
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Pariatur animi cumque quod nobis suscipit, ea totam inventore
                  distinctio enim fugit recusandae cupiditate quidem, neque at,
                  impedit magnam obcaecati nesciunt impedit magnam obcaecati
                  nesciunt impedit magnam obcaecati nesciunt? Quisquam.
                </p>
                <button className="btn btn-default"> Learn more about us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end about us section */}

      {/* //start features */}

      <div className="taskEasy_features py-5" id="features">
        <div className="container">
          <h1 className="text-center pb-5 text-capitalize"> our features</h1>
          <div class="row">

            
            <div class="col-xl-4  col-md-6 col-sm-12 mb-5">
              <div class="card">
                <div class="card-body">
                <VscChecklist className ='fs-3 my-3 text-danger' />
                  <h5 class="card-title">
                 
                   Scheduling
                  </h5>
                  <p class="card-text">
                  Our robust task management features let you create and assign tasks with multiple team members in seconds.
                  </p>
                  <a href="#" className = 'text-info'> Learn more  <FiChevronRight/> </a>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-md-6 col-sm-12 mb-5">
              <div class="card">
                <div class="card-body">
                < BsClock  className ='fs-3 my-3 text-danger' /> 
                  <h5 class="card-title">
                  
                    Tracking
                  </h5>
                  <p class="card-text">
                  Set a planned start and end date of a task before the initiating operations and compare it with planned schedule.
                  </p>
                  <a href="#" className = 'text-info' >  Learn more  <FiChevronRight/> </a>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-md-6 col-sm-12 mb-5">
              <div class="card">
                <div class="card-body">
                <BsBookmarkStar className ='fs-3 my-3 text-danger ' />
                  <h5 class="card-title">
                     Prioritization 
                  </h5>
                  <p class="card-text">
                  Create prioritization for your tasks to notify your team members about the tasks that need your utmost attention.
                  </p>
                  <a href="#" className = 'text-info'> Learn more  <FiChevronRight/> </a>
                </div>
              </div>
            </div>

         
          </div>
          <div className ="taskEasy_features-seeAll">
          <button className ="btn btn-default"> View All Features </button>
          </div>
        </div>
      </div>
      {/* //  end features */}
      <div className="footer">
        <div className="container">

        </div>
      </div>
    </>
  );
};
export default About;
