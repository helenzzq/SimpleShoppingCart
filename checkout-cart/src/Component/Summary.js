
import React from 'react';
export default function Summary(props) {
  const { item, addItem, deleteItem, removeAll, completeOrder } = props;
  const removeIcon = <svg t="1599643167569" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1290" width="200" height="200"><path d="M804.414 123.434h-156.903c-7.827-67.871-65.572-120.767-135.51-120.767-69.935 0-127.672 52.893-135.499 120.767h-156.911c-63.498 0-115.15 51.667-115.15 115.163v5.909c0 48.523 30.213 90.055 72.775 106.977v544.022c0 63.498 51.659 115.163 115.152 115.163h439.272c63.495 0 115.15-51.67 115.15-115.163v-544.02c42.559-16.924 72.775-58.456 72.775-106.977v-5.909c0-63.498-51.657-115.165-115.15-115.165zM512 57.282c39.777 0 72.978 28.51 80.324 66.151h-160.633c7.344-37.643 40.547-66.151 80.309-66.151zM792.174 895.504c0 33.385-27.163 60.55-60.537 60.55h-439.272c-33.374 0-60.537-27.167-60.537-60.55v-535.836h560.347v535.836zM864.948 244.505c0 33.385-27.163 60.55-60.537 60.55h-584.822c-33.374 0-60.537-27.165-60.537-60.55v-5.909c0-33.385 27.163-60.55 60.537-60.55h584.824c33.374 0 60.537 27.165 60.537 60.55v5.909zM365.594 886.209c15.082 0 27.307-12.23 27.307-27.305v-307.468c0-15.078-12.227-27.309-27.307-27.309s-27.307 12.232-27.307 27.309v307.468c-0.002 15.08 12.225 27.305 27.307 27.305zM512 886.209c15.082 0 27.309-12.23 27.309-27.305v-307.468c0-15.078-12.232-27.309-27.309-27.309-15.08 0-27.307 12.232-27.307 27.309v307.468c0 15.08 12.225 27.305 27.307 27.305zM658.406 886.209c15.08 0 27.305-12.23 27.305-27.305v-307.468c0-15.078-12.227-27.309-27.305-27.309-15.084 0-27.309 12.232-27.309 27.309v307.468c-0.002 15.08 12.23 27.305 27.309 27.305z" fill="#ffffff" p-id="1291"></path></svg>;

  function PriceTag(props) {
    const { tag, tagName } = props;
    return (
      <div className="entry">
        <div style={{ flex: 2 }}>{tag}</div>
        <div style={{ textAlign: 'right', flex: 1 }}>${tagName.toFixed(2)}</div>
      </div>
    );
  }


  function DisplaySummary() {
    return (
      item.length !== 0 && (
        <DiscountForm  ></DiscountForm>
      )
    );
  }

  class DiscountForm extends React.Component {
    constructor(props) {
      super(props);
      const subtotal = item.reduce((a, c) => a + c.price * c.num, 0);
      const tax = subtotal * 0.13;
      const shipping = 10;
      const tempTotal = subtotal + tax + shipping;
      this.state = { discountcode: '', total: tempTotal, appliedCoupon: "none", showMsg: "none" };
    }
    displayDiscount = () => {
      if (this.state.appliedCoupon === "none") {
        if (this.state.showMsg === "none") {
          this.setState({ appliedCoupon: "block"});
        }
        else {
          console.log("hi")
          completeOrder()
          alert("Congratualation! Your order is placed!")
        }
      }
    }
    submitListener = (event) => {
      event.preventDefault();
      if (this.state.discountcode !== 'csc301') {
        alert("The coupon is invalid! Please re-enter a valid coupon");
      }
      else {
        if (this.state.appliedCoupon !== "none") {
          alert("The coupon is valid! You received 10% off on your purchase!");
          const totals = this.state.total * 0.9;
          this.setState({ total: totals, appliedCoupon: "none", showMsg: "block" });
        }
      }

    }

    handlePopUp() {
      const popUp = document.querySelector(".ups")
      popUp.style.display = "block";
      
    }
    handleChangeListener = (event) => {
      this.setState({ discountcode: event.target.value });
    }
    render() {
      const subtotal = item.reduce((a, c) => a + c.price * c.num, 0);
      const tax = subtotal * 0.13;
      const shipping = 10;
      return (
        
        item.length !== 0 && (
          <>
            <hr></hr>
            <PriceTag tag="Tax" tagName={tax} ></PriceTag>
            <PriceTag tag="Shipping" tagName={shipping} ></PriceTag>
            <PriceTag tag="Subtotal" tagName={subtotal} ></PriceTag>
            <hr />
            <div id="form" style={{ display: this.state.appliedCoupon }}>
              <form onSubmit={this.submitListener}>
                Discount Code:
        <input
                  type='text'
                  onChange={this.handleChangeListener} />
                <input type='submit' className="submit" value="Apply" />
              </form>
              <p>Student in CSC301 can enjoy exclusive 10% offer, coupon: csc301</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p className="boldtext" style={{ display: this.state.showMsg }}>Coupon Applied: 10% Off !</p>
              <h2 className="boldtext">Total:${this.state.total.toFixed(2)}</h2></div>
            <div>
            <hr />
              <div className="entry" style={{
                float:"right",position:"relative"}}>
              <button className="hoverBtn" style={{ padding:"10px" }}onClick={() => this.displayDiscount()}>
                  Proceed to Checkout
            </button>
                </div>
            </div>

          </>
        
        )
        
      );
    }
  }




  return (
    <div className="order" style={{ marginLeft: "0.2rem" }} >
      <h1 className="title">Order Summary</h1>
      <div style={{ textAlign: "center" }}>
      {item.length === 0 &&
           <img alt="Empty cart" className="empty" src='https://mymeatfactory.com/assets/fe/img/empty-cart.png'></img>}
      </div>

      {item.map((item) => {

        return (
          <div key={item.id} className="entry">
            <div style={{ flex: 5 }}>
              {item.name}
            </div>
            <div style={{ flex: 5, alignItems: "center" }}>
              <button onClick={() => addItem(item)} className="add">+</button>
              {'    '}
              <button onClick={() => deleteItem(item)} className="removeSingleItem"> - </button>
            </div>
            <div style={{ flex: 5 }}>

              {item.num} x ${item.price.toFixed(2)}
            </div>
            <a className="removeAll" href="#!" onClick={() => removeAll(item)}>{removeIcon}</a>
          </div>
        );
      })}

      <DisplaySummary></DisplaySummary>

    </div>
  );
}