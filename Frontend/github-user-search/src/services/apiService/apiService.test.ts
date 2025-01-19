import { apiService } from "./apiService";

global.fetch = jest.fn();

describe("apiService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch request and return JSON response", async () => {
        const mockData = { id: 1, name: "Test" };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        const response = await apiService("/test");

        expect(fetch).toHaveBeenCalledWith("https://api.github.com/test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        expect(response).toEqual(mockData);
    });
});
