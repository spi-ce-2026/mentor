import EmptyState from "../components/EmptyState";

export default function AwaitingApprovalScreen() {
	return (
		<EmptyState
			icon="⏳"
			title="Perfil em análise"
			message="Aqui o mentor acompanha a aprovação do perfil pelo administrador, inclusive quando ele for reprovado."
		/>
	);
}
