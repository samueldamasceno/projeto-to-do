import { Store } from "react-notifications-component";

export const usuarioLogado = async (csrfToken) => {
    try {
        const response = await fetch('http://localhost:8000/api/usuarios/logado/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-CSRFToken': csrfToken
            }
        });

        if (!response.ok) {
            throw new Error('Não foi possível verificar se o usuário está logado.');
        }

        const usuarioLogado = await response.json();
        return usuarioLogado.logado;
    } catch (error) {
        console.error('Erro ao verificar se o usuário está logado:', error.message);

        Store.addNotification({
            title: 'Erro ao verificar se o usuário está logado',
            message: error.message,
            type: 'danger',
            container: 'top-right',
            dismiss: { duration: 5000 },
        });

        return false;
    }
}

export const logout = async (csrfToken) => {
    try {
        const response = await fetch('http://localhost:8000/api/usuarios/logout/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRFToken': csrfToken
            }
        });

        if (!response.ok) {
            throw new Error('Não foi possível fazer logout.');
        }

        Store.addNotification({
            title: 'Sessão encerrada',
            message: 'Você foi desconectado com sucesso.',
            type: 'success',
            container: 'top-right',
            dismiss: { duration: 3000 },
        });

        console.log('Logout efetuado com sucesso!');
    } catch (error) {
        console.error('Erro ao fazer logout:', error.message);

        Store.addNotification({
            title: 'Erro ao fazer logout',
            message: error.message,
            type: 'danger',
            container: 'top-right',
            dismiss: { duration: 5000 },
        });
    }
}
