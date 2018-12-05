<template>
    <div id="app">
        <div class="message_form">
            <div class="message_log">
                <Message :details="message"
                         :key="index + 1"
                         v-for="message, index in messages">
                </Message>
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
import moment from 'moment';
import Message from './message.vue';

export default {
    components: {
        Message: Message
    },
    data: function() {
        return {
            messages: [],
            message_box: ''
        };
    },
    methods: {
        submitMessage: function submitMessage() {
            this.messages.push(
                {
                    text: this.message_box,
                    owner: 'you',
                    date: moment()
                }
            );
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