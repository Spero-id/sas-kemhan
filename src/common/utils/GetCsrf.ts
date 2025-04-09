import { clientEnv } from "@/env/client.environment";

export default async function fetchCsrfToken(){
    const response = await fetch(`${clientEnv.API_BASE_URL}/get-csrf`);
    const data = await response.json();
    return data.csrf_token;
}