<script setup>
    defineProps({
        title: {
            type: String,
            required: true
        },
        showBackButton: {
            type: Boolean,
            default: false
        }
    });

    defineEmits(['goBack']);
</script>

<template>
    <div class="flex items-center py-5 md:pb-10 relative">
        <button 
            v-if="showBackButton" 
            class="absolute left-0 flex items-center justify-center cursor-pointer" 
            @click="$emit('goBack')"
        >
            <font-awesome-icon icon="chevron-left" class="text-2xl md:text-3xl" />
        </button>
        <h1 
            class="text-stone-700 font-bold text-medium md:text-2xl w-full text-center"
        >
            {{ title }}
        </h1>
    </div>
</template>