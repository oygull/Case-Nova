import { modalHandler } from "../_functions";
import { HTTPWorker } from "../functions/HTTPWorker";
import { HtmlWorker } from "../functions/htmlWorker";

async function renderEquipments() {
  const httpWorker = new HTTPWorker("https://casenova.uz/api/v1");
  const { body } = await httpWorker.get("/equipment");
  const htmlWorker = new HtmlWorker();
  const parentDiv = document.querySelector(".equipments__block__row");

  if (body.data.length > 0 && parentDiv) {
    const _data = [];

    const options = [
      "fix-card-height",
      "reversed leftradius imgsizecontrol",
      "reversed leftradius",
      "reversed special fix-card-height",
      "rightradiusbottom fix-card-height",
      "reversed short",
      "rightradiustop uniq-size",
      "reversed leftradius",
      "reversed fix-card-height",
      "rightradiusbottom imgsizecontrol2",
    ];

    body.data.forEach((item) => {
      htmlWorker.render(
        parentDiv,
        `
      <div class="equipments__block__card modalBtn ${
        options[Number(item?.renderType) - 1]
      }" data-id="${item?.id}">
        <div class="equipments__block__card--head">
          <p>{{subTitle}}</p>
          <div class="wrap">
            <h2>{{title}}</h2>
          </div>
        </div>
        <div class="equipments__block__card--img">
          <img src="{{image}}" alt="">
        </div>
      </div>
      `,
        item
      );
    });
  }
}

(async () => {
  if(!location.pathname.includes("equipm")) return;
  await renderEquipments();
  modalHandler(".equipments__block .equipments__block__card", 'equipment');
})();
