<template>
    <div id="app">
        <div v-if="id">
            ID: {{ id }}
        </div>
        <template v-if="clients.length">
            Clients:
            <div v-for="client in clients">{{ client }}</div>
        </template>
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
            id: '',
            clients: [],
            messages: [],
            message_box: ''
        };
    },
    mounted: function mounted() {
        let that = this;
        this.socket = new WebSocket('ws://' + location.hostname + '/socket');
        this.socket.addEventListener('message', function(event) {
            let data = JSON.parse(event.data);

            switch (data.type) {
                case ('connection_established'):
                    that.id = data.id;
                    break;
                case ('client_list_update'):
                    that.clients = data.clients;
                    break;
            }
        });
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