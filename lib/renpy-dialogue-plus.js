'use babel';

import RenpyDialoguePlusView from './renpy-dialogue-plus-view';
import {
  CompositeDisposable
} from 'atom';

export default {

  renpyDialoguePlusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.renpyDialoguePlusView = new RenpyDialoguePlusView(state.renpyDialoguePlusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.renpyDialoguePlusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'renpy-dialogue-plus:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.renpyDialoguePlusView.destroy();
  },

  serialize() {
    return {
      renpyDialoguePlusViewState: this.renpyDialoguePlusView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      if (atom.workspace.getActiveTextEditor()) {
        const editor = atom.workspace.getActiveTextEditor();
        const words = editor.getText();
        const wordsArray = words.split("\"");
        if (wordsArray.length > 1) {
          const dialogueArray = [];
          for (var i = 1; i < wordsArray.length; i += 2) {
            wordsArray[i] = " " + wordsArray[i];
            dialogueArray.push(wordsArray[i]);
          }
          const dialogueString = dialogueArray.join('');
          const dialogueCount = dialogueString.split(/\s+/).length - 1;
          console.log("All Dialogue: " + dialogueString);
          this.renpyDialoguePlusView.setCount(dialogueCount);
          this.modalPanel.show();
        } else {
          atom.notifications.addError("No extractable dialogue on this page")
        }
      } else {
        atom.notifications.addError("No text on this page to extract")
      }
    }
  }

};