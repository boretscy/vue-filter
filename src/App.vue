<template>
    <div class="container my-5">
        <div class="row mb-3">

            <div class="col-xl-5">
                <div class="row">
                    <div class="col-md-6 mb-3" v-if="view.city">
                        <multiselect 
                            v-model="cityValue" 
                            tag-placeholder="Выбрать" 
                            :placeholder="cityTitle" 
                            label="name" 
                            track-by="code" 
                            :options="cityOptions" 
                            :searchable="false"
                            :close-on-select="false" 
                            :clear-on-select="false"
                            :multiple="true"
                            selectLabel="Выбрать"
                            selectedLabel="Выбрано"
                            deselectLabel="Удалить"
                            >
                            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                            </multiselect>
                    </div>

                    <div class="col-md-6 mb-3" v-if="view.brand">
                        <multiselect 
                            v-model="brandValue" 
                            tag-placeholder="Выбрать" 
                            :placeholder="brandTitle" 
                            label="name" 
                            track-by="code" 
                            :options="brandOptions" 
                            :searchable="false"
                            :close-on-select="false" 
                            :clear-on-select="false"
                            :multiple="true"
                            selectLabel="Выбрать"
                            selectedLabel="Выбрано"
                            deselectLabel="Удалить"
                            >
                            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                            </multiselect>
                    </div>

                    <div class="col-md-6 mb-3" v-if="view.dealership">
                        <multiselect 
                            v-model="dealershipValue" 
                            tag-placeholder="Выбрать" 
                            :placeholder="dealershipTitle" 
                            label="name" 
                            track-by="code" 
                            :options="dealershipOptions" 
                            :searchable="false"
                            :close-on-select="false" 
                            :clear-on-select="false"
                            :multiple="true"
                            selectLabel="Выбрать"
                            selectedLabel="Выбрано"
                            deselectLabel="Удалить"
                            >
                            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                            </multiselect>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-xl-1 mb-3">
                <a 
                    :href="link" 
                    class="d-block w-100 p-2 text-center b-radius-small b-yadarkblue text-decoration-none c-yablack c-h-yablack bg-circle"
                    ><span>Показать</span>
                </a>
            </div>
            <div class="col-3 col-md-2 col-xl-1">
                <a 
                    :href="state.clearlink" 
                    class="d-block w-100 p-2 text-center b-radius-small b-yayellow text-decoration-none c-yablack c-h-yablack bg-circle"
                    ><span>Все</span>
                </a>
            </div>
            
            <div class="col text-end text-sm-start"  v-if="view.tag">
                <ul class="list-inline">
                    <li class="list-inline-item me-3 pt-2" v-for="(item, indx) in tagOptions" :key="indx">
                        <a 
                            :href="link+'&tag='+item.code" 
                            class="py-2 text-decoration-none"
                            :class="{'c-yablue c-h-yadarkblue': item.selected, 'c-yablackgray c-h-yadarkgray': !item.selected}"
                            >{{ item.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="col-md-6 col-xl-3 filter-mode"  v-if="view.mode">
                <div class="row">
                    <div 
                        class="col-6"
                        v-for="(item, indx) in modeOptions"
                        :key="indx">
                        <a 
                            :href="link+'&mode='+item.code"  
                            class="d-block p-2 text-center b-radius-small text-decoration-none c-yablack c-h-yablack"
                            :class="{'b-yayellow': item.selected, 'b-yawhite': !item.selected}"
                            >
                            <icon-base icon-name="list" v-if="item.code == 'list'"><icon-list /></icon-base>
                            <icon-base icon-name="map" v-if="item.code == 'map'"><icon-map /></icon-base>
                            <span>{{ item.name }}</span>
                        </a>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import IconBase from '@/components/IconBase.vue'
import IconList from '@/components/icons/IconList.vue'
import IconMap from '@/components/icons/IconMap.vue'

export default {
    name: 'App',
    data() {
        return {
            state: this.$root.state,

            cityValue: [],
            cityOptions: this.$root.state.items.city.items,

            brandValue: [],
            brandOptions: this.$root.state.items.brand.items,

            dealershipValue: [],
            dealershipOptions: this.$root.state.items.dealership.items,
            dealershipTitle: this.$root.state.items.dealership.title,

            tagOptions: this.$root.state.items.tag.items,

            modeOptions: this.$root.state.items.mode.items,

            view: this.$root.state.view,

            result: {},
            link: null
        }

    },
    components: {
        Multiselect,
        IconBase, IconList, IconMap
    },
    computed: {
        cityTitle: function() { return this.$root.state.items.city.title || this.cityOptions.length+' '+this.getWorld(this.cityOptions.length, 'c') },
        brandTitle: function() { return this.$root.state.items.brand.title || this.brandOptions.length+' '+this.getWorld(this.brandOptions.length, 'b') }
    },
    mounted: function() {
        this.link = this.buildLink() 

        this.brandValue = []
        this.brandOptions = this.buildBrandpOptions()

        this.dealershipValue = []
        this.dealershipOptions = this.buildDealershipOptions()
        
        let s
        if ( this.view.city ) {
            s = this.cityValue
            this.cityOptions.forEach( function(item) {
                if ( item.selected ) s.push(item)
            })
        }
        if ( this.view.brand ) {
            s = this.brandValue
            this.brandOptions.forEach( function(item) {
                if ( item.selected ) s.push(item)
            })
        }
        if ( this.view.dealership ) {
            s = this.dealershipValue
            this.dealershipOptions.forEach( function(item) {
                if ( item.selected ) s.push(item)
            })
        }
    },
    watch: {
        cityValue: function() {

            this.link = this.buildLink() 

            if ( this.view.brand ) {
                this.brandValue = []
                this.brandOptions = this.buildBrandpOptions()
            }

            if ( this.view.dealership ) {
                this.dealershipValue = []
                this.dealershipOptions = this.buildDealershipOptions()
            }

        },
        brandValue: function() {

            this.link = this.buildLink() 

            if ( this.view.dealership ) {
                this.dealershipValue = []
                this.dealershipOptions = this.buildDealershipOptions()
            }
        },
        dealershipValue: function() {

            this.link = this.buildLink() 
        }
    },
    methods: {
        buildLink() {

            this.result = {}
            if ( this.cityValue.length ) {
                let a = []
                this.cityValue.forEach( function(item) { a.push(item.name)})
                this.result.city = a.join(',`')
            } else {
                this.result.city = null
            }

            if ( this.brandValue.length ) {
                let a = []
                this.brandValue.forEach( function(item) { a.push(item.code)})
                this.result.brand = a.join(',`')
            } else {
                this.result.brand = null
            }

            if ( this.dealershipValue.length ) {
                let a = []
                this.dealershipValue.forEach( function(item) { a.push(item.code)})
                this.result.dealership = a.join(',`')
            } else {
                this.result.dealership = null
            }
            
            for ( let i in this.state.get ) {
                this.result[i] = this.state.get[i]
            }

            let s = new URLSearchParams();
            for ( let i in this.result ) {
                if ( this.result[i] ) {
                    s.append(i, this.result[i]);
                }
            }

            return this.state.baseurl+'?'+s.toString()
        },

        buildBrandpOptions() {
            
            this.brandValue = []
            let res = []

            if ( this.cityValue.length ) {
                let i = this.state.items.brand.items, v = this.cityValue
                i.forEach( function(iitem) {
                    v.forEach( function(vitem) {
                        for (let k in iitem.relation) {
                            if ( iitem.relation[k] == vitem.code ) res.push(iitem)
                        }
                    })
                })
            } else {
                res = this.state.items.brand.items
            }
            
            return res
        },
        buildDealershipOptions() {
            
            this.dealershipValue = []
            let res = []

            if ( this.brandValue.length ) {
                let i = this.state.items.dealership.items, v = this.brandValue
                i.forEach( function(iitem) {
                    v.forEach( function(vitem) {
                        if ( iitem.relation == vitem.code ) {
                            res.push(iitem)
                        }
                    })
                })
            } else {
                res = this.state.items.dealership.items
            }
            
            return res
        },
        getWorld( q = 1, f = 'b' ) {

            let res = {
                'c': ['город', 'города', 'городов'],
                'b': ['бренд', 'бренда', 'брендов']
            }
            let t = [
				[1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141, 151, 161, 171, 181, 191],
				[2,3,4,22,23,24,32,33,34,42,43,44,52,53,54,62,63,64,72,73,74,82,83,84,92,93,94,102,103,104,122,123,124,132,133,134,142,143,144,152,153,154,162,163,164,172,173,174,182,183,184,192,193,194]
			]

            if ( t[0].indexOf(q) >= 0 ) return res[f][0]
            if ( t[1].indexOf(q) >= 0 ) return res[f][1]
            return res[f][2]
        }
        
    }
}
</script>

<style>
.container {
    font-size: 14px;
}
.filter-mode svg {
	width: 18px;
	height: 18px;
	margin-right: 10px;
}
fieldset[disabled] .multiselect {
  pointer-events: none;
}
.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: var(--yawhite);
  display: block;
}
.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: var(--yadarkblue) transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}
.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  height: 40px;
  text-align: left;
  color: var(--yablack);
}
.multiselect * {
  box-sizing: border-box;
}
.multiselect:focus {
  outline: none;
}
.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}
.multiselect--active {
  z-index: 50;
}
.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.multiselect--active .multiselect__select {
    transform: rotateZ(180deg);
  }
