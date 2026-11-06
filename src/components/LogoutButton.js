import { IconButton, useTheme } from "react-native-paper";
import { useAuth } from "@mentorias/auth";

export default function LogoutButton() {
	const theme = useTheme();
	const { logout } = useAuth();

	return <IconButton icon="logout" iconColor={theme.colors.onPrimary} onPress={logout} accessibilityLabel="Sair" />;
}
