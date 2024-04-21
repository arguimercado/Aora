import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from "../../constants";
import { FormField,CustomButton } from '../../components';
import { Link } from 'expo-router';

const SignIn = () => {

	const [form,setForm] = useState({
		email: "",
		password: ""
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = () => {

	}


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[82vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[150px] h-[35px]"/>
          <Text className="text-2xl text-white py-2  font-psemibold">Sign in to Aora</Text>
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
			 	title="Sign-In"
				handlerPress={handleSubmit}
				containerStyles="mt-7 w-full"
				isLoading={isSubmitting}
			 />
			 <View className="justify-center pt-5 flex-row gap-2">
				<Text className="text-lg text-gray-100">
					Don't have an Account?
				</Text>
				<Link href="/sign-up" className='text-lg font-psemibold text-secondary-100'>Sign up</Link>
			 </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})