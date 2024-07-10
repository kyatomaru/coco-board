export const useDeleteTask = (taskId) => {
    if (taskId) {
        const getParams = { taskId: taskId };
        const query = new URLSearchParams(getParams);

        return fetch(`/api/task/?${query}`, {
            method: 'DELETE'
        })
    }
}