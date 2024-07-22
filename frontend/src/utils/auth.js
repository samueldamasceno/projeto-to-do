export const usuarioLogado = () => {
    if (localStorage.getItem('logado') === true || "true") {
        return true;
    }
}

export const logarUsuario = (valor) => {
    localStorage.setItem('logado', JSON.stringify(valor));
}

export const logout = () => {
    localStorage.removeItem('logado');
}