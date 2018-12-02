<template>
    <div id="app">
        <div class="message_log">
            <div v-for="message in messages">{{ message.text }}</div>
        </div>
        <textarea></textarea>
        <button>Send</button>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            messages: [
                { text: 'Hello!' },
                { text: 'This' },
                { text: 'Is' },
                { text: 'A' },
                { text: 'Test' },
            ]
        };
    }
};
</script>