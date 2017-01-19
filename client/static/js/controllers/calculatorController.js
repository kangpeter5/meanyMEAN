function calculatorController($scope){
	// $scope.parseFloat = function(value){
	// 	return parseFloat(value);
	// }

	// Sixteen oz
	$scope.costPerCanSixteen = function(){
		return $scope.priceSixteen/(24*$scope.casesSixteen);
	};
};