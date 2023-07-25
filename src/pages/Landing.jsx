import React from "react";
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo} from "../components"
import { Link } from "react-router-dom";

export default function Landing() {
    return (
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>some text</p>
            <Link to="/register" className="btn btn-hero">
              Login / Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    );
}
