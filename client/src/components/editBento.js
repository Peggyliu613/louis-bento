import React, { Component } from "react";
import axios from "axios";

class EditBento extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTypeOfMeat = this.onChangeTypeOfMeat.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      name: "",
      description: "",
      typeOfMeat: "",
      quantity: "",
      price: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/bento/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          name: res.data.name,
          description: res.data.description,
          typeOfMeat: res.data.typeOfMeat,
          quantity: res.data.quantity,
          price: res.data.price,
        });
      });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeTypeOfMeat(e) {
    this.setState({
      typeOfMeat: e.target.value,
    });
  }
  onChangeQuantity(e) {
    this.setState({
      quantity: Number(e.target.value),
    });
  }
  onChangePrice(e) {
    this.setState({
      price: Number(e.target.value),
    });
  }

  onSubmit() {
    const bento = {
      name: this.state.name,
      description: this.state.description,
      typeOfMeat: this.state.typeOfMeat,
      quantity: this.state.quantity,
      price: this.state.price,
    };
    console.log(bento);
    axios
      .post(
        "http://localhost:8000/api/update/" + this.props.match.params.id,
        bento
      )
      .then((res) => console.log(res.data));

    window.location = "/new";
  }
  onDelete(e) {
    axios
      .delete("http://localhost:8000/api/delete/" + this.props.match.params.id)
      .then((res) => console.log(res.data));
    window.location = "/menu";
  }

  render() {
    return (
      <div className="createBentoPage">
        <h4>Edit A Bento</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={this.state.description || ""}
                onChange={this.onChangeDescription}
              />
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">
                Type Of Meat
              </legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfMeat"
                    value="beef"
                    checked={this.state.typeOfMeat === "beef"}
                    onChange={this.onChangeTypeOfMeat}
                  />
                  <label className="form-check-label" htmlFor="typeOfMeat">
                    Beef
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfMeat"
                    value="pork"
                    checked={this.state.typeOfMeat === "pork"}
                    onChange={this.onChangeTypeOfMeat}
                  />
                  <label className="form-check-label" htmlFor="typeOfMeat">
                    Pork
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfMeat"
                    value="chicken"
                    checked={this.state.typeOfMeat === "chicken"}
                    onChange={this.onChangeTypeOfMeat}
                  />
                  <label className="form-check-label" htmlFor="typeOfMeat">
                    Chicken
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfMeat"
                    value="fish"
                    checked={this.state.typeOfMeat === "fish"}
                    onChange={this.onChangeTypeOfMeat}
                  />
                  <label className="form-check-label" htmlFor="typeOfMeat">
                    Fish
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-2 col-form-label">
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                value={this.state.price}
                onChange={this.onChangePrice}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="quantity" className="col-sm-2 col-form-label">
              Quantity
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-secondary">
                Update
              </button>
            </div>
          </div>
        </form>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={this.onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBento;
