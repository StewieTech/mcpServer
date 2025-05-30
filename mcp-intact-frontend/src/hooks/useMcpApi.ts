import { useState } from 'react';

const useMcpApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    // const MCP_ENDPOINT = 'http://localhost:5001/v1/chat/completions';
    const sessionId = "123412312" ;
    const exampleEndpoint = 'https://your-mcp-server-endpoint.com/api'; // need to replace with actual endpoint from the server we create
    const webhoohookEndpoint = 'https://sghaz.app.n8n.cloud/webhook/893e08d6-6f8e-4ef8-ba19-c38a2c03c820'; // need to replace with actual webhook endpoint
    const authToken = 'Bearer ta-mina-gLPKEC5l3Lp0bLlhRQnAZkKVhWfdb4n2uVS5-gPH03gaG3Z0903cXicTla1HCVl51oVZ0ReosET3BlbkFJlVjp5Rg55I1NAiE7Ij3-xszm1ABUl8W7L2sTHiMI9S5FGvPcFyzwUeElszTzMrfaPYQD04no0A'

    const sendPrompt = async (prompt: string) => {
        setLoading(true);
        setError(null);
        // setResponse(null);
        // setResponse('');


        try {
            const requestBody = {
                sessionId: sessionId,
                chatInput: prompt
            };

            console.log('Sending request to MCP API:', JSON.stringify(requestBody));

            const res = await fetch(webhoohookEndpoint, { // need to replace with actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken,
                },
                body: JSON.stringify(requestBody),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            // console.log('Response from MCP API:', data);
            console.log('Response from MCP API:', JSON.stringify(data, null, 2));
            // console.log('data.output is: ', data.output);
            console.log('data[0].output is ', data[0].output);
            // console.log('data[0] ', data[0]);

            // const reply = data.output ?? data.response ?? data.choices?.[0]?.message?.content ?? data.message ?? 'No response found to return';
            // const reply = data.output;
            const reply = Array.isArray(data) && data[0]?.output ? data[0].output : 'No response found to returned here';
            setResponse(reply);
            return reply;
            // return data.response;
        } catch (err: any) {
            setError('catching network error manual text ' + err.message);
            return 'No response found to be returned';
        } finally {
            setLoading(false);
        }
    };

    return { sendPrompt, loading, error, response };
};

export default useMcpApi;