import React, { Component } from 'react';
import './home.css';
import homePic from './home.png';


class Home extends Component {
    render() { 
        return (
            <div className="homePage">
                <img src={homePic} alt="Taiwan"/>
                <p>Food with love</p>
                <p>Hours: 11am-3pm Mon.-Fri.</p>
                <p>Location: No.1 Taiwanese St, Sunnyvale</p>
            </div>
          );
    }
}
 
export default Home;