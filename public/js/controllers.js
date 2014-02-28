'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

controller('ProjectListCtrl', [
          '$scope',
          function($scope){
            $scope.list = "list";
          
}]).

controller('UserListCtrl  ', [
          '$scope',
          function($scope){
            $scope.list = "list";
          
}]).

controller('MyTimesheetCtrl', [
           '$scope', '$location', 'myProfile',
  function($scope, $location, myProfile) {
    $scope.singleMode = true;
    $scope.myProfile = myProfile;
    $scope.timesheetUser = 'mine';
}]).

controller('OtherTimesheetCtrl', [
           '$scope', '$location', '$routeParams',
           'TimesheetPath',
           'myProfile',
  function($scope, $location, $routeParams,
           TimesheetPath,
           myProfile) {

    $scope.singleMode = false;
    $scope.myProfile = myProfile;
    $scope.timesheetUser = $routeParams.user;

    if (!$scope.timesheetUser) {
      var path= TimesheetPath.thisWeekPath($scope.myProfile.identifier);
      $location.path(path);
      return;
    }
}]).

controller('WeeklyTimesheetCtrl', [
           '$log', '$scope', '$routeParams', '$location',
           'TimesheetPath', 'Timesheet', 'TimesheetUtil',
           'Project', 'User',
  function($log, $scope, $routeParams, $location,
           TimesheetPath, Timesheet, TimesheetUtil,
           Project, User) {

    var year = $routeParams.year, isoWeek = $routeParams.isoWeek;
    var timer;
    if (!isoWeek || !year) {
      $location.path(TimesheetPath.thisWeekPath($scope.timesheetUser));
      return;
    }

    if (!$scope.singleMode) {
      $scope.users = User.all();
    }

    $scope.projects = Project.all();
    $scope.timesheet = Timesheet.forWeek($scope.timesheetUser, year, isoWeek);
    $scope.dates = TimesheetUtil.datesForWeek(year, isoWeek);
    $scope.nextWeekPath = TimesheetPath.nextWeekPath($scope.timesheetUser, year, isoWeek);
    $scope.prevWeekPath = TimesheetPath.prevWeekPath($scope.timesheetUser, year, isoWeek);

    $scope.canEdit = ($scope.singleMode || (!$scope.singleMode && $scope.myProfile.canEditTimesheets));
    $scope.cantEdit = !$scope.singleMode;
    $scope.buttonname = "btn info-active btn-default"
    $scope.switchUser = function() {
      $location.path(TimesheetPath.weekPath(
        $scope.timesheetUser, year, isoWeek));
    };

    $scope.goToDate = function() {
      var date = moment($scope.dateToGo, 'DD-MM-YYYY');
      if (date.isValid()) {
        $location.path(
          TimesheetPath.weekPath($scope.timesheetUser, date.year(), date.isoWeek()) );
      }
    };

    $scope.saveDayEntry = function(entry, dayEntry, el) {
       clearTimeout(timer);
       timer = setTimeout(function(){
         parseInt(dayEntry.hours) <= 24 ? Timesheet.saveDailyEntry($scope.timesheet, entry, dayEntry) : '';
       },600)
    };

     $scope.validateBlur = function(dayEntry){
       var hours = parseInt(dayEntry);
       return hours > 24 ? 'error' : '';
     };

    $scope.addTimesheetEntry = function() {
      Timesheet.createWeeklyEntry($scope.timesheet);
    };

    $scope.removeTimesheetEntry = function(index) {
      Timesheet.removeWeeklyEntry($scope.timesheet,
                                  $scope.timesheet.entries[index]);
      $scope.timesheet.entries.splice(index, 1);
    };

    $scope.updateProjectCode = function(entry) {
      Timesheet.saveWeeklyEntry($scope.timesheet, entry);
    };

    $scope.newProject = function(entry) {
      var description = prompt("New project description", "");
      if (description) {
        $scope.projects.push(
          Project.createTempProject(description));
      }
    };

    $scope.copyLastTimesheet = function() {
      Timesheet.copyLastTimesheet($scope.timesheet);
    };

    $scope.unlock = function() {
      $scope.cantEdit = !$scope.cantEdit;

      if( $scope.buttonname == "btn info-active btn-default"){
        $scope.buttonname = "btn info-active";
      }
      else{
        $scope.buttonname = "btn info-active btn-default";
      }
      };

  }])
