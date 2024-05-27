<template>
    <div class="inquery-form">
        <label class="form-control">
            <div class="label">
                <span class="label-text">What is your name?</span>
            </div>
            <input :readonly="loading" @blur="checkName" v-model="name" type="text" placeholder="Type here" class="input input-bordered" />
            <div class="label">
                <span v-if="nameError" class="label-text-alt text-red-500">{{nameError}}</span>
            </div>
        </label>
        <label class="form-control">
            <div class="label">
                <span class="label-text">What is your email address?</span>
            </div>
            <input :readonly="loading" @blur="checkEmail" v-model="email" type="email" placeholder="Type here" class="input input-bordered" />
            <div class="label">
                <span v-if="emailError" class="label-text-alt text-red-500">{{emailError}}</span>
            </div>
        </label>
        <label class="form-control">
            <div class="label">
                <span class="label-text">What is your message?</span>
            </div>
            <textarea :readonly="loading" @blur="checkMessage" v-model="message" class="textarea textarea-bordered" placeholder="Type here"></textarea>
            <div class="label">
                <span v-if="messageError" class="label-text-alt text-red-500">{{messageError}}</span>
            </div>
        </label>
        <button @click="handleSubmit" class="btn btn-primary">
            <span v-if="loading" class="loading loading-spinner"></span>
            Submit
        </button>
    </div>
</template>
<script setup>
import { delay, noop } from '@/utils';
import { ref } from 'vue';

const props = defineProps({
    onSubmit: {
        type: Function,
        default: () => delay(2000)
    }
});

const loading = ref(false);

const name = ref('');
const nameError = ref('');
function checkName() {
    if (loading.value) return;
    if (name.value) {
        nameError.value = ''
        return true
    } else {
        nameError.value = 'name is required'
    }
}

const email = ref('');
const emailError = ref('');
const emailRegExp = /^.+@.+$/
function checkEmail() {
    if (loading.value) return;
    if (email.value) {
        if (emailRegExp.test(email.value)) {
            emailError.value = ''
            return true
        } else {
            emailError.value = 'email is invalid'
        }
    } else {
        emailError.value = 'email is required'
    }
}

const message = ref('');
const messageError = ref('');
function checkMessage() {
    if (loading.value) return;
    if (message.value) {
        messageError.value = ''
        return true
    } else {
        messageError.value = 'message is required'
    }
}


async function handleSubmit() {
    if (loading.value) return;
    if (
        checkName() &&
        checkEmail() &&
        checkMessage ()
    ) {
        const formData = {
            name: name.value,
            email: email.value,
            message: message.value,
        }
        console.log('formData', formData)

        try {
            loading.value = true
            await props.onSubmit(formData)
        } catch (err) {
            console.error(err)
        }
        loading.value = false
    }
}
</script>