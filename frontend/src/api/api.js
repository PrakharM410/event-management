const API_BASE_URL = 'http://localhost:5000/api';

export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  return response.json();
};

export const getEventDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  return response.json();
};

export const createOrder = async (price) => {
  const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price }),
  });
  const data = await response.json();
  return data.id;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data.token;
};

export const registerUser = async (name, email, password) => {
  await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
};
