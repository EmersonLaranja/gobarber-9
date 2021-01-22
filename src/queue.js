// We need to do this way 'cause we wont execute the app in the same executation that our queue. So, the queue wont concerns our app performance
import Queue from './lib/Queue';

Queue.processQueue();
