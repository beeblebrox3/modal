function Modal(userOptions) {
    'use strict';
    
    var defaultOptions = {
        width:   0,
        height:  0,
        locked:  false,
        title:   '',
        html:    '',
        buttons: [],
        url:     null
    };

    this.options = this._merge(defaultOptions, userOptions);
    this._validate();

    this._elements = {
        mask:      this._mask(),
        container: this._create('container')
    };

    this._build();
};

/**
 * Creates the mask
 * @return object
 */
Modal.prototype._mask = function () {
    var mask = document.querySelectorAll('.modal-mask');
    if(!mask.length) {
        mask = this._create('mask');
    }
    return mask;
}

/**
 * merge obj_a with obj_b, keeping only the keys of the obj_a and replacing
 * with the obj_b if exists
 * @param  object obj_a source object
 * @param  object obj_b new data
 * @return object
 */
Modal.prototype._merge = function (obj_a, obj_b) {
    var response = {};
    for (var i in obj_a) {
        if (obj_a.hasOwnProperty(i)) {
            if (obj_b.hasOwnProperty(i)) {
                response[i] = obj_b[i];
            } else {
                response[i] = obj_a[i];
            }
        }
    }
    return response;
};

/**
 * shortcut to create a div with a class prefix "model-"
 * @param  string className 
 * @param  string content   valid HTML
 * @return object
 */
Modal.prototype._create = function (className, content) {
    if (typeof className !== 'string' || !className.length) {
        throw "className MUST be not empty string";
    }

    var element = document.createElement('div');
    element.className = 'modal-' + className;

    if (typeof content === 'string' && content.length) {
        element.innerHTML = content;
    }

    return element;
}

/**
 * validate options
 */
Modal.prototype._validate = function () {
    var options = this.options;

    if (typeof options.width !== 'string' && typeof options.width !== 'number') {
        throw "width MUST be a string or a number";
    } else if (typeof options.width === 'int' && options.width < 1) {
        throw "width MUST be bigger than 1";
    } else if (typeof options.width === 'string ' && (options.width.indexOf('%') === -1 || options.width.indexOf('px') === -1)) {
        throw "width MUST be in pt or % units"; // @todo add support to more units in the validation
    }

    if (typeof options.height !== 'string' && typeof options.height !== 'number') {
        throw "height MUST be a string or a number";
    } else if (typeof options.height === 'int' && options.height < 1) {
        throw "height MUST be bigger than 1";
    } else if (typeof options.height === 'string ' && (options.height.indexOf('%') === -1 || options.height.indexOf('px') === -1)) {
        throw "height MUST be in pt or % units"; // @todo add support to more units in the validation
    }

    if (typeof options.locked !== 'boolean') {
        throw   "locket MUST be a boolean";
    }

    if (typeof options.title !== 'string') {
        throw "title MUST be string";
    }

    if (typeof options.html !== 'string') {
        throw "html MUST be string";
    }

    if (typeof options.url !== 'string') {
        throw "url MUST be string";
    }

    if (!options.html.length && !options.url.length) {
        throw "you MUST provide a html content or a URL";
    }
}

/**
 * [_build description]
 */
Modal.prototype._build = function () {
    if (this.options.width) {
        this._elements.container.style.width = options.width;
    }

    if (this.options.height) {
        this._elements.container.style.height = options.height;
    }

    if (this.options.title.length) {
        this._elements.container.appendChild(
            this._create('header', this.options.title)
        );
    }

    if (this.options.html.length) {
        this._elements.container.appendChild(
            this._create('content', this.options.html)
        );
    } else {
        this._elements.container.appendChild(
            this._create('loading')
        );
        this._getContentFromURL(this.options.url, function (html) {
            this.update({
                url: null,
                html: html
            });
        });
    }
}

/**
 * get the HTML content via AJAX
 * @param  string   url
 * @param  function callback
 */
Modal.prototype._getContentFromURL = function (url, callback) {
    var self = this,
        xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            return false;
        }

        if (xhr.status === 200) {
            callback.call(self, xhr.responseText);
        }
    };

    xhr.open("GET", url, true); 
    xhr.send("");
}

Modal.prototype.show = function () {
    document.body.appendChild(this._elements.container);
}

Modal.prototype.update = function (options) {
    this.options = this._merge(this.options, options);
    this._elements.container.remove();
    this._elements.container.innerHTML = '';
    this._build();
    this.show();
}


a = new Modal({
    url: 'http://localhost/modal/server.php'
});
a.show();
console.log(a);