import {HtmlWorker} from '../functions/htmlWorker';
import {HTTPWorker} from '../functions/HTTPWorker';
import {modalHandler} from "../_functions";

async function renderBlogs () {
  const httpWorker = new HTTPWorker( "https://casenova.uz/api/v1");
  const blogs = await httpWorker.get("/blog");
  const testElem = document.querySelector(".blog__body--block");
  const htmlWorker = new HtmlWorker();

  const {body : {data}} = blogs;
  if(data?.length) {

    let _data = data.map(item => {
      const date = new Date(item.updatedAt).toLocaleDateString("ru-Ru", {
        day: 'numeric', month: 'long' , year: 'numeric'
      });
      const content = item?.translations?.find(item => item.locale === "ru");

      return {
        ...item,
        date: date.substring(0, date.length - 2).toUpperCase(),
      }
    });

    let counter = 1;

    console.log(_data)
    while (counter < 100 && _data.length) {
      const parentDiv = document.createElement("div");
      parentDiv.className = "blog__body--block--row";

      if(_data.length < 4 || counter % 2 === 0){
        console.log(true)
        htmlWorker.render(parentDiv, `
          <div class="blog__body--block--row--img modal-article modalBtn" data-id="{{id}}">
            <p>{{date}}</p>
            <h3>{{title}}</h3>
          </div>
        `, _data.slice(0, 3));

        _data = _data.slice(3);
      }else {
        for(let i = 1; i <= 2; i++) {
          let childDiv = document.createElement("div");
          childDiv.className = "blog__body--block--row--item";
          htmlWorker.render(childDiv, `
            <div class="blog__body--block--row--item--article modal-article modalBtn" data-id="{{id}}">
              <p>{{date}}</p>
              <h3>{{title}}</h3>
            </div>
          `, _data.slice(0, 2));
          _data = _data.filter((item, index) => index >= 2)
          parentDiv.append(childDiv)
        }
      }

      testElem.append(parentDiv);

      counter++
    }
  }
}

(async () => {
  if(!location.pathname.includes("blog")) return;
  await renderBlogs();
  modalHandler('.modal-article', 'blog');

  // document.querySelector('#changeLang').addEventListener('click', () => {
  //   Translate.changeLang(Translate.lang === 'ru' ? 'en' : 'ru')
  // })
})()
