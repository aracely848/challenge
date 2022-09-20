import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }

  constructor() {
    super();
    this.headerTitle = 'Gifs';
    this.getGifs();
  }

  static get properties() {
    return {
      headerTitle: { type: String },
      listGifs: { type: Array }
    };
  }

  async getGifs() {
    const url = 'https://api.giphy.com/v1/gifs/search?api_key=U0qFzd5aNTuY4lOA5jRMpKpOMQN1Vabq&q=pug&limit=25&offset=0&rating=g&lang=en';
    const response = await fetch(url);
    const data = await response.json();
    this.listGifs = data;
    console.log(this.listGifs)
    } 

    handleClick() {
        this.navigate('page');
    }
    

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main
            text=${this.headerTitle}>
          </bbva-header-main>
        </div>

        <div slot="app__main" class="container">
            <div class="containerCard">                
                ${this.listGifs?.data.map((item) => html`
                <div class="cardInfo" >
                    <h3>${item.title}</h3>
                    <img src="${item.images.original.url}"/>
                    <button  @navigate="${this.handleClick}">Agregar al carrito</button>
                 </div>
                `)}                
            </div>
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return css`
      bbva-header-main {
        --bbva-header-main-bg-color: #002171;
      }
     
      .containerCard {
      
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;   
        margin: 0;
        padding: 0;  
      }
      .cardInfo{
        width: 300px;
        margin: 10px;
        text-align: center;  
        background-color: #003366;  
        
        
      }
      h3{
                color: #FFFFFF;
                text-align: center;
            }
            img {
                width: 100%;
                max-height: 300px;
            }
            button {
                padding: 5px;
                background-color: #003366;
                color: #87b8e9;
                font-family: sans-serif;
                font-size: 14px;
                cursor: pointer;
            }
      `;
  }
  
}
window.customElements.define(HomePage.is, HomePage);