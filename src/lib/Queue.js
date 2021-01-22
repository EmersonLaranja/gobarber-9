import Bee from 'bee-queue';

class Queue {
  constructor() {
    // each background job has its own queue
    this.queues = {};

    this.init();
  }

  init() {}
}
export default new Queue();
