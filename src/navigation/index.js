import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, ChangePassword, Register, ConfirmAccount, ForgotPassword,Home,Tabs,Account,DetailStore,DetailItem,MyStoreInfomation } from '../screens';
const Stack = createNativeStackNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, contentStyle: { backgroundColor:'#FFFFFF'} }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="DetailStore" component={DetailStore} />
                <Stack.Screen name="DetailItem" component={DetailItem} />
                <Stack.Screen name="MyStoreInfomation" component={MyStoreInfomation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}