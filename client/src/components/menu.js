import React, { Component } from "react";
import MenuFilter from "./menuFilter";
import axios from "axios";
import { Link } from "react-router-dom";
import menuPic from "../pics/Louis.jpg";

const MenuItem = (props) => (
  <React.Fragment>
    <img src={"data:image/png;base64,"+props.menuItem.img} alt={props.menuItem.name+" pic"} style={{ width: `100%` }}></img>
    <p>
      <Link to={"/edit/" + props.menuItem._id} className="itemInfo">
        {props.menuItem.name}
      </Link>{" "}</p>
      <p style={{ color: `grey` }}>
      ${props.menuItem.price}</p>
  </React.Fragment>
);

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bentos: [],
    };
  }
  componentWillMount() {
    axios
      .get('http://localhost:3000/api/bentos')
      .then((res) => {
        this.setState({ bentos: res.data });
      })
      .catch((err) => console.log(err));
  }
  bentos() {
    return this.state.bentos.map((bento) => {
      return (
        <div className="itemBlock">
          <MenuItem menuItem={bento} key={bento._id} />
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <h4 className="menu">Menu</h4>
        <button type="submit" className="orderBtd">
          <Link to="#">Order Now</Link>
        </button>
        <MenuFilter />
        {this.bentos()}
      </div>
    );
  }
}

export default Menu;
