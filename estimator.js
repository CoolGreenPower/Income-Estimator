//custom slider javascript
$(function() {
    
    //initializing all variables for calculations
    
    var $rangeslider = $('input[type="range"]');
    var $amount = $('input[type="number"]');
    var bht = 2000; // standard billable hours/tech num
    var trIn; // techns per reseller
    var pmhIn; // PM hours per unit per year
    var buIn; // billable utilization
    var hrcIn; // hourly rate to customers
    var thcIn; // tech hourly cost
    var bIn; // burden
    var tpcIn; // # of techs per call
    var hpCNX; // standard # of hours per CNX install

    var hut; // hvac units per tech
    var hutRounded;
    var tus; // total units to service
    var tusRounded;
    var tcb; // tech cost with burden
    var tcbRounded;
    var hutOut = "";
    var tusOut = "";
    var tcbOut = "";

    var percDXIn1; //percent DX units under PM Year 1 Input
    var percDXIn2; //percent DX units under PM Year 2 Input
    var percDXIn3; //percent DX units under PM Year 3 Input
    var percCNXIn1; //percent CNX Converted Year 1 Input
    var percCNXIn2; //percent CNX Converted Year 2 Input
    var percCNXIn3; //percent CNX Converted Year 3 Input

    var numDXOut1; //num CNX Converted Year 1 Output
    var numDXOut2; //num CNX Converted Year 2 Output
    var numDXOut3; //num CNX Converted Year 3 Output

    var incrPMProj1; //Incremental PM Projection Year 1 Output
    var incrPMProj2; //Incremental PM Projection Year 2 Output
    var incrPMProj3; //Incremental PM Projection Year 3 Output 

    //behind the scenes revenue calculations
    var revPerUnit; //Revenue per unit
    var servFeeUnit; //Service Fees per unit
    var totalRevUnit; //Total Revenue per Unit
    var costUnit; //Cost per unit
    var labCostUnit; //Loaded Labor Cost per unit
    var totalCostUnit; //Total Cost per Unit
    var gpCNXUnit; //GP per CNX Unit
    var gpCNXHour; //GP per CNX tech hour

    var resRevOut1; //subtotal reseller revenue output 1
    var resRevOut2; //subtotal reseller revenue output 2
    var resRevOut3; //subtotal reseller revenue output 3

    var resCostOut1; //subtotal reseller cost output 1
    var resCostOut2; //subtotal reseller cost output 2
    var resCostOut3; //subtotal reseller cost output 3

    var resGPOut1; //Subtotal Reseller GP output 1
    var resGPOut2; //Subtotal Reseller GP output 2
    var resGPOut3; //Subtotal Reseller GP output 3

    var incrPMRevOutput1; //Incremental PM Revenue output 1
    var incrPMRevOutput2; //Incremental PM Revenue output 2
    var incrPMRevOutput3; //Incremental PM Revenue output 3

    var incrPMCostOutput1; //Incremental PM Cost output 1
    var incrPMCostOutput2; //Incremental PM Cost output 2
    var incrPMCostOutput3; //Incremental PM Cost output 3

    var incrPMGPOutput1; //Incremental PM GP output 1
    var incrPMGPOutput2; //Incremental PM GP output 2
    var incrPMGPOutput3; //Incremental PM GP output 3

    var cnxRevOutput1; //CNX Driven Revenue output 1 
    var cnxRevOutput2; //CNX Driven Revenue output 2
    var cnxRevOutput3; //CNX Driven Revenue output 3

    var cnxGPOutput1; //CNX Driven GP output 1
    var cnxGPOutput2; //CNX Driven GP output 2
    var cnxGPOutput3; //CNX Driven GP output 3

    var cnxMarginOutput1; //CNX GP Margin output 1
    var cnxMarginOutput2; //CNX GP Margin output 2
    var cnxMarginOutput3; //CNX GP Margin output 3

    
    //adds commas as digit separators to numbers greater than 999
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    //print values for verification points section
    function textOutput(element, value) {
        element.value = value;
        var textOutput = element.getElementsByClassName('outputValue')[0];
        textOutput.innerHTML = element.value;
    }
    
    //updates values of each variable
    function setVars() {
        
        //slider/input values for unit sales and labor
        trIn = parseFloat($('#trSlider').val()); // techns per reseller
        pmhIn = parseFloat($('#pmhSlider').val()); // PM hours per unit per year
        buIn = parseFloat($('#buSlider').val()); // billable utilization
        hrcIn = parseFloat($('#hrcSlider').val()); // hourly rate to customers
        thcIn = parseFloat($('#thcSlider').val()); // tech hourly cost
        bIn = parseFloat($('#bSlider').val()); // burden
        tpcIn = parseFloat($('#tpcSlider').val()); // # of techs per call
        hpCNX = 2; // standard # of hours per CNX install
        hut = bht / pmhIn * (buIn / 100); // hvac units per tech
        hutRounded = Math.round(bht / pmhIn * (buIn / 100));
        tus = trIn * hut; // total units to service
        tusRounded = Math.round(trIn * hut);
        tcb = thcIn*(1+(bIn / 100)); // tech cost with burden
        tcbRounded = Math.round(thcIn*(1+(bIn / 100)));

        //Systems input section values 
        percDXIn1 = Math.round($('#dxDefault1').attr('value'));
        percDXIn2 = Math.round($('#dxDefault2').attr('value'));
        percDXIn3 = Math.round($('#dxDefault3').attr('value'));
        percCNXIn1 = Math.round($('#cnxDefault1').attr('value'));
        percCNXIn2 = Math.round($('#cnxDefault2').attr('value'));
        percCNXIn3 = Math.round($('#cnxDefault3').attr('value'));

        //verification points values
        hutOut.innerHTML = hut;
        tusOut.innerHTML = tus;
        tcbOut.innerHTML = tcb;
    
        textOutput(document.getElementById('hutOut'), numberWithCommas(hutRounded));
        textOutput(document.getElementById('tusOut'), numberWithCommas(tusRounded));
        textOutput(document.getElementById('tcbOut'), numberWithCommas("$" + tcbRounded));

        //output table

        //% of Units under PM
        numDXOut1 = Math.round(tus * (percDXIn1 / 100));
        numDXOut2 = Math.round(tus * (percDXIn2 / 100));
        numDXOut3 = Math.round(tus * (percDXIn3 / 100));

        //CNX % converted
        numCNXOut1 = Math.round((percCNXIn1 / 100) * numDXOut1);
        numCNXOut2 = Math.round((percCNXIn2 / 100) * numDXOut2);
        numCNXOut3 = Math.round(( percCNXIn3 / 100) * numDXOut3);

        //Incremental PM Projection
        incrPMProj1 = 0;
        incrPMProj2 = numDXOut2 - numDXOut1;
        incrPMProj3 = numDXOut3 - numDXOut1;

        //BTS Revenue Calculations
        revPerUnit = 909; //Revenue per unit
        servFeeUnit = hrcIn * hpCNX * tpcIn; //Service Fees per unit
        totalRevUnit = revPerUnit + servFeeUnit; //Total Revenue per Unit
        costUnit = 682; //Cost per unit
        labCostUnit = tcb * hpCNX * tpcIn; //Loaded Labor Cost per unit
        totalCostUnit = costUnit + labCostUnit; //Total Cost per Unit
        gpCNXUnit = totalRevUnit - totalCostUnit; //GP per CNX Unit
        gpCNXHour = gpCNXUnit/(hpCNX*tpcIn); //GP per CNX tech hour

        //Subtotal Reseller Revenue
        resRevOut1 = Math.round(numCNXOut1 * totalRevUnit); 
        resRevOut2 = Math.round(numCNXOut2 * totalRevUnit);
        resRevOut3 = Math.round(numCNXOut3 * totalRevUnit);

        //Subtotal Reseller Cost
        resCostOut1 = Math.round(numCNXOut1 * totalCostUnit);
        resCostOut2 = Math.round(numCNXOut2 * totalCostUnit);
        resCostOut3 = Math.round(numCNXOut3 * totalCostUnit);

        //Subtotal Reseller GP
        resGPOut1 = Math.round(numCNXOut1 * gpCNXUnit);
        resGPOut2 = Math.round(numCNXOut2 * gpCNXUnit);
        resGPOut3 = Math.round(numCNXOut3 * gpCNXUnit);

        //Incremental PM Revenue
        incrPMRevOutput1 = 0;
        incrPMRevOutput2 = Math.round((incrPMProj2 - incrPMProj1)*pmhIn*hrcIn);
        incrPMRevOutput3 = Math.round((incrPMProj3 - incrPMProj1)*pmhIn*hrcIn);
        
        //Incremental PM Cost
        incrPMCostOutput1 = 0;
        incrPMCostOutput2 = Math.round((incrPMProj2 - incrPMProj1)*pmhIn*tcb);
        incrPMCostOutput3 = Math.round((incrPMProj3 - incrPMProj1)*pmhIn*tcb);

        //Incremental GP Cost
        incrPMGPOutput1 = 0;
        incrPMGPOutput2 = incrPMRevOutput2 - incrPMCostOutput2;
        incrPMGPOutput3 = incrPMRevOutput3 - incrPMCostOutput3;

        //CNX Driven Revenue 
        cnxRevOutput1 = incrPMRevOutput1 + resRevOut1;
        cnxRevOutput2 = incrPMRevOutput2 + resRevOut2;
        cnxRevOutput3 = incrPMRevOutput3 + resRevOut3;

        //CNX Driven GP
        cnxGPOutput1 = incrPMGPOutput1 + resGPOut1;
        cnxGPOutput2 = incrPMGPOutput2 + resGPOut2;
        cnxGPOutput3 = incrPMGPOutput3 + resGPOut3;

        //CNX GP Margin
        cnxMarginOutput1 = Math.round((cnxGPOutput1/cnxRevOutput1)*100);
        cnxMarginOutput2 = Math.round((cnxGPOutput2/cnxRevOutput2)*100);
        cnxMarginOutput3 = Math.round((cnxGPOutput3/cnxRevOutput3)*100);


        //# of Units under PM Output
        $('#numDXOut1').html(numberWithCommas(numDXOut1));
        $('#numDXOut2').html(numberWithCommas(numDXOut2));
        $('#numDXOut3').html(numberWithCommas(numDXOut3));
        //CNX # converted Output
        $('#numCNXOut1').html(numberWithCommas(numCNXOut1));
        $('#numCNXOut2').html(numberWithCommas(numCNXOut2));
        $('#numCNXOut3').html(numberWithCommas(numCNXOut3));
        //Incremental PM Projection Output
        $('#incrPMOut1').html(numberWithCommas(incrPMProj1));
        $('#incrPMOut2').html(numberWithCommas(incrPMProj2));
        $('#incrPMOut3').html(numberWithCommas(incrPMProj3));
        //Subtotal Reseller Revenue Output
        $('#resRevOut1').html("$" + numberWithCommas(resRevOut1));
        $('#resRevOut2').html("$" + numberWithCommas(resRevOut2));
        $('#resRevOut3').html("$" + numberWithCommas(resRevOut3));
        //Incremental PM Revenue Output
        $('#incrPMRevOutput1').html("$" + numberWithCommas(incrPMRevOutput1));
        $('#incrPMRevOutput2').html("$" + numberWithCommas(incrPMRevOutput2));
        $('#incrPMRevOutput3').html("$" + numberWithCommas(incrPMRevOutput3));
        //CNX Driven Revenue Output
        $('#cnxRevOutput1').html("$" + numberWithCommas(cnxRevOutput1));
        $('#cnxRevOutput2').html("$" + numberWithCommas(cnxRevOutput2));
        $('#cnxRevOutput3').html("$" + numberWithCommas(cnxRevOutput3));
    }

    //update min/max values within systems input section, based on other input values
    function updateMinMax() {
        document.getElementById('dxNumberInput1').max = $('#dxDefault2').attr('value');
        document.getElementById('dxNumberInput2').min = $('#dxDefault1').attr('value');
        document.getElementById('dxNumberInput2').max = $('#dxDefault3').attr('value');
        document.getElementById('dxNumberInput3').min = $('#dxDefault2').attr('value');

        document.getElementById('cnxNumberInput1').max = $('#cnxDefault2').attr('value');
        document.getElementById('cnxNumberInput2').min = $('#cnxDefault1').attr('value');
        document.getElementById('cnxNumberInput2').max = $('#cnxDefault3').attr('value');
        document.getElementById('cnxNumberInput3').min = $('#cnxDefault2').attr('value');
    }
    
    
    //when slider is interacted with, calculate values
    $rangeslider
    .on('input', function(e) {
        calculate(e, this.value);
     });
    
    
    //when number input is interacted with, manage error handling and calculate when able
    $amount
    .on('input', function(e) {
        var thisError = this.parentNode.getElementsByClassName("error")[0];
        updateMinMax();

        //if input value is outside of min/max bounds, don't calculate and print error message
        if (parseInt(this.value, 10) < this.min || parseInt(this.value, 10) > this.max) {
            thisError.innerHTML = "Please enter a value between " + this.min + " and " + this.max + ".";
        }
        // if values are in bounds, calculate values and error message can be removed
        else if (parseInt(this.value, 10) >= e.target.min && parseInt(this.value, 10) <= e.target.max){
            calculate(e, this.value);
            thisError.innerHTML = "";
        }
        // if value is NaN, don't calculate and don't print error message
        else if (Number.isNaN(parseInt(this.value))) {
            thisError.innerHTML = "";
        }

    });
    
    //update new values based on selected slider or number input
    function calculate(e, newValue) {
        //slider
        if ($(e.target).attr('class') == "slider") {
            var thisInput = e.target.parentNode.getElementsByClassName("sliderInput")[0];
            thisInput.value = newValue;
        }
        //number input for slider (unit sales or labor section)
        else if ($(e.target).attr('class') == "sliderInput focus-visible") {
            var thisSlider = e.target.parentNode.getElementsByClassName("slider")[0];
            thisSlider.value = newValue;
        }
        //number input for systems section
        else if ($(e.target).attr('class') == "numInput focus-visible") {
            $(e.target.parentNode.getElementsByClassName("default")[0]).attr("value", newValue);
        }
        //reset all variables on every calculation
        setVars();
        updateMinMax();
    }

    //set all variables on page load
    $(document).ready(function() {
      setVars();
      });
});
