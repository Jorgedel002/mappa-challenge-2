<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        icon: {
            type: [String, Array],
            default: null
        },
        bgColor: {
            type: String,
            default: '#747579'
        },
        textColor: {
            type: String,
            default: '#000000'
        },
        iconSize: {
            type: String,
            default: '16px'
        },
        mdIconSize: {
            type: String,
            default: '20px'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isClickable: {
            type: Boolean,
            default: false
        }
    })
    
    const isMdScreen = ref(false);
    const isHovering = ref(false);
    
    const checkScreenSize = () => {
        isMdScreen.value = window.innerWidth >= 768; 
    };
    
    onMounted(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });
    
    onUnmounted(() => {
        window.removeEventListener('resize', checkScreenSize);
    });
    
    const responsiveIconSize = computed(() => {
        return isMdScreen.value ? props.mdIconSize : props.iconSize;
    });
    
    const buttonStyle = computed(() => {
        if (isHovering.value && (!props.disabled || props.isClickable)) {
            return { backgroundColor: '#000000', color: '#ffffff' };
        }
        return { backgroundColor: props.bgColor, color: props.textColor };
    });

    defineEmits(['click'])
</script>

<template>
    <button 
        class="outline-none rounded-md w-full py-3 md:py-4 text-sm md:text-base  font-semibold text-center cursor-pointer relative transition-colors duration-200 group"
        :class="[{'flex items-center': icon, 'opacity-50 cursor-not-allowed': disabled && !isClickable}]"
        :style="buttonStyle"
        @click="$emit('click')"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
        :disabled="disabled && !isClickable"
    >
        <span v-if="icon" class="absolute left-3 md:left-6" :class="{'text-white': isHovering && (!disabled || isClickable)}">
            <font-awesome-icon :icon="icon" :size="responsiveIconSize" />
        </span>
        <span class="mx-auto">{{ title }}</span>
    </button>
</template>