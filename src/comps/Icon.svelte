<script lang="ts">
    export let modifier: string = '';
    export let title: string = '';
    let className = ''
    export { className as class }
    export let svg: boolean = false;
    import Cross from "../../public/images/icon-cross.svg";
    import Arrow from "../../public/images/icon-arrow.svg";
    import Heart from "../../public/images/icon-heart.svg";

    $: modifierClasses = (modifier.split(' ').map(modifier => `icon--${modifier}`).join(' '));
</script>

{#if svg}
    <span on:click class="icon icon--svg {modifierClasses}{!!className ? ' ' + className : ''}" {title}>
        {#if modifier.includes('cross')}
            <Cross width="1em" height="1em"/>
        {/if}
        {#if modifier.includes('arrow')}
            <Arrow width="1em" height="1em"/>
        {/if}
        {#if modifier.includes('heart')}
            <Heart width="1em" height="1em"/>
        {/if}
    </span>
{:else}
    <i on:click class="icon icon--bg {modifierClasses}{!!className ? ' ' + className : ''}" {title}></i>
{/if}

<style lang="scss">
  @import '../scss/variables';

  $selector: '.icon';
  #{$selector} {
    vertical-align: top;
    cursor: pointer;

    &--bg {
      &::after {
        display: inline-block;
        content: '';
        background-size: contain;
        background-repeat: no-repeat;
        padding: 8px;
        transition: transform ease-in-out 150ms;
      }
    }

    &--manual::after {
      background-image: url('../images/icon-manual.svg');
    }

    &--cart::after {
      background-image: url('../images/icon-cart.svg');
    }

    &--new::after {
      background-image: url('../images/icon-new.svg');
    }

    &--flame::after {
      background-image: url('../images/icon-flame.svg');
    }

    &--arrow {
      &::after {
        background-image: url('../images/icon-arrow.svg');
      }

      &#{$selector}--svg {
        color: $color-primary;

        &:hover {
          color: $color-primary-darker;
        }
      }
    }

    &--cross {
      &::after {
        background-image: url('../images/icon-cross.svg');
      }

      &#{$selector}--svg {
        color: $color-primary;

        &:hover {
          color: $color-primary-darker;
        }
      }
    }

    &--heart {
      &::after {
        background-image: url('../images/icon-heart.svg');
      }
    }

    &--left {
      &::after,
      :global(&#{$selector}--svg svg) {
        transform: rotate(180deg);
      }
    }

    &--down::after {
      transform: rotate(90deg);
    }

    &--up::after {
      transform: rotate(-90deg);
    }
  }

  :global(#{$selector}--heart#{$selector}--svg:not(.active) path){
    stroke-width: 5px;
    stroke: white;
    fill: none;
  }

  :global(#{$selector}--heart#{$selector}--svg.active){
    color: #C4262F;

    &:hover {
      color: #780e14;
    }
  }

</style>
