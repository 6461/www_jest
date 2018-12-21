"use strict";

Vue.component(
  'shop-item', {
    template: '\
      <li class="collection-item">\
        <div>\
          {{ title }}\
          <button v-on:click="$emit(\'remove\')" class="secondary-content btn-small btn-fix waves-effect waves-light red">Remove\
          <i class="material-icons left">remove_circle</i></button>\
        </div>\
      </li>\
    ',
    props: ['title']
})

var vm = new Vue({
  el: '#app',

  data: {
    appName: 'Shopping list',
    itemName: null,
    items: [],
	loading: true,
	errored: false
  },

  mounted() {
    axios
      .get('/item/list')
      .then(response => {this.items = response.data})
      .catch(error => {
		  console.log(error);
		  this.errored = true;
	  })
      .finally(() => {
		  setTimeout(function() {
			  this.loading = false;
		  }.bind(this), 1000);
      });
  },

  methods: {
    addItem() {
      // reject string if empty
      if(this.itemName.trim() === '') {
        console.log('empty');
        return;
      }
      // reject string if too long
      if(this.itemName.length > 100) {
        console.log('too long: ' + this.itemName.length);
        return;
      }
      // validate string characters
      if(!this.validInput(this.itemName)) {
        console.log('not valid');
        return;
      }
      
      axios
        .post('/item/create', {name: this.itemName.trim()})
        .then(response => this.items.push(response.data))
        .catch(error => {
			console.log(error);
		});
      
      console.log('add: ' + this.itemName);
    },

    validInput(text) {
      var re = /^[a-zA-Z0-9 ,.]*$/;
      return re.test(text);
    },

    removeItem(index) {
      axios
        .post('/item/delete', {id: this.items[index]._id})
        .then(response => this.items.splice(index, 1))
        .catch(error => {
			console.log(error);
		});
    }
  }
});
