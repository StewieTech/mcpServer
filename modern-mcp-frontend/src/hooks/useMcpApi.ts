import { useState } from 'react';

const useMcpApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    const sendPrompt = async (prompt: string) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch('https://your-mcp-server-endpoint.com/api', {
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
            setResponse(data.response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendPrompt, loading, error, response };
};

export default useMcpApi;