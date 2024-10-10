const modalSelector = document.querySelector('.modal_bg');

export class ModalManage {
  modal;
  constructor() {
    this.modal = modalSelector;
    const closeModalBtn = document.querySelector('.modal_btn');
    if(closeModalBtn){
      closeModalBtn.addEventListener('click', e => this.hideModal());
    }
  }
  showModal(blockSelector){
    document.body.classList.add('noscroll')
    try {
      this.modal.classList.add('openModal');
      this.modal.querySelector('.modal_main .modal_body').innerHTML = blockSelector.innerHTML;
    } catch(e){

    }

  }

  hideModal(){
    document.body.classList.remove('noscroll')
    this.modal.classList.remove('openModal');
    this.modal.querySelector('.modal_main .modal_body').innerHTML = '';
  }
}
