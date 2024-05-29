import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchPeopleList = async (search) => {
  //   console.log(search);
  //   if (!search === "") {
  try {
    const url = `${BASE_URL}/People/get/employee?search=${search}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch peoples");
    }
    const data = await response.json();
    return data;
    // console.log(data.data);
  } catch (error) {
    console.error("Error fetching people", error);
    return null;
  }
  //   }
};
export const fetchPeople = async () => {
  try {
    const url = `${BASE_URL}/People?page=1&limit=5`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch peoples");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching people", error);
    return null;
  }
};

export const fetchPeopleBySearch = async (search) => {
  try {
    const url = `${BASE_URL}/People?page=1&limit=5&search=${search}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch peoples");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching people", error);
    return null;
  }
};

export const createPeople = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/People/create`, formData);
    return response;
  } catch (error) {
    console.error("Error fetching people", error);
    return null;
  }
};

export const deletePeople = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/People/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete peoples");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting people", error);
    return null;
  }
};

export const updatePeople = async (id, role) => {
  if (!(id && role)) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/People/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role }),
    });
    if (!response.ok) {
      throw new Error("Unable to update the data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unable to update the data", err);
  }
};
