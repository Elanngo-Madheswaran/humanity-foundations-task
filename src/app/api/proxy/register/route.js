// app/api/proxy/register/route.js
import axios from 'axios';

export async function POST(request) {
    try {
        const body = await request.json();

        const response = await axios.post('http://34.10.166.233/auth/register', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return new Response(JSON.stringify(response.data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            error: error.response?.data?.message || "Internal server error"
        }), {
            status: error.response?.status || 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
