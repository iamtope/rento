import { queue } from '.';

// Queue Events -- Listen to the events produced by the workers

// Fires when a job's progress was updated
queue.on('global:progress', (jobId, progress) => {
  if (logger) {
    logger.info(
      `job with id ${jobId} is in progress! Progress: ${progress % 100}%`
    );
  }
});

// Fires whenever a job is completed successfully with a result
queue.on('global:completed', (jobId, result) => {
  if (logger) {
    logger.info(
      `job with id ${jobId} has been completed! Result: ${result}`
    );
  }
});

// Fires whenever a job fails with an error
queue.on('global:failed', (jobId, err) => {
  if (logger) {
    logger.info(
      `job with id ${jobId} failed! Error: ${err}`
    );
  }
});

// Fires whenever the queue is paused
queue.on('global:paused', () => {
  if (logger) {
    logger.info(
      'The queue has been paused'
    );
  }
});

// Fires whenever the queue is resumed
queue.on('global:resumed', () => {
  if (logger) {
    logger.info(
      'The queue has been resumed'
    );
  }
});

// fires when a job has been marked as stalled
queue.on('global:stalled', (jobId) => {
  if (logger) {
    logger.info(
      `job with id ${jobId} has been stalled`
    );
  }
});
