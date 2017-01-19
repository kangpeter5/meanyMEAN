function calculatorController($scope){
	var costPerCanSixteen;
	var costPerCanTwenty;
	var profitSixteen;
	var profitTwenty;
	var priceSixteen;
	var casesSixteen;
	var priceTwenty;
	var casesTwenty;
	var profitDisplay;
	var profitMargin;
	
	// Sixteen oz
	$scope.costPerCanSixteen = function(){
		priceSixteen = $scope.priceSixteen;
		casesSixteen = $scope.casesSixteen;
	
		if (isNaN(costPerCanSixteen)) {
			costPerCanSixteen = 0;
		}else{
			costPerCanSixteen = (priceSixteen*casesSixteen)/(24*casesSixteen);
			costPerCanSixteen = costPerCanSixteen.toFixed(4);
		}
		return costPerCanSixteen;
	};

	// Twenty oz
	$scope.costPerCanTwenty = function(){
		priceTwenty = $scope.priceTwenty;
		casesTwenty = $scope.casesTwenty;
		
		if (isNaN(costPerCanTwenty)) {
			costPerCanTwenty = 0;
		}else{
			costPerCanTwenty = (priceTwenty*casesTwenty)/(24*casesTwenty);
			costPerCanTwenty = costPerCanTwenty.toFixed(4);
		}
		return costPerCanTwenty;
	};

	// Total
	$scope.costToRetail = function(){
		var costToRetail = 4.29+6.33/2;
		return costToRetail;
	}
	$scope.profitSixteen = function(priceSixteen, casesSixteen){
		if (isNaN(profitSixteen)) {
			profitSixteen = 0;
		}else{
			profitSixteen = priceSixteen - (priceSixteen*casesSixteen)/(24*casesSixteen);
			profitSixteen = profitSixteen.toFixed(4);
		}
		return profitSixteen;
	}
	$scope.profitTwenty = function(priceTwenty, casesTwenty){
		if (isNaN(profitTwenty)) {
			profitTwenty = 0;
		}else{
			profitTwenty = priceTwenty - (priceTwenty*casesTwenty)/(24*casesTwenty);
			profitTwenty = profitTwenty.toFixed(4);
		}
		return profitTwenty;
	}
	$scope.profitDisplay = function(casesSixteen, casesTwenty,profitSixteen, profitTwenty){
		if (isNaN(profitDisplay)) {
			profitDisplay = 0;
		}else{
			profitDisplay = (casesSixteen*12)*profitSixteen + (casesTwenty*12)*profitTwenty;
			profitDisplay = profitDisplay.toFixed(5);
		}
		return profitDisplay;
	}
	$scope.profitMargin = function(profitDisplay, revenue){
		if (isNaN(profitMargin)) {
			profitMargin = 0;
		}else{
			profitMargin = profitDisplay / revenue;
			profitMargin = profitMargin.toFixed(5);
		}
		return profitMargin;
	}
};