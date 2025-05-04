<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps({
        label: String,
        type: String,
        modelValue: {
            type: [String, Number],
            default: ''
        },
        codeLength: {
            type: Number,
            default: 6
        },
        subtext: String,
        phoneNumber: String
    });

    const emit = defineEmits(['countryCodeChange', 'phoneNumberChange', 'update:modelValue', 'codeComplete']);

    const countryCode = ref("+972");
    const phoneNumber = ref("");
    const inputValue = ref(props.modelValue || "");
    const verificationCode = ref(Array(props.codeLength).fill(''));
    const codeInputs = ref([]);

    // Actualizar el valor cuando cambia el modelValue
    watch(() => props.modelValue, (newValue) => {
        inputValue.value = newValue;
        
        // Actualizamos el código de verificación si tipo es 'code'
        if (typeof newValue === 'string' && props.type === 'code') {
            const codeArray = newValue.split('');
            for (let i = 0; i < props.codeLength; i++) {
                verificationCode.value[i] = codeArray[i] || '';
            }
        }
    });

    // Emitir el evento update:modelValue cuando cambia el valor del input
    watch(inputValue, (newValue) => {
        emit('update:modelValue', newValue);
    });

    const countryCodeFocused = ref(false);
    const phoneNumberFocused = ref(false);
    const inputFocused = ref(false);
    const passwordVisible = ref(false);
    const verificationCodeFocused = ref(false);

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
    };

    // Funciones para el manejo del código de verificación
    const onDigitInput = (index) => {
        // Mover al siguiente input cuando se ingresa un dígito
        if (verificationCode.value[index] && index < props.codeLength - 1) {
            // Solo aceptar números
            verificationCode.value[index] = verificationCode.value[index].replace(/[^0-9]/g, '');
            
            // Avanzar al siguiente campo solo si es un número
            if (/^[0-9]$/.test(verificationCode.value[index])) {
                codeInputs.value[index + 1]?.focus();
            }
        }
        
        updateVerificationCode();
    };

    const onKeyDown = (event, index) => {
        // Manejar la tecla de retroceso
        if (event.key === 'Backspace') {
            if (!verificationCode.value[index] && index > 0) {
                // Si el campo actual está vacío y no es el primero, mover al anterior
                verificationCode.value[index - 1] = '';
                codeInputs.value[index - 1]?.focus();
                event.preventDefault();
            }
        } else if (event.key === 'ArrowLeft' && index > 0) {
            // Mover al anterior con flecha izquierda
            codeInputs.value[index - 1]?.focus();
            event.preventDefault();
        } else if (event.key === 'ArrowRight' && index < props.codeLength - 1) {
            // Mover al siguiente con flecha derecha
            codeInputs.value[index + 1]?.focus();
            event.preventDefault();
        }
    };

    const updateVerificationCode = () => {
        const code = verificationCode.value.join('');
        emit('update:modelValue', code);
    };

    // Función para validar que el código de país solo contenga números y el símbolo +
    const validateCountryCode = () => {
        // Reemplaza cualquier carácter que no sea un número o el símbolo +
        // Asegura que solo pueda haber un + al inicio
        const regex = /[^0-9+]/g;
        let newValue = countryCode.value.replace(regex, '');
        
        // Si hay más de un +, deja solo el primero
        if (newValue.indexOf('+') !== newValue.lastIndexOf('+')) {
            const firstPlus = newValue.indexOf('+');
            newValue = '+' + newValue.substring(firstPlus + 1).replace(/\+/g, '');
        }
        
        // Si hay un +, asegúrate de que está al inicio
        if (newValue.includes('+') && !newValue.startsWith('+')) {
            newValue = '+' + newValue.replace(/\+/g, '');
        }
        
        countryCode.value = newValue;
        // Emitir el código de país actualizado
        emit('countryCodeChange', countryCode.value);
    };

    // Función para validar que el número de teléfono solo contenga números
    const validatePhoneNumber = () => {
        // Reemplaza cualquier carácter que no sea un número
        const regex = /[^0-9]/g;
        phoneNumber.value = phoneNumber.value.replace(regex, '');
        // Emitir el número de teléfono actualizado
        emit('phoneNumberChange', phoneNumber.value);
    };
</script>

