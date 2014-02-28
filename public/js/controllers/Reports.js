/* Controllers */
  
angular.module('myApp.controllers.Reports', [])
.controller('ReportsCtrl', [
           '$log', '$scope', '$routeParams', '$location',
           'API', 'Timesheet', 'TimesheetUtil',
           'Project', 'User', 
function($log, $scope, $routeParams, $location, API) {

    // $('.datepicker').datepicker().on('changeDate', function(){
    //  $scope.today = this.value;
    // });

    var today = new Date();
    $scope.startdate = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    $scope.enddate = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    $scope.code;


    var selectedGroup = [];
    var reports;
    API.getReports(function(data){
        reports = $.extend({},data);
        $scope.reports = $.extend({},reports);
        $scope.reportsGroup = arrayToGroups(data,4);
        console.log($scope.reportsGroup.length)
    });


    function arrayToGroups(source, groups) {  
        var grouped = [];
        groupSize = Math.ceil(source.length/groups);
        var queue = source;
        for (var r=0;r<groups;r++) {
            grouped.push(queue.splice(0, groupSize));           
        }       
        return grouped;
    }       

    $scope.select = function(selected){

            if(!hasItem()){
                selectedGroup.push(selected);
            }

            selectedGroup.sort(function(a, b) {
                var nameA = a.description.toLowerCase();
                var nameB = b.description.toLowerCase(); 
                if(nameA === nameB) return 0; 
                return nameA > nameB ? 1 : -1;
            });
            $scope.reports = [];
            $scope.reports = selectedGroup;

            function hasItem(){
                var found = false;
                selectedGroup.forEach(function(el, idx){
                    if(el.code == selected.code){
                        selectedGroup.splice(idx,1);
                        found = true;
                    }
                })
                return found;
            }
        
    }

    $scope.showUserReports = function(selected){
        $('.nav-tabs li:eq(1) a').tab('show')
        $scope.selected = selected;
        // var date = new Date($scope.date);
        var startdate2 = moment($scope.startdate, 'DD-MM-YYYY');
        var customStartDate = new Date(startdate2)

        var enddate2 = moment($scope.enddate, 'DD-MM-YYYY');
        var customEndDate = new Date(enddate2)
        var option = $scope.selectoption

        $scope.userReports = [];
        $scope.userReports = API.getUserReports(option,selected, customStartDate, customEndDate, function(data){})
    }


     

}]);

