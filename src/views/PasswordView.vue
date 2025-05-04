<script setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import CustomInput from '@/components/CustomInput.vue';
  import CustomButton from '@/components/CustomButton.vue';

  const router = useRouter();
  const route = useRoute();

  const password = ref('');

  // Validación de contraseña
  const hasMinLength = computed(() => password.value.length >= 8);
  const hasNumber = computed(() => /\d/.test(password.value));
  const hasSpecialChar = computed(() => /[!@#$%^&*()_+\-=\[\]{};':\"\\\/|,.<>\/?]/.test(password.value));
  const isPasswordValid = computed(() => hasMinLength.value && hasNumber.value && hasSpecialChar.value);

  const goBack = () => {
    router.go(-1);
  };
</script>

<template>
  <div class="w-[90%] m-auto">
    <HeaderComponent 
      title="Add your password"
      :showBackButton="true"
      @goBack="goBack"
    />
    
    <div class="md:max-w-[400px] m-auto">
      <CustomInput 
        label="Password"
        type="password"
        :class="'mt-4'"
        v-model="password"
      />
      <span class="text-[#787878] text-xs md:text-sm block mt-2 font-semibold">Must be 8 or more characters and contains at least 1 number and 1 special character</span>
      
      <div class="flex flex-col gap-3 mt-20">
        <CustomButton 
          title="Continue" 
          :bgColor="isPasswordValid ? '#000000' : '#747579'"
          textColor="#ffffff"
          :disabled="!isPasswordValid"
          :isClickable="isPasswordValid"
        />
      </div>
    </div>
  </div>
</template>
