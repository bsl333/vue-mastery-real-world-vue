import axios from 'axios';

const baseURL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 5000
});

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events`, {
      params: {
        _limit: perPage,
        _page: page
      }
    });
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
  createEvent(event) {
    return apiClient.post(`/events`, event);
  }
};
