<script setup>
  import { ref, computed} from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import CustomButton from '@/components/CustomButton.vue';
  import CustomInput from '@/components/CustomInput.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';

  const router = useRouter();
  const route = useRoute();

  const phoneNumber = ref(route.params.phoneNumber || '');

  const verificationCode = ref('');

  const isCodeComplete = computed(() => {
    return verificationCode.value.length === 4;
  });

  const onCodeComplete = (code) => {
    verificationCode.value = code;
    verifyCode();
  };

  const verifyCode = () => {
    if (isCodeComplete.value) {
      router.push({
        name: 'password',
        params: { phoneNumber: phoneNumber.value }
      });
    }
  };

  const goBack = () => {
    router.go(-1);
  };
</script>

<template>
  <div class="w-[90%] m-auto">
    <HeaderComponent 
        title="Verify your mobile number"
        :showBackButton="true"
        @goBack="goBack"
    />
    
    <div class="md:max-w-[400px] m-auto">
      <CustomInput 
        type="code" 
        :label="`Please enter the code we sent to ${phoneNumber}`" 
        v-model="verificationCode" 
        :codeLength="4"
        @codeComplete="onCodeComplete"
      />
  
      
      <div class="flex flex-col gap-3 mt-40">
        <CustomButton 
          title="Continue" 
          :bgColor="isCodeComplete ? '#000000' : '#747579'"
          textColor="#ffffff"
          @click="verifyCode"
          :disabled="!isCodeComplete"
        />
        
        <CustomButton 
          title="Resend verification code" 
          bgColor="transparent"
          textColor="#aeaeae"
          class="border-2 border-gray-300"
        />
      </div>
    </div>
  </div>
</template>