<template>
    <div v-if="type === 'phone'">
        <label :for="label" class="text-stone-700 font-semibold text-sm md:text-base block mb-2 md:mb-3">{{ label }}</label>
        <div class="flex items-center gap-[8px]">
            <div class="relative flex items-center flex-1">
                <div class="absolute left-1 md:left-3">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" class="md:w-[30px] md:h-[27px]" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="25px" height="22px" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path style="fill:#41479B;" d="M473.655,88.275H38.345C17.167,88.275,0,105.442,0,126.62V385.38 c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.62 C512,105.442,494.833,88.275,473.655,88.275z"></path>
                            <rect y="150.07" style="fill:#F5F5F5;" width="512" height="211.86"></rect>
                            <path style="fill:#41479B;" d="M301.869,255.999l22.933-39.721h-45.865L256,176.551l-22.936,39.727h-45.865l22.933,39.721 l-22.933,39.721h45.865L256,335.448l22.936-39.727h45.865L301.869,255.999z M302.302,229.27l-7.933,13.74l-7.933-13.74H302.302z M286.869,255.999l-15.433,26.73h-30.873l-15.432-26.73l15.433-26.73h30.873L286.869,255.999z M256,202.533l7.936,13.746h-15.872 L256,202.533z M209.698,229.27h15.865l-7.933,13.74L209.698,229.27z M209.698,282.729l7.933-13.74l7.933,13.74H209.698z M256,309.466l-7.936-13.746h15.872L256,309.466z M294.369,268.99l7.933,13.74h-15.865L294.369,268.99z"></path>
                        </g>
                    </svg>
                </div>
                <input 
                    type="text" 
                    v-model="countryCode"
                    @focus="countryCodeFocused = true" 
                    @blur="countryCodeFocused = countryCode.length > 0"
                    @input="validateCountryCode"
                    class="pl-8 md:pl-12 border rounded-md w-[75px] md:w-[95px] py-3 md:py-4 text-xs md:text-sm outline-none transition-colors font-bold"
                    :class="countryCodeFocused || countryCode.length > 0 ? 'border-stone-700' : 'border-[#aeaeae]'"
                >
            </div>
            <input 
                type="text" 
                :placeholder="label" 
                v-model="phoneNumber"
                @input="validatePhoneNumber"
                @focus="phoneNumberFocused = true" 
                @blur="phoneNumberFocused = phoneNumber.length > 0"
                class="border rounded-md w-full py-3 md:py-4 pl-2 text-xs md:text-sm outline-none transition-colors font-bold"
                :class="phoneNumberFocused || phoneNumber.length > 0 ? 'border-stone-700' : 'border-[#aeaeae]'"
            >
        </div>
        <span class="text-[#787878] text-xs block mt-2 md:text-sm md:mt-3 font-semibold">We will send you a verification code to this number.</span>
    </div>
    <div v-else-if="type === 'password'">
        <label :for="label" class="text-stone-700 font-semibold text-sm md:text-base block mb-2 md:mb-3">{{ label }}</label>
        <div class="relative">
            <input 
                :type="passwordVisible ? 'text' : 'password'" 
                :placeholder="label"
                v-model="inputValue"
                @focus="inputFocused = true" 
                @blur="inputFocused = typeof inputValue === 'string' && inputValue.length > 0"
                class="border rounded-md w-full py-3 md:py-4 pl-2 pr-10 text-xs md:text-sm outline-none transition-colors font-bold"
                :class="inputFocused || (typeof inputValue === 'string' && inputValue.length > 0) ? 'border-stone-700' : 'border-[#aeaeae]'"
            >
            <button 
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                @click="togglePasswordVisibility"
            >
                <font-awesome-icon :icon="passwordVisible ? 'eye' : 'eye-slash'" />
            </button>
        </div>
    </div>
    <div v-else-if="type === 'code'">
        <label :for="label" class="text-stone-700 font-semibold text-sm md:text-base block mb-2 md:mb-3">{{ label }}</label>
        <div class="verification-code-inputs flex gap-2 mb-4">
            <input 
                v-for="(digit, index) in verificationCode" 
                :key="index"
                type="text" 
                maxlength="1"
                v-model="verificationCode[index]"
                @input="onDigitInput(index)"
                @keydown="onKeyDown($event, index)"
                class="w-full h-[45px] md:h-[55px] border border-gray-300 rounded-md text-center text-lg md:text-xl font-semibold outline-none transition-colors"
                :class="verificationCodeFocused ? 'border-stone-700' : 'border-[#aeaeae]'"
                ref="codeInputs"
            />
        </div>
        <span v-if="subtext" class="text-[#787878] text-xs block mt-2 md:text-sm md:mt-3 font-semibold">{{ subtext }}</span>
    </div>
    <div v-else>
        <label :for="label" class="text-stone-700 font-semibold text-sm md:text-base block mb-2 md:mb-3">{{ label }}</label>
        <input 
            type="text" 
            :placeholder="label"
            v-model="inputValue"
            @focus="inputFocused = true" 
            @blur="inputFocused = typeof inputValue === 'string' && inputValue.length > 0"
            class="border rounded-md w-full py-3 md:py-4 pl-2 text-xs md:text-sm outline-none transition-colors font-bold"
            :class="inputFocused || (typeof inputValue === 'string' && inputValue.length > 0) ? 'border-stone-700' : 'border-[#aeaeae]'"
        >
    </div>
</template>