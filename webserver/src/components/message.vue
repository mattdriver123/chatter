<template>
    <div :class='[ "message_wrapper", { self: self }]'>
        <div>
            <span class="owner" v-if="!self">
                {{ owner_initials }}
            </span>
            <span class="message">
                {{ details.text }}
            </span>
            <span class="owner" v-if="self">
                {{ owner_initials }}
            </span>
        </div>
        <div class="date">
            <small>{{ details.date.format('lll') }}</small>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'details'
    ],
    computed: {
        self: function self() {
            return this.details.owner === 'you';
        },
        owner_initials: function owner_initials() {
            return this.details.owner[0].toUpperCase();
        }
    }
};
</script>