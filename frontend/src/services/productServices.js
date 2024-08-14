import apiClient from "../utils/api-client";
export function getProductSuggestionsAPI(search) {
    return apiClient.get(`/products/suggestions?search=${search}`)
}