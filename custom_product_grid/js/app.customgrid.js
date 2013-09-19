/**
 * customgrid 
 * 
 * customgrid lets you customize demandware product grid to insert multiple sized slots in multiple positions. 
 * Will take care for
 * - Responsiveness on dom load as well as show/hide filter
 * - Support for 2,3 and 4 column
 * 
 * @author Rajesh Kumar Jha, rkjha.com
 * @package app
 * @version 1.0
 *
 */
 
var app = (function (app, $) {
	app.customgrid = {			
			options : {															//Options to configure the custom grid
				el:'', 															//Main Product List Element Selector,
				sl:'', 															//Slot List Element Selector,
				root_el:'#wrapper',												//Root element just after body
				rclass:{'4':'four_column','3':'three_column','2':'two_column'}	//responsive classes
				slot_orders:{
					'2' : [ 2, 4, 6, 8 ],
					'3' : [ 0, 1, 3, 4 ],
					'4' : [ 0, 2, 6, 8 ]
				},
				slot_class:{'two_column','two_by_two'},
				filter_el:'#left',
				filter_show_el:'.filter-show',
				filter_hide_el:'.filter'
			},
			slot_products : [],													//Products configured in slot
			dom_stack : {														//Array of each element group
				slots : [],
				group : {
					'one_column' : [],
					'two_column' : [],
					'two_by_two' : []
				}
			},			
			/**
		     * num_of_column(): function
		     *
		     */
			 numOfColumn : function(){
				var windowWidth = $(_this.options.root_el).width();
				
				if(windowWidth >= 1024 && windowWidth <= 1280){ n= 3;}
				if(windowWidth >= 768 && windowWidth <= 1024){ n= 2;}
				if(windowWidth < 768 ){ n= 1;$(_this.options.filter_el).css('display','none')}
				
				k = ($(_this.options.filter_el).css('display')==='none')?n +1:n;
				
				$(_this.options.el).removeClass(_this.options.rclass[4])
								   .removeClass(_this.options.rclass[3])
								   .removeClass(_this.options.rclass[2]);
				
				$(_this.options.el).addClass(_this.options.rclass[k]);
				
				percent = ($(_this.options.filter_el).css('display')==='none')?'100':'75';
				$('.right').css('width',percent+'%');
				
				return k;
			},
			/**
			 * checkSlotConditions(): It checks slot conditions and group the slots and product elements 
			 * 
			 * @slots : slot object
			 */
			checkSlotConditions : function(slots) {
				_this = this;
				slots.each(function(k) {
					if ($(this).children()) {
						class_name = $(this).attr('class').trim().split(' ');
						last_class = class_name[class_name.length - 1];
						// Find products exist in slots
						$(this).children('ul').children('li').each(function(k) {
							var itemid =  $(this).attr('data-itemid');
							if (typeof (itemid) !== 'undefined') {
								_this.slot_products.push(itemid);
							}
						})						
						// categories slots based on size
						// slots having class 'two_column'
						if (last_class == 'two_column'
								&& $(this).html().trim() != "") {
							_this.dom_stack.group['two_column']
									.push(slots[k].outerHTML);
						}
						// slots having class 'two_by_two'
						if (last_class == 'two_by_two'
								&& $(this).html().trim() != "") {
							_this.dom_stack.group['two_by_two']
									.push(slots[k].outerHTML);
						}
					}
				});
			},
			/**
			 * init():function to initialize the custom grid and retrieve all the required data
			 * 
			 * @container : main product grid container object
			 * @slots : slots object
			 * @class name : n column class_name
			 */
			init : function(options) {
				var _this = this;
					_this.options = options;
				
				container = $(options.el).first().children();
				slots = $(options.sl);
				// If slots are available check all slot conditions

				if (slots && slots.length >= 1 && container.length >= 1) {
					_this.checkSlotConditions(slots);
				}
				
				container.each(function(k) {
					if(_this.slot_products.indexOf($(this).attr('data-itemid'))!==-1){
						container.splice(k,1);;
					}					
				});
				_this.container = container;

				$(_this.options.filter_hide_el).on('click',function(e) {
					e.preventDefault();
					$('.leftbar').hide();				
					_this.redraw();
				});
				$(_this.options.filter_show_el).on('click',function(e) {
							e.preventDefault();
							$('.leftbar').show();				
							_this.redraw();
				});
				return this;
			},
			/**
			 * redraw(): Redraw elements in sequence instructed by user options.
			 */
			redraw : function() {
				var html = [], j = 0, row = false, tc = 0, tbt = 0, s, i = 0;
				var _this = this;
				var n = _this.numOfColumn();
				_order = _this.options.slot_orders[n];
						
				for ( var k = 0; k < _this.container.length; k++) {
					if(_this.container[k]){
					if (k == _order[j]) {
						var slot_type = (!row) ? 'two_column' : 'two_by_two';
						if (slot_type === 'two_column') {
							s = tc;
							tc++;
						} else {
							s = tbt;
							tbt++;
						}
						if (slot_type && _this.dom_stack.group[slot_type] && _this.dom_stack.group[slot_type][s]) {
							html[i] = _this.dom_stack.group[slot_type][s];
							row = !row;
							i++;
						}
						j++;
					}
					html[i] = _this.container[k].outerHTML;
					i++;
					}
				}
				$(_this.options.el).first().empty().html(html.join(' '));
			}
		}
	return app;
}(window.app = window.app || {}, jQuery));

