import { modalHandler } from "../_functions";
import { HTTPWorker } from "../functions/HTTPWorker";
import { HtmlWorker } from "../functions/htmlWorker";

async function renderServices() {
  const httpWorker = new HTTPWorker("https://casenova.uz/api/v1");
  const { body } = await httpWorker.get("/services?incSubs=true");
  const htmlWorker = new HtmlWorker();
  const parentDiv = document.querySelector(".service__block");

  if (body.data.length > 0 && parentDiv) {
    console.log(parentDiv)
    body.data.forEach((item, i) => {
      // if(i !== 0) return false;
      htmlWorker.render(
        parentDiv,
        `
      <div class="services__row modalBtn" data-id="${item?.id}">
          <div class="service__block--img">
          <img src={{image}} alt="next">
        </div>
        <div  class="service__block--desc">
          <h3>{{name}}</h3>
          <ul>
            {{render(!
                <li>
                  <img src="img/services/next.png" alt="next">
                  <p>{{name}}</p>
              </li>
            !, subservices)}}
          </ul>
        </div>
      </div>
      `,
        item
      );
    });
  }
}

/*
* <ul>
            <li>
              <img src="img/services/next.png" alt="next">
              <p>Процедуры по уходу за кожей лица</p>
            </li>
            <li>
              <img src="img/services/next.png" alt="next">
              <p>Инъекционная косметология</p>
            </li>
            <li>
              <img src="img/services/next.png" alt="next">
              <p>Контурная пластика лица</p>
            </li>
          </ul>
*
* */

(async () => {
  if(!location.pathname.includes("services")) return;
  await renderServices();
  modalHandler(".services__row", 'services');
})();
