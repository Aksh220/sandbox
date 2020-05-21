import { Component } from '@angular/core';

@Component({
  selector: 'footer-section',
  template:`
  <footer>
    <div class="footer-wrapper">
      <a href="#Terms of Use">Terms of Use</a>
      <p> <span>&copy;</span> Copyrights Torry Harris Business Solution</p>
      <img class="logo" src="https://deplomatic-ui.s3.amazonaws.com/assets/logo/this_logo_light_bg.svg" placeholder="Logo" height="18px" >
    </div>
  </footer>
  `
})
export class FooterComponent { }