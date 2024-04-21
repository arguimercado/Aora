import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({title, handlerPress,containerStyles,textStyles,isLoading}) => {
   return (
      <TouchableOpacity
         onPress={handlerPress}
         activeOpacity={0.7}

         className={`bg-secondary rounded-xl min-h-[62px] 
         justify-center items-center 
         ${containerStyles} 
         ${isLoading ? 'opacity-50': ''}`}
         disabled={isLoading}
      >
         <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      </TouchableOpacity>
   );
};

export default CustomButton;
