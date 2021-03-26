// Initialize a new plugin instance for all
// e.g. $('input[type="range"]') elements.
$('input[type="range"]').rangeslider();

var $rangeslider = $('#js-amount-range');
var $amount = $('#js-amount-input');

$rangeslider
.rangeslider({
    polyfill: false
})
.on('input', function() {
    $amount[0].value = this.value;
});

$amount.on('input', function() {
$rangeslider.val(this.value).change();
});

//custom slider javascript
$(function() {
var $document = $(document), $inputRange = $('input[type="range"]');
var bht = 2000; // standard billable hours/tech num
var trIn = parseFloat($('#trSlider').val());
var pmhIn = parseFloat($('#pmhSlider').val());
var buIn = parseFloat($('#buSlider').val());
var hut = Math.round(bht / pmhIn * (buIn / 100));;
var tus = trIn * hut;
var hutOut = "";
var tusOut = "";
hutOut.innerHTML = hut;
tusOut.innerHTML = tus;


//updates values of each variable based on which slider is being interacted with
function updateDependencies(element, id) {
    if (id == 'trSlider') {
        trIn = Math.round(element.value);
    }
    else if (id == 'pmhSlider') {
        pmhIn = Math.round(element.value);
    }
    else if (id == 'buSlider') {
        buIn = Math.round(element.value);
    }

    hut = Math.round(bht / pmhIn * (buIn / 100));
    tus = trIn * hut;

    textOutput(document.getElementById('hutOut'), hut);
    textOutput(document.getElementById('tusOut'), tus);
}

function textOutput(element, value) {
    element.value = value;
    var textOutput = element.getElementsByClassName('outputValue')[0];
    textOutput.innerHTML = element.value;
}

//updates values of sliders as they are interacted with
function valueOutput(element) {
    var value = element.value,
        output = element.parentNode.getElementsByClassName('inputValue')[0];
    output.innerHTML = value;
}

for (var i = $inputRange.length - 1; i >= 0; i--) {
    valueOutput($inputRange[i]);
};
$document.on('input', 'input[type="range"]', function(e) {
    var target = e.target;
    valueOutput(target);
    updateDependencies(target, target.id);
});

$inputRange.rangeslider({
  polyfill: true 
});

function init() {
    updateDependencies(document.getElementById('trSlider'), document.getElementById('trSlider').value);
    updateDependencies(document.getElementById('pmhSlider'), document.getElementById('pmhSlider').value);
    updateDependencies(document.getElementById('buSlider'), document.getElementById('buSlider').value);
}

window.onload = init;
});