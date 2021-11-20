import home3 from "../../../assets/images/home3.png";
import Button from "@restart/ui/esm/Button";
import "../Navbar/Nav.css";
/* start home */
const Home = () => {
    return (
      <div className="home-img" id="home">
        <div className="wrap justify-content-center container ">
          <div className="row m-0 align-items-center pt-5">
            <div className="col-md-6">
              <h2 className='pb-2'>Welcome </h2>
              <h4 className='pb-2'>Task easy</h4>
              <p className='pb-3'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <Button className="getStarted__btn btn btn-default">Get started</Button>
            </div>
            <div className="col-md-6 img-fluid ">
              <img src={home3} alt="me"></img>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Home
  /*end home*/