<template>
    <div id="app">
        <div class="card message-form">
            <div class="message-log">
                <Message :details="message"
                         :self="message.owner === id"
                         :key="index + 1"
                         v-for="message, index in messages">
                </Message>
            </div>
            <textarea class="message-input"
                      v-model="message_box"
                      @keypress.enter="textAreaOnEnter"
                      placeholder="Type here...">
            </textarea>
            <button @click="submitMessage">Send</button>
        </div>
        <div class="card client-list">
            Clients ({{ clients.length }}):
            <ul class="list-unstyled">
                <li v-for="client in clients">
                    <template v-if="client === id">
                        {{ client }} (you)
                    </template>
                    <template v-else>
                        {{ client }}
                    </template>
                </li>
            </ul>
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

            switch (data[0]) {
                case ('connection_established'):
                    that.id = data[1];
                    break;
                case ('client_list_update'):
                    that.clients = data[1];
                    break;
                case ('receive_message'):
                    that.messages.push({
                        text: data[1].message,
                        owner: data[1].user,
                        date: moment.utc(data[1].date)
                    });
                    break;
            }
        });
    },
    methods: {
        submitMessage: function submitMessage() {
            this.sendMessage('post_message', this.message_box);
            this.messages.push({
                text: this.message_box,
                owner: this.id,
                date: moment()
            });
            this.message_box = '';
        },
        textAreaOnEnter: function textAreaOnEnter(e) {
            if (!e.shiftKey) {
                e.preventDefault();

                if (this.message_box) {
                    this.submitMessage();
                }
            }
        },
        sendMessage: function sendMessage(type, data) {
            this.socket.send(
                JSON.stringify([type, data])
            );
        }
    }
};
</script>

<style lang="scss">
    @import '../sass/app.scss'
</style>