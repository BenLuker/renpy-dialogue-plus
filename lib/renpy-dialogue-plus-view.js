'use babel';

export default class RenpyDialoguePlusView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('dialogue-count-div');

    // Create title element
    const wordCountTitle = document.createElement('p');
    wordCountTitle.textContent = 'Words';
    wordCountTitle.classList.add('dialogue-count-title');
    this.element.appendChild(wordCountTitle);

    // Create message element
    const wordCountMessage = document.createElement('p');
    wordCountMessage.textContent = '0';
    wordCountMessage.classList.add('dialogue-count-message');
    this.element.appendChild(wordCountMessage);

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setCount(count) {
    const displayText = `${count}`;
    this.element.children[1].textContent = displayText;
  }

}