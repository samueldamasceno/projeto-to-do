import { useState, useContext, createContext, useEffect } from "react";

const TemaContext = createContext()

function TemaProvider({ children }) {
    const [tema, setTema] = useState(() => {
        const temaSalvo = localStorage.getItem('theme');
        return temaSalvo === 'dark' ? true : false;
    });

    useEffect(() => {
        localStorage.setItem('theme', tema ? 'dark' : 'light');
        document.body.className = tema ? 'dark-theme' : 'light-theme';
    }, [tema]);

    const mudarTema = () => {
        setTema(prevTema => !prevTema);
    }

    return (
        <TemaContext.Provider value={{ tema, mudarTema }}>
            {children}
        </TemaContext.Provider>
    )
};

const useTema = () => useContext(TemaContext);

export { TemaProvider, useTema };