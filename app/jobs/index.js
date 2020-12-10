import Bull from 'bull';
import config from '../../config/env';
import jobProcess from './job.process';

const { REDIS_URL } = config;

// Inititiating Bull
export const queue = REDIS_URL ? new Bull('type', REDIS_URL) : new Bull('type');

jobProcess(queue);

/**
 * An implementation of instant and recurring job creators
 * @class Job
 */
class Job {
  /**
   * Creates a new job instance and saves it to the job queue
   * @static
   * @memberof Job
   * @param { Object } options - An options object for configuring the job
   * @param { String } options.type - The type of the job.
   * @param { Object } options.data - The job payload also containing its title.
   * @param { Number } options.attempts - The number of attempts, the default is 5.
   * @returns { Object } - A Job instance.
   */
  static create(options) {
    const opts = {
      attempts: 5,
      removeOnComplete: true,
      backoff: {
        type: 'exponential',
        delay: 60000
      },
      ...options
    };
    return queue.add(opts.type, opts.data);
  }
}

export default Job;
