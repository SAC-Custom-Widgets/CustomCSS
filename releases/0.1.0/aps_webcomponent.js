(function () {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
	<form id="form">
		<fieldset>
			<legend>SVG Custom Component</legend>
			<p>Press Enter to submit, Shift-Enter for line break</p>
			<table>
				<tbody>
				<tr>
					<td>CSS</td>
					<td><textarea id="aps_css" type="text" name="css" rows="4" cols="40"></textarea></td>
				</tr>
				</tbody>
			</table>
		</fieldset>
	</form>
	`;

	class CustomcssAps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({ mode: 'open' });
			this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
			this._shadowRoot.getElementById("aps_css").addEventListener("keypress", this._submitOnEnter);
		}

		_submitOnEnter(event) {
			if (event.which === 13 && !event.shiftKey) {
				event.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
				event.preventDefault();
			}
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent('propertiesChanged', {
				detail: {
					properties: {
						css: this.css
					}
				}
			}));
			return false;
		}

		get css() {
			return this._shadowRoot.getElementById("aps_css").value;
		}

		set css(val) {
			this._shadowRoot.getElementById("aps_css").value = val;
		}

		static get observedAttributes() {
			return ['css'];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue !== newValue) {
				this[name] = newValue;
			}
		}
	}

	customElements.define('sdk-customcss-aps', CustomcssAps);
})();