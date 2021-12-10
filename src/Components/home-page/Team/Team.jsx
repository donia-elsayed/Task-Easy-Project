import doniaImg from "../../../assets/images/team-img.png";
import marwa from "../../../assets/images/team2.jpg";
import mayar from "../../../assets/images/pp.jpg";
import "./Team.scss";
const Team = () => {
  return (
    <>
      <section className="team__member pt-5" id="team">
        <header className="team__header text-center">
          <h2 className="text-capitalize pb-3"> meet our team</h2>
        </header>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-2 team__item me-3">
              <figure>
                <img src={doniaImg} alt="marwa" className="w-100 p-3" />
              </figure>
              <h5 className="text-capitalize text-center">donia elsayed</h5>
            </div>
            <div className="col-md-2 team__item me-3">
              <figure>
                <img src={mayar} alt="marwa" className="w-100 p-3" />
              </figure>
              <h5 className="text-capitalize text-center">mayar magdy</h5>
            </div>
            <div className="col-md-2 team__item ">
              <figure>
                <img src={marwa} alt="marwa" className="w-100 p-3" />
              </figure>
              <h5 className="text-capitalize text-center">marwa attia</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Team;
