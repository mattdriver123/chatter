<template>
    <div id="app">
        <div class="message_form">
            <div class="message_log">
                <div :class='[ "message_wrapper", { self: message.owner === "self" }]'
                     v-for="message in messages">
                    <div class="message">
                        {{ message.text }}
                    </div>
                </div>
            </div>
            <textarea class="message_input"
                      v-model="message_box"
                      @keypress.enter="textAreaOnEnter"
                      placeholder="Type here...">
            </textarea>
            <button @click="submitMessage">Send</button>
        </div>
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
            this.messages.push({text: this.message_box, owner: 'self'});
            this.message_box = '';
        },
        textAreaOnEnter: function textAreaOnEnter(e) {
            if (!e.shiftKey) {
                e.preventDefault();

                if (this.message_box) {
                    this.submitMessage();
                }
            }
        }
    }
};
</script>

<style lang="scss">
    @import '../sass/app.scss'
</style>