<template>
    <svg
        xmlns="http://www.w3.org/2000/svg" 
        :width="width" 
        :height="height" 
        viewBox="0 0 19 19" 
        :aria-labelledby="iconName" 
        role="presentation"
        :class="iconRotate"
    >
        <title
            :id="iconName"
            lang="en"
            >{{ iconName }} icon</title>
        <g>
            <slot />
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'yappswidgetsmainbutton'
        },
        width: {
            type: [Number, String],
            default: 19
        },
        height: {
            type: [Number, String],
            default: 19
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        },
        iconRotate: {
            type: String,
            default: 'down'
        }
    }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
svg.down {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transition: .2s;
}
svg.up {
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transition: .2s;
}
svg.right {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    transition: .2s;
}
svg.left {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    transition: .2s;
}
</style>