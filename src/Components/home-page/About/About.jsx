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
                <button className="btn getStarted__btn bg-transparent border-0"> Learn more about us</button>
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
          <div className="row">
            <div className="col-xl-4  col-md-6 col-sm-12 mb-5">
              <div className="card">
                <div className="card-body">
                <VscChecklist className ='fs-3 my-3 text-danger' />
                  <h5 className="card-title">
                 
                   Scheduling
                  </h5>
                  <p className="card-text">
                  Our robust task management features let you create and assign tasks with multiple team members in seconds.
                  </p>
                  <button className = 'bg-transparent border-0 text-info'> Learn more  <FiChevronRight/> </button>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 col-sm-12 mb-5">
              <div className="card">
                <div className="card-body">
                <BsClock  className ='fs-3 my-3 text-danger'/> 
                  <h5 className="card-title"> Tracking</h5>
                  <p className="card-text">
                  Set a planned start and end date of a task before the initiating operations and compare it with planned schedule.
                  </p>
                  <button className = 'text-info bg-transparent border-0'>  Learn more  <FiChevronRight/> </button>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 col-sm-12 mb-5">
              <div className="card">
                <div className="card-body">
                <BsBookmarkStar className ='fs-3 my-3 text-danger ' />
                  <h5 className="card-title">
                     Prioritization 
                  </h5>
                  <p className="card-text">
                  Create prioritization for your tasks to notify your team members about the tasks that need your utmost attention.
                  </p>
                  <button className = 'text-info bg-transparent border-0'> Learn more  <FiChevronRight/> </button>
                </div>
              </div>
            </div>

         
          </div>
          <div className ="taskEasy_features-seeAll">
          <button className ="btn getStarted__btn"> View All Features </button>
          </div>
        </div>
      </div>
      {/* //  end features */}
    </>
  );
};
export default About;
