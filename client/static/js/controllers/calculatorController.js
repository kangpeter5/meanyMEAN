function calculatorController($scope){

	// Sixteen oz
	$scope.costPerCanSixteen = function(){
		var priceSixteen = $scope.priceSixteen;
		var casesSixteen = $scope.casesSixteen;
	
		return priceSixteen/(24*casesSixteen);
	};

	// Twenty oz
	$scope.costPerCanTwenty = function(){
		var priceTwenty = $scope.priceTwenty;
		var casesTwenty = $scope.casesTwenty;
		
		return priceTwenty/(24*casesTwenty);
	};
};