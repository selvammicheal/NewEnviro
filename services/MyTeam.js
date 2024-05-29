import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID



export const fetchEpic = async (page) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const url = `${BASE_URL}/epic?limit=${100}&page=${page}&project_id=${Project_id}`;
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


export const createEpic = async (epicData) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const response = await axios.post(`${BASE_URL}/epic/create`, epicData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};


export const fetchJobById = async (page, epicId) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const url = `${BASE_URL}/job?limit=${100}&page=${page}&epic_id=${epicId}&reference_id=null`;
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

export const createJobByEpicId = async (jobData) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const response = await axios.post(`${BASE_URL}/job/create`, jobData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};


export const fetchBacklogTableData = async (page) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const url = `${BASE_URL}/job?limit=${100}&page=${page}&project_id=${Project_id}&epic_id=null&reference_id=null`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch Backlog');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Backlog:', error);
        return null;
    }
};


export const fetchKanbanBoardByStatus = async (page, status) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const url = `${BASE_URL}/job?limit=${100}&page=${page}&status=${status}&project_id=${Project_id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch kanban data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching kanban data:', error);
        return null;
    }
};


export const updateJobByJobId = async (jobId, JobData) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const response = await axios.post(`${BASE_URL}/job/edit/${jobId}`, JobData);
        return response.data;
    } catch (error) {
        console.error('Error updateing job by id in Kanban board:', error);
        throw error;
    }
};


export const fetchMilestone = async (page) => {
    try {
        const url = `${BASE_URL}/milestone?limit=${100}&page=${page}`;
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


export const createJobByForm = async (formdata) => {
    try {
        const response = await axios.post(`${BASE_URL}/job/create`, formdata);
        return response.data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};


export const fetchTaskByEpicIdAndProjectId = async (epicId) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const url = `${BASE_URL}/job?limit=${100}&page=${1}&job_type=Task&project_id=${Project_id}&epic_id=${epicId}`;
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


export const fetchChildJob = async (page, rid) => {
    try {
        const url = `${BASE_URL}/job?limit=${100}&page=${page}&reference_id=${rid}`;
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


export const updateJobById = async (jid, formdata) => {
    try {
        const response = await axios.post(`${BASE_URL}/job/edit/${jid}`, formdata);
        return response.data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};






export const fetchFilteredJob = async ({ limit = 10, page = 1, jobType = [], assigneeIds = [], sortOrder, epicId }) => {
    try {
        let url = `${BASE_URL}/job?page=${page}&limit=${limit}&epic_id=${epicId}&reference_id=null`;
        if (jobType.length > 0) {
            const formattedJobTypes = jobType.join(',');
            url += `&job_type=${formattedJobTypes}`;
        }
        if (assigneeIds.length > 0) {
            const formattedAssigneeIds = assigneeIds.join(',');
            url += `&assignee_ids=${formattedAssigneeIds}`;
        }
        if (sortOrder) {
            url += `&sort_by=created_at&sort_order=${sortOrder}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered projects:', error);
        throw error;
    }
};


export const fetchFilteredJobBacklogTable = async ({ limit = 10, page = 1, jobType = [], assigneeIds = [], sortOrder }) => {
    try {
        let url = `${BASE_URL}/job?page=${page}&limit=${limit}&epic_id=null&reference_id=null`;
        if (jobType.length > 0) {
            const formattedJobTypes = jobType.join(',');
            url += `&job_type=${formattedJobTypes}`;
        }
        if (assigneeIds.length > 0) {
            const formattedAssigneeIds = assigneeIds.join(',');
            url += `&assignee_ids=${formattedAssigneeIds}`;
        }
        if (sortOrder) {
            url += `&sort_by=created_at&sort_order=${sortOrder}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered projects:', error);
        throw error;
    }
};


export const fetchEpicBySearch = async (search) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        const url = `${BASE_URL}/epic?limit=${100}&page=${1}&project_id=${Project_id}&title=${search}`;
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


export const fetchEpicByIds = async (EpicIds = []) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        let url = `${BASE_URL}/epic?limit=${100}&page=${1}&project_id=${Project_id}`;
        if (EpicIds.length > 0) {
            const formattedJobTypes = EpicIds.join(',');
            url += `&epic_ids=${formattedJobTypes}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return null;
    }
};

export const fetchAdvancedFilteredJob = async ({ limit = 10, page = 1, filterTypeComp, ownerIds = [], filterStatus, filterendDate, filterstartDate, EpicId }) => {
    try {
        let url = `${BASE_URL}/job?page=${page}&limit=${limit}&epic_id=${EpicId}&reference_id=null`;
        if (filterTypeComp) {
            url += `&job_type=${filterTypeComp}`;
        }
        if (ownerIds.length > 0) {
            const formattedAssigneeIds = ownerIds.join(',');
            url += `&assignee_ids=${formattedAssigneeIds}`;
        }
        if (filterStatus) {
            url += `&status=${filterStatus}`;
        }
        if (filterendDate) {
            url += `&before_due_date=${filterendDate}`;
        }
        if (filterstartDate) {
            url += `&after_due_date=${filterstartDate}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered projects:', error);
        throw error;
    }
};


export const fetchAdvancedFilteredJobForBacklog = async ({ limit = 10, page = 1, filterTypeComp, ownerIds = [], filterStatus, filterendDate, filterstartDate }) => {
    try {
        let url = `${BASE_URL}/job?page=${page}&limit=${limit}&epic_id=null&reference_id=null`;
        if (filterTypeComp) {
            url += `&job_type=${filterTypeComp}`;
        }
        if (ownerIds.length > 0) {
            const formattedAssigneeIds = ownerIds.join(',');
            url += `&assignee_ids=${formattedAssigneeIds}`;
        }
        if (filterStatus) {
            url += `&status=${filterStatus}`;
        }
        if (filterendDate) {
            url += `&before_due_date=${filterendDate}`;
        }
        if (filterstartDate) {
            url += `&after_due_date=${filterstartDate}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered projects:', error);
        throw error;
    }
};


export const fetchKanbanBoardLocalFilter = async (page, status, EpicIds = [], jobTypes = []) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        let url = `${BASE_URL}/job?limit=${100}&page=${page}&status=${status}&project_id=${Project_id}`;
        if (EpicIds.length > 0) {
            const formattedJobTypes = EpicIds.join(',');
            url += `&epic_ids=${formattedJobTypes}`;
        }
        if (jobTypes.length > 0) {
            const formattedJobTypes = jobTypes.join(',');
            url += `&job_type=${formattedJobTypes}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch kanban data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching kanban data:', error);
        return null;
    }
};

export const fetchKanbanBoardAdvanceFilter = async (page, status,filterTypeComp, ownerIds = [], filterStatus, filterendDate, filterstartDate ) => {
    const Project_id = (localStorage.getItem("projectId"))
    try {
        let url = `${BASE_URL}/job?limit=${100}&page=${page}&status=${status}&project_id=${Project_id}`;
        if (filterTypeComp) {
            url += `&job_type=${filterTypeComp}`;
        }
        if (ownerIds.length > 0) {
            const formattedAssigneeIds = ownerIds.join(',');
            url += `&assignee_ids=${formattedAssigneeIds}`;
        }
        if (filterStatus) {
            url += `&status=${filterStatus}`;
        }
        if (filterendDate) {
            url += `&before_due_date=${filterendDate}`;
        }
        if (filterstartDate) {
            url += `&after_due_date=${filterstartDate}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch kanban data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching kanban data:', error);
        return null;
    }
};