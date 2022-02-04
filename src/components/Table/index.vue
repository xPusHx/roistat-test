<template>
    <div class="table" v-show="!collapsedLocal">
        <div class="table__head" v-if="showHead">
            <div class="table__row">
                <div
                    class="table__cell"
                    v-for="(col, colIndex) in headerCols"
                    :key="`${col.text}-${colIndex}`"
                    :style="{width: `${col.width}%`}">
                    {{col.text}}
                    <button
                        class="table__sort"
                        :class="{active: (sortColLocal === colIndex), descending: (sortColLocal === colIndex) && descSortLocal}"
                        type="button"
                        title="Отсортировать"
                        @click="sortTable(colIndex)">
                        &#8593;
                    </button>
                </div>
            </div>
        </div>

        <div class="table__body">
            <div class="table__row" v-for="row in sortedData" :key="row.id">
                <div
                    class="table__cell"
                    v-for="(col, colIndex) in row.cols"
                    :key="`${row.id}-${colIndex}`"
                    :style="{width: `${(headerCols.length > 0) ? headerCols[colIndex].width : (100 / row.cols.length)}%`}">
                    <button
                        class="table__collapse"
                        type="button"
                        v-if="row.inner && (colIndex === 0)"
                        :title="`${row.collapsed ? 'Показать' : 'Скрыть'} содержимое`"
                        @click="toggleCollapse(row)">
                        {{row.collapsed ? '+' : '-'}}
                    </button>
                    {{col}}
                </div>

                <AppTable
                    v-if="row.inner"
                    :header-cols="headerCols"
                    :body-data="row.inner"
                    :inner="true"
                    :sort-col="sortColLocal"
                    :desc-sort="descSortLocal"
                    :collapsed="row.collapsed"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppTable',

    props: {
        headerCols: {
            type: Array,
            default() {
                return [];
            }
        },
        bodyData: {
            type: Array,
            default() {
                return [];
            }
        },
        inner: {
            type: Boolean,
            default: false
        },

        sortCol: {
            type: Number,
            default: null
        },
        descSort: {
            type: Boolean,
            default: false
        },

        //Нужно сделать отдельным компонентом
        collapsed: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            sortedData: [],
            sortColLocal: this.sortCol,
            descSortLocal: this.descSort,
            collapsedLocal: this.collapsed
        };
    },

    computed: {
        showHead() {
            return (this.headerCols.length > 0) && !this.inner;
        }
    },

    watch: {
        bodyData() {
            this.sortedData = [...this.bodyData];
            this.sortTableData();
        },

        sortCol() {
            this.sortColLocal = this.sortCol;
        },
        descSort() {
            this.descSortLocal = this.descSort;
        },
        sortColLocal() {
            this.sortTableData();
        },
        descSortLocal() {
            this.sortTableData();
        },

        collapsed() {
            this.collapsedLocal = this.collapsed;
        }
    },

    created() {
        this.sortedData = [...this.bodyData];
    },

    methods: {
        sortTableData() {
            this.sortedData.sort((firstItem, secondItem) => {
                const firstCompared = firstItem.cols[this.sortColLocal];
                const secondCompared = secondItem.cols[this.sortColLocal];

                if (firstCompared < secondCompared) {
                    return -1;
                }
                if (firstCompared > secondCompared) {
                    return 1;
                }

                return 0;
            });

            if ((this.sortColLocal !== null) && !this.descSortLocal) {
                this.sortedData.reverse();
            }
        },

        sortTable(colIndex) {
            this.sortColLocal = colIndex;
            this.descSortLocal = !this.descSortLocal;
        },

        toggleCollapse(row) {
            row.collapsed = !row.collapsed;
        }
    }
};
</script>

<style lang="scss">
.table{
    width: 100%;
    max-width: 600px;
    &__head{
        .table__cell{
            justify-content: space-between;
            border-bottom: 2px solid #ddd;
        }
    }
    &__row{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-left: 1px;
        .table{
            padding-left: 20px;
        }
    }
    &__cell{
        display: flex;
        border: 1px solid #ddd;
        margin-top: -1px;
        margin-left: -1px;
        padding: 6px 8px;
    }
    &__sort{
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 2px;
        &.active{
            background: #000;
            color: #fff;
        }
        &.descending{
            transform: scaleY(-1);
        }
    }
    &__collapse{
        width: 22px;
        border: 1px solid #ddd;
        border-radius: 2px;
        cursor: pointer;
        margin-right: 8px;
    }
}
</style>