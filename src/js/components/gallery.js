import { HTTPWorker } from "../functions/HTTPWorker";
import { HtmlWorker } from "../functions/htmlWorker";

async function renderGallery() {
  const httpWorker = new HTTPWorker("https://casenova.uz/api/v1");
  const { body } = await httpWorker.get("/galleries");
  const htmlWorker = new HtmlWorker();
  const container = document.querySelector(".gallery__body--block");

  if (body.data.length > 0) {

    let counter = 1;

    while (counter < 100 && body.data.length) {
      const parentDiv = document.createElement("div");
      parentDiv.className = "gallery__body--block--row";
      if(body.data.length < 8 || counter % 2 === 0){
        htmlWorker.render(parentDiv, `
          <div class="gallery__body--block--row--item">
             <img src={{image}} alt="gallery"/>
          </div>

        `, body.data.slice(0, 2));

        body.data = body.data.slice(3);
      }else {
        for(let i = 1; i <= 4; i++) {
          let childDiv = document.createElement("div");
          childDiv.className = "gallery__body--block--row";
          htmlWorker.render(childDiv, `
            <div class="gallery__body--block--row--img">
                 <img src={{image}} alt="gallery"/>
            </div>
          `, body.data.slice(0, 2));
          body.data = body.data.filter((item, index) => index >= 2)
          parentDiv.append(childDiv)
        }
      }
      container.append(parentDiv);

      counter++
    }

  }
}

(async () => {
  if(!location.pathname.includes("gallery")) return;
  await renderGallery();
})();

