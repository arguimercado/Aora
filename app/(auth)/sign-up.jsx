import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from "../../constants";
import { FormField,CustomButton } from '../../components';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite/appwrite';

const SignUp = () => {

	const [form,setForm] = useState({
    	username: "",
		email: "",
		password: ""
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if(!form.email || !form.username || !form.password) {
			Alert.alert('Error','Please fill in all the fields');
			return;
		}
		setIsSubmitting(true);
		try {
			const result = await createUser(form.username, form.email,form.password);
			
			//set global state
			router.replace('/home');
		}
		catch(error) {
			Alert.alert(error);
		}finally {
			setIsSubmitting(false);
		}
	}


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[82vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[150px] h-[35px]"/>
          <Text className="text-2xl text-white py-2  font-psemibold">Sign up to Aora</Text>

          <FormField 
            title="Username"
				value={form.username}
				placeholder="Enter Username..."
				handleChangeText={(e) => setForm({...form, username: e})}
				otherStyles="mt-10 w-full"
				
          />
          <FormField 
            title="Email"
				value={form.email}
				placeholder="Enter Email..."
				handleChangeText={(e) => setForm({...form, email: e})}
				otherStyles="mt-7 w-full"
				keyboardType="email-address"
          />
			   <FormField 
            title="Password"
				value={form.password}
				placeholder="Enter Password..."
				handleChangeText={(e) => setForm({...form, password: e})}
				otherStyles="mt-7 w-full"
				
          />
			 <CustomButton 
			 	title="Sign Up"
				handlerPress={() => handleSubmit()}
				containerStyles="mt-7 w-full"
				isLoading={isSubmitting}
			 />
			 <View className="justify-center pt-5 flex-row gap-2">
				<Text className="text-lg text-gray-100">
					Already have an account?
				</Text>
				<Link href="/sign-in" className='text-lg font-psemibold text-secondary-100'>Sign In</Link>
			 </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

