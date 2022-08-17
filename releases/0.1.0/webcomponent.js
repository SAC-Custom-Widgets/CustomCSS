(function () {
	class Customcss extends HTMLElement {

		constructor() {
			super();
			this.ID = 'sapCustomCssCustomWidgetStyle';
		}

		//desctructor
		disconnectedCallback() {
			var style = document.getElementById(this.ID);
			if (style) {
				document.head.removeChild(style);
			}
		}

		get css() {
			var style = document.getElementById(this.ID);
			if (style) {
				return style.innerHTML;
			}
			return '';
		}

		set css(val) {
			var style = document.getElementById(this.ID);
			if (!style) {
				style = document.createElement('style');
				style.id = this.ID;
				document.head.appendChild(style);
			}

			style.innerHTML = val;
		}


	}

	customElements.define('sdk-customcss', Customcss);
})();