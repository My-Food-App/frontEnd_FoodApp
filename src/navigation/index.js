import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, ChangePassword, Register, ConfirmAccount, ForgotPassword,Home,OrderDetail,
    Tabs,Account,DetailStore,DetailItem,MyStoreInfomation,CreateProduct,Order,Cart,MyOrder,FavoriteStore } from '../screens';
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
                <Stack.Screen name="CreateProduct" component={CreateProduct} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="MyOrder" component={MyOrder} />
                <Stack.Screen name="FavoriteStore" component={FavoriteStore} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}