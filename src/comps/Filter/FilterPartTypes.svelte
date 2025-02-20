<script lang="ts">
    import { onMount } from 'svelte';
    import { storedActiveSelection, storedPartTypes, storedProducts, storedFilteredProducts } from '../../stores';
    import { getUrlParam, setUrlParams, titleMatch } from '../../utils';
    import { ID_PARTS } from "../../_interfaces";

    export let activePartTypeIds: any = [];
    export let partTypes: any;
    export let products: any;
    export let filteredProducts: any = [];

    const urlParam = 'partTypes';
    const getUrlParams = () => {
        const queryTags = getUrlParam(urlParam).split(',');
        partTypes.map(part => {
            queryTags.map(queryTag => {
                if (part.seoName === queryTag) {
                    clickItem(part);
                }
            });
        });
    }

    const clickItem = (item, withUrlUpdate?) => {
        if (item.count === 0) return;

        storedActiveSelection.update(value => {
            if (!(urlParam in value)) {
                value[urlParam] = [];
            }
            if (!value[urlParam].includes(item.id)) {
                value[urlParam].push(item.id);
            } else {
                value[urlParam] = value[urlParam].filter(itemId => itemId !== item.id);
            }

            if (withUrlUpdate) {
                setUrlParams(
                        urlParam,
                        partTypes
                                .filter(part => value[urlParam].includes(part.id))
                                .map((part) => part.seoName));
                value.reason = 'part-type-clicked';
            } else {
                value.reason = 'url-parsed';
            }
            return value;
        });
    }

    storedPartTypes.subscribe(value => partTypes = value);
    storedProducts.subscribe(value => products = value);
    storedFilteredProducts.subscribe(value => filteredProducts = value);

    onMount(() => {
        getUrlParams();
    });

    function sortItems() {
        let sortedData = [];
        // get count of products
        sortedData = partTypes.map(part => {
            part.count =
                    (filteredProducts && filteredProducts.withFilter.length > 0 ? filteredProducts.withFilter : products)
                            .filter(product => product.tags.includes(ID_PARTS))
                            .filter(product =>
                                    titleMatch(part, product) > 0
                            ).length;
            return part;
        })
                // sort state
                .sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    if (a.label > b.label) {
                        return 1;
                    }
                    return 0;
                });
        return sortedData;
    }

    $: sortedItems = sortItems(filteredProducts);
</script>
<div class="flex">
    <h4>Typen</h4>
    <div class="flex flex--wrap bl">
        {#each sortedItems as part (part.id)}
            <div class="part{activePartTypeIds.includes(part.id) ? ' active': ''}{part.count === 0 ? ' disabled': ''}"
                 data-id={part.id}
                 on:click={() => clickItem(part, true)}
                 title="{part.name} ({part.count})">
                {part.de}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    @import '../../scss/variables';

    .part {
        padding: 0 $space-xl;
        margin: $space-xs;
        border: solid 1px $color-primary-darker;
        border-radius: $border-radius-xl;
        cursor: pointer;
        user-select: none;
        position: relative;
        font-size: ms(0);

        @media (min-width: 750px) {
            font-size: ms(-2);
        }

        &:focus, &:active, &.active {
            background: $color-primary-darker;
            color: $color-white;
        }

        &:hover {
            background: $color-primary-dark;
            color: $color-white;
        }

        &.disabled {
            opacity: 0.1;
            cursor: default;
        }
    }
</style>
