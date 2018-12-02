<template>
    <div id="app">
        <div class="message_log">
            <div v-for="message in messages">{{ message.text }}</div>
        </div>
        <textarea v-model="message_box"
                  @keyup.enter="submitMessage"
                  placeholder="Type here...">
        </textarea>
        <button @click="submitMessage">Send</button>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            messages: [],
            message_box: ''
        };
    },
    methods: {
        submitMessage: function submitMessage() {
            this.messages.push({text: this.message_box});
            this.message_box = '';
        }
    }
};
</script>