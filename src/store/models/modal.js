import { types } from 'mobx-state-tree';

const Modal = types.model("Modal", {
  show: types.optional(types.boolean, false),
  title: types.maybe(types.string),
  locked: false
}).actions(self => ({
  showModal(body, title, locked) {
    self.body = body;
    self.title = title;
    self.show = true;
    self.locked = locked || false;
  },
  closeModal() {
    self.show = false;
    self.body = null;
    self.title = null;
    self.locked = false;
  }
}))

export default Modal