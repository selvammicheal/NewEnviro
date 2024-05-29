import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const fetchProjects = async (page) => {
    try {
      const url = `${BASE_URL}/project?limit=${10}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  };

  export const fetchProjectsBySerach = async (page,searchValue) => {
    try {
      const url = `${BASE_URL}/project?limit=${10}&page=${page}&search=${searchValue}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  };

  export const fetchProjectsSortBy = async (page,sort_order,sort_by) => {
    try {
      const url = `${BASE_URL}/project?limit=${10}&page=${page}&sort_order=${sort_order}&sort_by=${sort_by}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  };


  export const createProject = async (projectData) => {
    try {
      const response = await axios.post(`${BASE_URL}/project/create`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error; 
    }
  };


  
  export const fetchProjectsForFilter = async (page) => {
    try {
      const url = `${BASE_URL}/project?limit=${100}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  };

  export const fetchFilteredProjects = async ({ limit = 10, page = 1, startDate, ownerIds = [], statusState , projectIds = [] }) => {
    try {
      // Construct the base URL
      let url = `${BASE_URL}/project?limit=${limit}&page=${page}`;
  
      // Append filter parameters only if they are present in the state
      if (startDate) {
        url += `&start_date=${startDate}`;
      }
      if (ownerIds.length > 0) {
        url += `&created_by_ids=${ownerIds.join(',')}`;
      }
      if (statusState) {
        url += `&is_active=${statusState}`;
      }
      if (projectIds.length > 0) {
        url += `&project_ids=${projectIds.join(',')}`;
      }
  
      // Send the request to the API
      const response = await axios.get(url);
  
      // Handle the response and return the data
      return response.data;
    } catch (error) {
      // Handle errors, e.g., logging or throwing
      console.error('Error fetching filtered projects:', error);
      throw error;
    }
  };