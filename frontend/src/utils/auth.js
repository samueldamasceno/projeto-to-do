export const usuarioLogado = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/usuarios/logado/', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Não foi possível verificar se o usuário está logado.');
        }

        const usuarioLogado = await response.json();
        return usuarioLogado.logado;
    } catch (error) {
        console.error('Erro ao verificar se o usuário está logado:', error.message);
        return false;
    }
}

export const logout = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/usuarios/logout/', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Não foi possível fazer logout.');
        }

        console.log('Logout efetuado com sucesso!');
    } catch (error) {
        console.error('Erro ao fazer logout:', error.message);
    }
}