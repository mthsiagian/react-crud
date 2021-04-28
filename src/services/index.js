  
import base from './baseHttp';

export const getContact = async (id) => {
  const response = await base.get(`contact/${id}`)
  return response.data
}

export const getContacts = async () => {
  const response = await base.get('contact')
  return response.data
}

export const deleteUser = async (id) => {
  const response = await base.delete(`contact/${id}`)
  return response.data
}

export const postUser = async (body) => {
  const response = await base.post('contact', body)
  return response.data
}

export const patchUser = async (id, body) => {
  const response = await base.put(`contact/${id}`, body)
  return response.data
}