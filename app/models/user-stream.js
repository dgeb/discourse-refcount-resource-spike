import {
  registerDestructor,
  associateDestroyableChild,
} from '@glimmer/destroyable';

export default class UserStream {
  static listen(callback) {
    const stream = new UserStream(callback);

    return {
      link(parent) {
        associateDestroyableChild(parent, stream);
        return stream;
      },
    };
  }

  static #revision = 0;

  constructor(callback) {
    const interval = setInterval(() => {
      callback(`@johndoe ${UserStream.#revision++}`);
    }, 1000);

    registerDestructor(this, () => {
      clearInterval(interval);
    });
  }
}
