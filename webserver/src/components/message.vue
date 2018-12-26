<template>
    <div :class='[ "message-wrapper", { self: self }]'>
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
        'details',
        'self'
    ],
    computed: {
        owner_initials: function owner_initials() {
            return this.details.owner[0].toUpperCase();
        }
    }
};
</script>