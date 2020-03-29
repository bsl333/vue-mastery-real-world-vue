import axios from 'axios';

const baseURL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
  withCredentials: false
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  }
};
