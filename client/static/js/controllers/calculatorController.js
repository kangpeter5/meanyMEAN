function calculatorController($scope){

	// Sixteen oz
	$scope.costPerCanSixteen = function(){
		var costPerCanSixteen = 0;
		var priceSixteen = $scope.priceSixteen;
		var casesSixteen = $scope.casesSixteen;
	
		costPerCanSixteen = (priceSixteen*casesSixteen)/(24*casesSixteen);

		return costPerCanSixteen;
	};

	// Twenty oz
	$scope.costPerCanTwenty = function(){
		var costPerCanTwenty = 0;
		var priceTwenty = $scope.priceTwenty;
		var casesTwenty = $scope.casesTwenty;
		
		costPerCanTwenty = (priceTwenty*casesTwenty)/(24*casesTwenty);
		return costPerCanTwenty;
	};
};