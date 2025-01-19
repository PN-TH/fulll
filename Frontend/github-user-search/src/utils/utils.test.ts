import { sliceText, pluralizeText } from "./utils";

describe("Utils function", () => {
    // sliceText()
    it("should return the original text", () => {
        expect(sliceText("react", 8)).toBe("react");
    });
    it("should return the sliced text", () => {
        expect(sliceText("angular", 5)).toBe("angul...");
    });

    // pluralizeText()
    it("should return the singular of the text", () => {
        expect(pluralizeText(1, "user")).toBe("user");
    });
    it("should return the plural of the text", () => {
        expect(pluralizeText(5, "user")).toBe("users");
    });
});