.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: var(--yawhite);
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
.multiselect__input::placeholder {
  color: var(--yablack);
}
.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}
.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}
.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}
.multiselect__tags-wrap {
  display: inline;
}
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 10px 40px 0 10px;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  background: var(--yawhite);
  font-size: 14px;
  min-height: 45px;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: var(--yawhite);
  line-height: 1;
  background: var(--yadarkblue);
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
.multiselect__tag-icon:after {
  content: "×";
  color: var(--yayellow);
  font-size: 14px;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: var(--yayellow);
  color: var(--yadarkblue);
}
.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}
.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  cursor: pointer;
}
.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 42px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: var(--yamiddlegray);
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: var(--yamiddlegray) transparent transparent transparent;
  content: "";
}
.multiselect__placeholder {
  color: var(--yablack);
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
.multiselect--active .multiselect__placeholder {
  display: none;
}
.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: var(--yawhite);
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid var(--yagray);
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid var(--yagray);
}
.multiselect__content::webkit-scrollbar {
  display: none;
}
.multiselect__element {
  display: block;
}
.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}
.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}
.multiselect__option--highlight {
  background: var(--yalightgray);
  outline: none;
  color: var(--yablack);
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: var(--yalightgray);
  color: var(--yamiddlegray);
}
.multiselect__option--selected {
  background: var(--yalightgray);
  color: var(--yablack);
  font-weight: bold;
}
.multiselect__option--selected:after {
  content: attr(data-selected);
  color: var(--yamiddlegray);
}
.multiselect__option--selected.multiselect__option--highlight {
  background: var(--yalightgray);
  color: var(--yamiddlegray);
}
.multiselect__option--selected.multiselect__option--highlight:after {
  background: var(--yalightgray);
  content: attr(data-deselect);
  color: var(--yamiddlegray);
}
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}
.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}
.multiselect__option--group {
  background: #ededed;
  color: var(--yablack);
}
.multiselect__option--group.multiselect__option--highlight {
  background: var(--yamiddlegray);
  color: var(--yawhite);
}
.multiselect__option--group.multiselect__option--highlight:after {
  background: var(--yablack);
}
.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}
.multiselect__option--group-selected.multiselect__option--highlight {
  background: var(--yalightgray);
  color: var(--yawhite);
}
.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: var(--yalightgray);
  content: attr(data-deselect);
  color: var(--yawhite);
}
.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}
.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}
.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
*[dir="rtl"] .multiselect {
  text-align: right;
}
*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}
*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}
*[dir="rtl"] .multiselect__content {
  text-align: right;
}
*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}
*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}
*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}
@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
</style>
