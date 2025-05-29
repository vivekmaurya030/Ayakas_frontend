import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChefSvg from "../assets/ChefSvg.svg";
import "../styles/Home.scss";
import Loader from "../components/Loader";
import Vector from "../assets/Vectors.svg";
import Vector2 from "../assets/vector2.svg";
import Avacado from "../assets/Avocado.svg";

const Home = () => {
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (loading) {
    return <Loader />; // Show Loader first
  }

  // After 3s, show the full page
  return (
      <div className="HomePage">
      <div className="HomeContainer">

        <div className="HomeNavContainer">
          <nav className="HomeNav">
            <a href="#" className="HomeNavLink">Home</a>
            <a href="*" className="HomeNavLink">Features</a>
            <a href="*" className="HomeNavLink">About Us</a>
            <a href="*" className="HomeNavLink">FAQs</a>
          </nav>
          <div className="LoginButtonContainer">
            <div className="LoginButtonWrapper">
              <button className="LoginButton">Login</button>
            </div>
          </div>
        </div>
        <div className="HomeBgGradient"></div>

        <div className="HomeBodyContainer">
        <div className="HomeBgImage1 HomeBg">
            <img src={Vector} alt="" />
        </div>
        <div className="HomeBgImage2 HomeBg">
            <img src={Vector2} alt="" />
        </div>
         <div className="HomeBgImage3 HomeBg">
            <img src={Avacado} alt="" />
        </div>
          <div className="HomeBodyPart1">
            <h1 className="HomeBodyTitle">
              Discover, Cook, Savor <br />
              <p>– The Ayaka Way</p>
            </h1>
            <div className="HomeSubtitleSection">
              <h3>What's cooking in your mind?</h3>
              <div className="HomeSubtitleButtons">
                <button onClick={() => navigate("/ingredients")}>I'm Hungry</button>
                <span className="Checkmark">✔️</span>
              </div>
            </div>
          </div>

          <div className="HomeBodyPart2">
            <img src={ChefSvg} alt="Chef" />
          </div>

          <div className="HomeBodyPart3">
            <div className="HomeSubtitleSection">
              <h3>Craving for Creativity?🤔</h3>
              <div className="HomeSubtitleButtons" onClick={()=>navigate('/cook_with_ai')}>
                <button>Cook With AI</button>
                <span className="Checkmark">✔️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
