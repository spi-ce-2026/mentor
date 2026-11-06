import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useAuth } from "@mentorias/auth";

import LoadingSpinner from "../components/LoadingSpinner";
import LogoutButton from "../components/LogoutButton";
import { useMentorProfile } from "../hooks/useMentorProfile";
import AccountScreen from "../screens/AccountScreen";
import AwaitingApprovalScreen from "../screens/AwaitingApprovalScreen";
import LoginScreen from "../screens/LoginScreen";
import MentorshipsScreen from "../screens/MentorshipsScreen";
import ProfileRegistrationScreen from "../screens/ProfileRegistrationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ name, color, size }) {
	return <MaterialCommunityIcons name={name} color={color} size={size} />;
}

function useHeaderOptions() {
	const theme = useTheme();
	return {
		headerStyle: { backgroundColor: theme.colors.primary },
		headerTintColor: theme.colors.onPrimary,
	};
}

function MentorTabs() {
	const theme = useTheme();
	const headerOptions = useHeaderOptions();

	return (
		<Tab.Navigator screenOptions={{ ...headerOptions, tabBarActiveTintColor: theme.colors.primary }}>
			<Tab.Screen
				name="Mentorias"
				component={MentorshipsScreen}
				options={{
					tabBarIcon: ({ color, size }) => <TabIcon name="calendar-check" color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="Conta"
				component={AccountScreen}
				options={{
					tabBarIcon: ({ color, size }) => <TabIcon name="account-circle" color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
}

// A área do mentor só abre com o perfil aprovado; antes disso, o app mostra o cadastro ou a espera pela aprovação.
export default function RootNavigator() {
	const { isAuthenticated } = useAuth();
	const { loading, status } = useMentorProfile();
	const headerOptions = useHeaderOptions();
	const preApprovalOptions = { ...headerOptions, headerShown: true, headerRight: () => <LogoutButton /> };

	if (isAuthenticated && loading) {
		return <LoadingSpinner message="Carregando o perfil..." />;
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!isAuthenticated ? (
				<Stack.Screen name="Login" component={LoginScreen} />
			) : status === "APPROVED" ? (
				<Stack.Screen name="Main" component={MentorTabs} />
			) : status === "PENDING" || status === "REJECTED" ? (
				<Stack.Screen
					name="AguardandoAprovacao"
					component={AwaitingApprovalScreen}
					options={{ ...preApprovalOptions, title: "Aprovação do perfil" }}
				/>
			) : (
				<Stack.Screen
					name="CadastroPerfil"
					component={ProfileRegistrationScreen}
					options={{ ...preApprovalOptions, title: "Cadastro de mentor" }}
				/>
			)}
		</Stack.Navigator>
	);
}
