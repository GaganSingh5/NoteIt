import React from 'react'
// import PropTypes from 'prop-types'
import './HeroView.less'
import { Link } from "react-router-dom";

const HeroView = (props: any) => {
  return (
    <div className="hero-container">
      <h1 className="hero-header">Note It 📚</h1>
      <p className="hero-desc">
        An Application which helps you take notes which are accessable from
        anywhere in the world.
      </p>
      <div className="hero-buttons ">
        <button className="hero-login noteit-button">
          <Link className="hero-link" to="login">
            Login
          </Link>
        </button>
        <button className="hero-signup noteit-button">
          <Link className="hero-link" to="signup">
            Signup
          </Link>
        </button>
      </div>
    </div>
  );
}

// HeroView.propTypes = {}

export default HeroView