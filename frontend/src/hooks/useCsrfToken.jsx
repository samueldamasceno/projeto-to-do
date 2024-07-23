import { useState, useEffect } from 'react';

const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://localhost:8000/csrf-token/', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar o token CSRF');
                }

                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    return csrfToken;
};

export default useCsrfToken;
