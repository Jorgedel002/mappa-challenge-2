<script setup>
    import { ref, computed } from 'vue';
    import CustomInput from '@/components/CustomInput.vue';
    import CustomButton from '@/components/CustomButton.vue';
    import OrSeparatorComponent from '@/components/OrSeparatorComponent.vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const countryCode = ref("+972");
    const phoneNumber = ref("");
    const isFormValid = computed(() => countryCode.value.length > 1 && phoneNumber.value.length > 5);
    
    const handleSignUp = () => {
        if (isFormValid.value) {
            router.push({
                name: 'verify',
                params: { phoneNumber: `${countryCode.value}${phoneNumber.value}` }
            });
        }
    };

    const handleCountryCodeChange = (value) => {
        countryCode.value = value;
    };

    const handlePhoneNumberChange = (value) => {
        phoneNumber.value = value;
    };

    const appleIcon = ['fab', 'apple'];
    const googleIcon = ['fab', 'google'];
    const facebookIcon = ['fab', 'facebook-f'];
    const emailIcon = ['fas', 'envelope'];
</script>

<template>
    <div class="w-[90%] m-auto">
        <HeaderComponent title="Sign up" />
        <form action="" method="post" class=" flex flex-col items-center" @submit.prevent="handleSignUp">
            <div class="max-w-[400px]">
                <div>
                    <CustomInput 
                        label="Enter your phone number" 
                        type="phone" 
                        @countryCodeChange="handleCountryCodeChange"
                        @phoneNumberChange="handlePhoneNumberChange"
                    />
                    
                    <CustomButton 
                        title="Sign up" 
                        :bgColor="isFormValid ? '#000000' : '#747579'" 
                        textColor="#ffffff"
                        class="mt-6"
                        @click="handleSignUp"
                        :disabled="!isFormValid"
                        :isClickable="isFormValid"
                    />
                </div>
                
                <OrSeparatorComponent/>
                
                <div class="flex flex-col gap-3">
                    <CustomButton 
                        title="Sign up with Apple" 
                        bgColor="#abacae" 
                        :icon="appleIcon"
                        :iconSize="'lg'"
                        :mdIconSize="'xl'"
                        textColor="#000000"
                    />
                    <CustomButton 
                        title="Sign up with Google" 
                        bgColor="#abacae" 
                        :icon="googleIcon"
                        :iconSize="'lg'"
                        :mdIconSize="'xl'"
                        textColor="#000000"
                    />
                    <CustomButton 
                        title="Sign up with Facebook" 
                        bgColor="#abacae" 
                        :icon="facebookIcon"
                        :iconSize="'lg'"
                        :mdIconSize="'xl'"
                        textColor="#000000"
                    />
                    <CustomButton 
                        title="Sign up with Email" 
                        bgColor="#abacae" 
                        :icon="emailIcon"
                        :iconSize="'lg'"
                        :mdIconSize="'xl'"
                        textColor="#000000"
                    />
                </div>
        
                <p class="text-gray-500 text-sm mt-6 md:mt-10 text-center">
                    By continuing, you are agree to the Dishie's
                    <a href="#" class="text-gray-600 font-medium underline">Terms & Conditions</a> and 
                    <a href="#" class="text-gray-600 font-medium underline">Privacy policy</a>.
                </p>
        
                <p class="text-gray-500 text-sm mt-12 text-center">
                    Already a user? <a href="#" class="text-gray-600 font-medium underline text-base">Log in</a>
                </p>
        
                <p class="text-gray-500 text-sm mt-2 text-center">
                    Not ready to sign up? <a href="#" class="text-gray-600 font-medium underline text-base">Guest mode</a>
                </p>
            </div>
        </form>
    </div>
</template>