import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class GarageView {
  init(){
    document.title = 'Garage'
    this.favCars = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getFavCars()
  }

  async getFavCars(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favCars = currentUser.favouriteCars
      console.log(this.favCars)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Garage" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">   
        <div class="garage-animation">     
          <img class="garage-doors" src="./images/garage/garage-doors.png">
          <img class="garage-moving" src="./images/garage/garage-moving.png">
        </div>
        <button @click=${turnOnLights} class="placeholder">placeholder</div>
        <!--------<div id="dark" class="lights"></div>---->
        <p>Your Garage</p>
        <img class="garagelight" src="./images/garage/garagelight.png">

        <div class="cars">
          ${this.favCars == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`
          ${this.favCars.map(car => html`
            <va-car class="car-card"
              id="${car._id}"
              name="${car.name}"
              description="${car.description}"
              price="${car.price}"
              user="${JSON.stringify(car.user)}"
              image="${car.image}"
              transmission="${car.transmission}"
              mileage="${car.mileage}"
            >        
            </va-car>

          `)}
        `}
        ${this.favCars == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`
          ${this.favCars.map(car => html`
            <va-car class="car-card"
              id="${car._id}"
              name="${car.name}"
              description="${car.description}"
              price="${car.price}"
              user="${JSON.stringify(car.user)}"
              image="${car.image}"
              transmission="${car.transmission}"
              mileage="${car.mileage}"
            >        
            </va-car>

          `)}
        `}
        </div>
        <img class="background" src="./images/background.png">
      </div>   
    `
    render(template, App.rootEl)
  }
}

function turnOnLights() {
  var darkelement = document.querySelector("#dark");
  darkelement.classList.toggle("off");
}

export default new GarageView()