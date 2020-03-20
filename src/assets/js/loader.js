import loadingImage from "../img/loader_black.gif";

class Loader {
    constructor(options) {
        this.elements = [];
        this.loaders = [];
        this.transitionEndEventName = getTransitionEndEventName();
        this.afterShowFired = false;
        this.afterHideFired = false;
        
        this.defaultOptions = {
            image: loadingImage,
            backgroundClass: "loader_background",
            loaderClass: "loader_inner"
        };
        this.options = { ...this.defaultOptions, ...options };
    }

    create_loader() {
        console.log('loader created');
        let container = document.createElement("div");
        container.classList.add(this.options.backgroundClass);
        container.style.transition = 'all 200ms';

        let inner = document.createElement("div");
        inner.classList.add(this.options.loaderClass);

        let image = document.createElement("img");
        image.setAttribute("src", this.options.image);

        inner.appendChild(image);
        container.appendChild(inner);

        container.style.opacity = "0";

        return container;
    }

    show(options) {
        this.afterShowFired = false;
        if (options && options.elements) {
            if (options.elements.length > 1) {
                Array.from(options.elements).map((elem) => {
                    this.elements.push(elem);
                });
            } else if (options.elements instanceof HTMLElement) {
                this.elements.push(options.elements);
            }
        } else {
            this.elements.push(document.querySelector('body'));
        }

        this.elements.map((element) => {
            var loader = this.create_loader();

            if (element.tagName.toLowerCase() == 'body') {
                loader.style.top = '0';
                loader.style.left = '0';
                loader.style.width = '100%';
                loader.style.height = '100%';
                loader.style.position = "fixed";
            } else {
                loader.style.top = element.offsetTop + 'px';
                loader.style.left = element.offsetLeft + 'px';
                loader.style.height =
                    px2int(getComputedStyle(element).getPropertyValue("height")) +
                    px2int(
                        getComputedStyle(element).getPropertyValue(
                            "border-top-width"
                        )
                    ) +
                    px2int(
                        getComputedStyle(element).getPropertyValue(
                            "border-bottom-width"
                        )
                    ) + 'px';
                loader.style.width =
                    px2int(getComputedStyle(element).getPropertyValue("width")) +
                    px2int(
                        getComputedStyle(element).getPropertyValue(
                            "border-left-width"
                        )
                    ) +
                    px2int(
                        getComputedStyle(element).getPropertyValue(
                            "border-right-width"
                        )
                    ) +
                    "px";
                loader.style.position = "absolute";

                loader.style.padding = getComputedStyle(element).getPropertyValue("padding");
            }

            this.loaders.push(loader);
            document.querySelector("body").append(loader);

            if (options && options.after && typeof options.after == "function") {
                if (this.loaders.length >= this.elements.length) {
                    loader.addEventListener(this.transitionEndEventName, () => {
                        console.log("show fired");
                        if (!this.afterShowFired) {
                            options.after();
                            this.afterShowFired = true;
                        }
                        loader.removeEventListener(this.transitionEndEventName, null );
                    });
                }
            }
            
            setTimeout(() => {
                loader.style.opacity = "1";
            }, 10);
        });
    };

    hide(options) {
        this.afterHideFired = false;
        if (this.loaders) {
            this.loaders.map((element) => {
                element.addEventListener(this.transitionEndEventName, () => {
                    this.loaders.shift();
                    this.elements.shift();
                    if (options && options.after && typeof options.after == "function") {
                        if (this.loaders.length < 1 && !this.afterHideFired) {
                            options.after();
                            this.afterHideFired = true;
                        }
                    }
                    element.removeEventListener(this.transitionEndEventName, null);
                    element.remove();
                });

                setTimeout(() => {
                    element.style.opacity = "0";
                }, 10);
			});
		}
	}
}

function px2int(string) {
    return parseInt(string.replace('px', ''));
}

function getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }
    let bodyStyle = document.body.style;
    for(let transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
}

export default Loader;