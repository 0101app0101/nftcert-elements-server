String.prototype.format = function () {
    var val1 = arguments;
    return this.replace(/{(\d+)}/g, function (get, number) {
      return typeof val1[number] != "undefined" ? val1[number] : get;
    });
  };