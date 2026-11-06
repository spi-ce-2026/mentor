// Situação do perfil de mentor do usuário logado: null (sem perfil), "PENDING", "REJECTED" ou "APPROVED".
// Valor fixo até a implementação: ler GET /profiles/mentor/{user.id}, em que a resposta 404 significa "sem perfil".
export function useMentorProfile() {
	return { loading: false, status: null };
}
