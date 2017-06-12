var DatePicker = function(container) {
	this.container = container;
	this.currentDate = new Date();
	this.dayContainer = null;
	this.data = [[]];
	this.init();
}

DatePicker.prototype = {
	weeks: ['日','一','二','三','四','五','六'],
	init: function() {
		var self = this;
		var wrapEle = document.createElement('div');
		var headEle = document.createElement('div');
		var weekEle = document.createElement('div');
		var preEle = document.createElement('div');
		var nextEle = document.createElement('div');
		var headContent = document.createElement('span');
		this.dayContainer = document.createElement('div');
		preEle.innerHTML = '&lt;';
		nextEle.innerHTML = '&gt;';
		preEle.style.width = '50px';
		preEle.style.height = '50px';
		nextEle.style.width = '50px';
		nextEle.style.height = '50px';
		preEle.style.float = 'left';
		nextEle.style.float = 'right';
		wrapEle.style.width = '350px';
		wrapEle.style.height = '400px';
		wrapEle.style.border = '2px solid #dadbdb';
		wrapEle.style.margin = '0 auto';
		headEle.style.height = '50px';
		headEle.style.background = '#f1404b';
		headEle.style.textAlign = 'center';
		headEle.style.lineHeight = '50px';
		headEle.style.color = '#fff';
		headEle.style.fontSize = '20px';
		headEle.style.cursor = 'pointer';
		preEle.className = 'head-pre';
		nextEle.className = 'head-next';
		headEle.className = 'head-title';
		headContent.className = 'head-content';
		headEle.appendChild(preEle);
		headEle.appendChild(nextEle);
		headEle.appendChild(headContent);
		wrapEle.appendChild(headEle);
		this.container.appendChild(wrapEle);

		// 渲染星期
		this.weeks.forEach(function (item, index) {
			var ele = self.createDay();
			if (index === 0 || index === 6) {
				ele.style.color = '#f1404b';
			}
			ele.innerHTML = item;
			weekEle.appendChild(ele);
			console.log(item,ele)
		});
		
		wrapEle.appendChild(weekEle);
		wrapEle.appendChild(this.dayContainer);
		this.renderCalendar(this.currentDate);
		// 点击上一月
		document.querySelector('.head-pre').addEventListener('click', function() {
			self.preMonth();
		}, false);
		// 点击下一月
		document.querySelector('.head-next').addEventListener('click', function() {
			self.nextMonth();
		}, false);
		// 点击日期
		this.dayContainer.addEventListener('click', function(e) {
			if(e.target.nodeName == 'SPAN') {
				self.selectDate(e);
			}
		}, false);


	},
	createDay: function() { 
		var dayEle = document.createElement('span');
		dayEle.style.width = '50px';
		dayEle.style.height = '50px';
		dayEle.style.display = 'inline-block';
		dayEle.style.textAlign = 'center';
		dayEle.style.lineHeight = '50px';
		return dayEle;
	},
	preMonth: function() {
		var preMonth = this.currentDate.getMonth() - 1;
		this.currentDate.setMonth(preMonth);
		this.renderCalendar(this.currentDate);
	},
	nextMonth: function() {
		var nextMonth = this.currentDate.getMonth() + 1;
		this.currentDate.setMonth(nextMonth);
		this.renderCalendar(this.currentDate);
	},
	selectDate: function(e) {
		var allDay = document.querySelectorAll('.day');
		var dateArr = Array.prototype.slice.call(allDay,0);
		var selectIndex = dateArr.indexOf(e.target);//当前选择
		var index = 0;
		for(var i = 0,l = this.data.length;i < l; i++) {
			for (var j = 0,len = this.data[i].length; j < len; j++) {
				if(index === selectIndex) {
					console.log(this.data[i][j])
					this.currentDate = new Date(this.data[i][j])
					this.renderCalendar(this.currentDate);
				}
				index++;
			}
		}
		return this.currentDate;
	},
	renderCalendar: function(date) {
		var self = this;
		this.data = [[]];
		this.dayContainer.innerHTML = '';
		var headContent = document.querySelector('.head-content');
		var days = document.querySelectorAll('.day');
		headContent.innerHTML = date.getFullYear() + '年' + (date.getMonth()+1) + '月';

		var year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate(),
			current = new Date(year, month, day),
			week = 0,
			preMonthDay = new Date(year, month, 0).getDate(),
			currentMonthDay = new Date(year, month+1 ,0).getDate(),
			lenPreMonth = new Date(year, month, 1).getDay();
		// 第一周中上月日期
		for (var i=0;i<lenPreMonth;i++) {
			this.data[0].push(new Date(year, month-1, preMonthDay - lenPreMonth + i + 1));
		}
		// 当前月日期
		for (var i=0;i<currentMonthDay;i++) {
			var currentMonthDate = new Date(year, month, i+1);

			if(!currentMonthDate.getDay()) {
				week++;
				this.data.push([]);
			}
			this.data[week].push(currentMonthDate);
		}
		var lenNextMonth = 7 - this.data[week].length;
		// 最后一周中下月日期
		for(var i = 0;i<lenNextMonth;i++) {
			this.data[week].push(new Date(year, month+1, i+1));
		}

		for(var i = 0,l = this.data.length;i < l; i++) {
			for (var j = 0,len = this.data[i].length; j < len; j++) {
				var ele =self.createDay();
				ele.className = 'day';
				ele.style.cursor = 'pointer';
				ele.innerHTML = this.data[i][j].getDate();
				this.dayContainer.appendChild(ele);
				
				// 周末日期样式
				if(this.data[i][j].getDay() === 0 || this.data[i][j].getDay() === 6) {
					ele.style.color = '#f1404b';
				}
				// 非当前月份日期样式
				if(this.data[i][j].getMonth() !== date.getMonth()) {
					ele.style.color = '#dadbdb';
				}

				// 当前日期样式
				if(this.data[i][j].getTime() === current.getTime()) {
					console.log(date)
					ele.style.background = '#f1404b';
					ele.style.borderRadius = '50%';
					ele.style.color = '#ffffff';
				}
			}
		}



	}
}