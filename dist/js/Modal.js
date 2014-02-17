function Modal(userOptions) {
    'use strict';
    
    var defaultOptions = {
        width:         0,
        height:        0,
        autoDimension: true,
        locked:        false,
        title:         '',
        html:          '',
        buttons:       [],
        url:           '',
        loading_text:  'loading...'
    };

    this.options = this._merge(defaultOptions, userOptions);
    this._validate();

    this._elements = {
        mask:      this._create('mask'),
        container: this._create('container')
    };

    this._visible = false;

    this._build();
};

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

    if (options.autoDimension === true) {
        options.width = '0px';
        options.height = '0px';
    } else if (typeof options.autoDimension !== 'boolean') {
        throw "autoDimension MUST be boolean";
    } else {
        options.width = (typeof options.width === 'number') ? '' + options.width + 'px' : '';
        if (typeof options.width !== 'string') {
            throw "width MUST be a string or a number";
        } else if (options.width.indexOf('%') === -1 && options.width.indexOf('px') === -1) {
            throw "width MUST be in pt or % units"; // @todo add support to more units in the validation
        }

        options.height = (typeof options.height === 'number') ? '' + options.height + 'px' : '';
        if (typeof options.height !== 'string') {
            throw "height MUST be a string or a number";
        } else if (options.height.indexOf('%') === -1 && options.height.indexOf('px') === -1) {
            throw "height MUST be in pt or % units"; // @todo add support to more units in the validation
        }
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
 * set the modal dimensions and position on screen
 */
Modal.prototype._align = function () {
    // set width
    if (!this.options.autoDimension) {
        this._elements.container.style.width = this.options.width;
        this._elements.container.style.height = this.options.height;
    } else {
        // set heigh
        var height = 0,
            width = 0;

        var elements = ['content', 'header', 'loading', 'buttons'],
            ec = elements.length,
            i = 0;

        this._elements.container.className += ' hide-modal';
        document.body.appendChild(this._elements.container);

        for (i = 0; i < ec; i++) {
            if (this._elements.hasOwnProperty(elements[i])) {
                height += this._elements[elements[i]].offsetHeight;
                width += this._elements[elements[i]].offsetWidth;
            }
        }

        this._elements.container.remove();
        this._elements.container.className = this._elements.container.className.replace(' hide-modal', '');

        this._elements.container.style.height = height + 'px';
        this._elements.container.style.width = width + 'px';

        if (height < window.outerHeight) {
            this._elements.container.className += ' modal-centered';
        } else {
            this._elements.container.style.marginTop = '30px';
        }
    }
}

/**
 * [_build description]
 */
Modal.prototype._build = function () {
    var options = this.options,
        self = this;

    if (options.title.length) {
        this._elements.header = this._create('header', options.title);
        this._elements.container.appendChild(
            this._elements.header
        );
    }

    if (!options.locked) {
        this._elements.close = this._create('close', 'x');
        this._elements.container.appendChild(
            this._elements.close
        );
    }

    if (options.html.length) {
        this._elements.content = this._create('content', options.html);
        this._elements.container.appendChild(
            this._elements.content
        );
    } else {
        this._elements.loading = this._create('loading', options.loading_text);
        this._elements.container.appendChild(
            this._elements.loading
        );
        this._getContentFromURL(options.url, function (html) {
            if (this._visible) {
                this.update({
                    url: null,
                    html: html
                });
            }
        });
    }

    // configure events
    if (!options.locked) {
        this._elements.close.onclick = function () {
            self.close();
        }

        this._elements.mask.onclick = function () {
            self.close();
        }
    }

    this._align();
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
    if (document.body.querySelectorAll('.modal-mask'))  {
        document.body.appendChild(this._elements.mask);
    }
    document.body.appendChild(this._elements.container);
    this._visible = true;
}

Modal.prototype.update = function (options) {
    this.options = this._merge(this.options, options);
    this._elements.container.remove();
    this._elements.container.innerHTML = '';
    this._build();
    this.show();
}

Modal.prototype.close = function () {
    this._elements.container.remove();
    this._elements.mask.remove();
}


a = new Modal({
    url: 'http://localhost/modal/server.php'
    // html: '<div id="sss">sd asdsa dasdasdasd adas</div>'
});
a.show();
console.log(a);