﻿// Source file name: button.ts
// Author: Louis Smith
// Last modified by: Louis Smith
// Last modified date: 24/02/2015
// Description: This code creates the button objects which includes over and out functions
var objects;
(function (objects) {
    var Button = (function () {
        //CONSTRUCTOR
        function Button(path, x, y) {
            this._x = x;
            this._y = y;
            this._image = new createjs.Bitmap(path);
            this._image.x = this._x;
            this._image.y = this._y;

            this._image.addEventListener("mouseover", this._buttonOver);
            this._image.addEventListener("mouseout", this._buttonOut);
        }
        Button.prototype.setX = function (x) {
            this._x = x;
        };

        Button.prototype.getX = function () {
            return this._x;
        };

        Button.prototype.setY = function (y) {
            this._y = y;
        };

        Button.prototype.getY = function () {
            return this._y;
        };

        Button.prototype.getImage = function () {
            return this._image;
        };

        Button.prototype._buttonOut = function (event) {
            event.currentTarget.alpha = 1; // 100% Alpha
        };

        Button.prototype._buttonOver = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        return Button;
    })();
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map
