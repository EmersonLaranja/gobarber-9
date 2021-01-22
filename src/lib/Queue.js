import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail]; // getting all the jobs in our app

class Queue {
  constructor() {
    // each background job has its own queue
    this.queues = {}; // store the jobs

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // queue with redis connection
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle, // process our jobs to do their owns tasks
      };
    });
  }

  add(queue, job) {
    // add new jobs in the queue to be processed
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle); // fail before our process allow us to keep listening failures
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}
export default new Queue();
