const BASE_URL = 'https://api.github.com'; // Normally this would be an environment variable

interface RequestOptions {
    method?: string;
    headers?: Headers
};

// This function do a fetch request to the given endpoint and return the response
export const apiService = async (endpoint: string, options: RequestOptions = {}) => {
    const { method = 'GET', headers = {} } = options;
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
