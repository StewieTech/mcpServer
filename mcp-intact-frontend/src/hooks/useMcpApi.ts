import { useState } from 'react';

const useMcpApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    // const MCP_ENDPOINT = 'http://localhost:5001/v1/chat/completions';
    const exampleEndpoint = 'https://your-mcp-server-endpoint.com/api'; // need to replace with actual endpoint from the server we create

    const sendPrompt = async (prompt: string) => {
        setLoading(true);
        setError(null);
        // setResponse(null);
        // setResponse('');


        try {
            const res = await fetch(exampleEndpoint, { // need to replace with actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content ?? 'No response found to return';
            setResponse(data.response);
            return reply;
            // return data.response;
        } catch (err: any) {
            setError(err.message);
            return 'No response found to return';
        } finally {
            setLoading(false);
        }
    };

    return { sendPrompt, loading, error, response };
};

export default useMcpApi;