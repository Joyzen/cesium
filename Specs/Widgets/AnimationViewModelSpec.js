/*global defineSuite*/
defineSuite([
             'Widgets/AnimationViewModel',
             'Widgets/ClockViewModel',
             'Core/JulianDate',
             'Core/ClockStep',
             'Core/ClockRange',
             'Core/Math'
            ], function(
              AnimationViewModel,
              ClockViewModel,
              JulianDate,
              ClockStep,
              ClockRange,
              CesiumMath) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    function verifyPausedState(viewModel) {
        expect(viewModel.pauseViewModel.toggled()).toEqual(true);
        expect(viewModel.playReverseViewModel.toggled()).toEqual(false);
        expect(viewModel.playForwardViewModel.toggled()).toEqual(false);
        expect(viewModel.playRealtimeViewModel.toggled()).toEqual(false);
    }

    function verifyForwardState(viewModel) {
        expect(viewModel.pauseViewModel.toggled()).toEqual(false);
        expect(viewModel.playReverseViewModel.toggled()).toEqual(false);
        expect(viewModel.playForwardViewModel.toggled()).toEqual(true);
        expect(viewModel.playRealtimeViewModel.toggled()).toEqual(false);
    }

    function verifyReverseState(viewModel) {
        expect(viewModel.pauseViewModel.toggled()).toEqual(false);
        expect(viewModel.playReverseViewModel.toggled()).toEqual(true);
        expect(viewModel.playForwardViewModel.toggled()).toEqual(false);
        expect(viewModel.playRealtimeViewModel.toggled()).toEqual(false);
    }

    function verifyRealtimeState(viewModel) {
        expect(viewModel.pauseViewModel.toggled()).toEqual(false);
        expect(viewModel.playReverseViewModel.toggled()).toEqual(false);
        expect(viewModel.playForwardViewModel.toggled()).toEqual(false);
        expect(viewModel.playRealtimeViewModel.toggled()).toEqual(true);
    }

    it('constructor sets expected properties', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);
        expect(animationViewModel.clockViewModel).toBe(clockViewModel);
    });

    it('setTimeFormatter overrides the default formatter', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);

        var expectedString = 'My Time';
        var myCustomFormatter = function(date) {
            expect(date).toEqual(clockViewModel.currentTime());
            return expectedString;
        };
        animationViewModel.setTimeFormatter(myCustomFormatter);

        expect(animationViewModel.timeLabel()).toEqual(expectedString);
        expect(animationViewModel.getTimeFormatter()).toEqual(myCustomFormatter);
    });

    it('defaultTimeFormatter produces expected result', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);

        var date = JulianDate.fromIso8601('2012-03-05T06:07:08.89Z');

        clockViewModel.multiplier(1);
        var expectedResult = '06:07:08 UTC';
        var result = animationViewModel.getTimeFormatter()(date);
        expect(result).toEqual(expectedResult);

        clockViewModel.multiplier(-1);
        expectedResult = '06:07:08 UTC';
        result = animationViewModel.getTimeFormatter()(date);
        expect(result).toEqual(expectedResult);

        clockViewModel.multiplier(-0.5);
        expectedResult = '06:07:08.890';
        result = animationViewModel.getTimeFormatter()(date);
        expect(result).toEqual(expectedResult);

        clockViewModel.multiplier(0.5);
        expectedResult = '06:07:08.890';
        result = animationViewModel.getTimeFormatter()(date);
        expect(result).toEqual(expectedResult);
    });

    it('setDateFormatter overrides the default formatter', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);

        var expectedString = 'My Date';
        var myCustomFormatter = function(date) {
            expect(date).toEqual(clockViewModel.currentTime());
            return expectedString;
        };
        animationViewModel.setDateFormatter(myCustomFormatter);

        expect(animationViewModel.dateLabel()).toEqual(expectedString);
        expect(animationViewModel.getDateFormatter()).toEqual(myCustomFormatter);
    });

    it('defaultDateFormatter produces expected result', function() {
        var animationViewModel = new AnimationViewModel(new ClockViewModel());

        var date = JulianDate.fromIso8601('2012-01-05T06:07:08.89Z');
        var expectedResult = 'Jan 5 2012';
        var result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-02-05T06:07:08.89Z');
        expectedResult = 'Feb 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-03-05T06:07:08.89Z');
        expectedResult = 'Mar 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-04-05T06:07:08.89Z');
        expectedResult = 'Apr 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-05-05T06:07:08.89Z');
        expectedResult = 'May 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-06-05T06:07:08.89Z');
        expectedResult = 'Jun 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-07-05T06:07:08.89Z');
        expectedResult = 'Jul 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-08-05T06:07:08.89Z');
        expectedResult = 'Aug 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-09-05T06:07:08.89Z');
        expectedResult = 'Sep 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-10-05T06:07:08.89Z');
        expectedResult = 'Oct 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-11-05T06:07:08.89Z');
        expectedResult = 'Nov 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);

        date = JulianDate.fromIso8601('2012-12-05T06:07:08.89Z');
        expectedResult = 'Dec 5 2012';
        result = animationViewModel.getDateFormatter()(date);
        expect(result).toEqual(expectedResult);
    });

    it('correctly formats speed label', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);
        var expectedString;

        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.multiplier(123.1);
        expectedString = '123.100x';
        expect(animationViewModel.speedLabel()).toEqual(expectedString);

        clockViewModel.clockStep(ClockStep.SYSTEM_CLOCK_TIME);
        expectedString = 'Today';
        expect(animationViewModel.speedLabel()).toEqual(expectedString);

        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.multiplier(15);
        expectedString = '15x';
        expect(animationViewModel.speedLabel()).toEqual(expectedString);
    });

    it('pause button restores current state', function() {
        var clockViewModel = new ClockViewModel();
        clockViewModel.startTime(JulianDate.fromIso8601("2012-01-01T00:00:00"));
        clockViewModel.stopTime(JulianDate.fromIso8601("2012-01-02T00:00:00"));
        clockViewModel.currentTime(JulianDate.fromIso8601("2012-01-01T12:00:00"));
        clockViewModel.multiplier(1);
        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.clockRange(ClockRange.UNBOUNDED);
        clockViewModel.shouldAnimate(false);

        var viewModel = new AnimationViewModel(clockViewModel);

        //Starts out paused
        verifyPausedState(viewModel);

        //Toggling paused restores state when animating forward
        viewModel.pauseViewModel.command.execute();

        verifyForwardState(viewModel);

        //Executing paused command restores paused state
        viewModel.pauseViewModel.command.execute();

        verifyPausedState(viewModel);

        //Setting the multiplier to negative and unpausing animates backward
        clockViewModel.multiplier(-1);
        viewModel.pauseViewModel.command.execute();

        verifyReverseState(viewModel);
    });

    it('animating forwards negates the multiplier if it is positive', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);
        var multiplier = -100;
        clockViewModel.multiplier(multiplier);
        viewModel.playForwardViewModel.command.execute();
        expect(clockViewModel.multiplier()).toEqual(-multiplier);
    });

    it('animating backwards negates the multiplier if it is positive', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);
        var multiplier = 100;
        clockViewModel.multiplier(multiplier);
        viewModel.playReverseViewModel.command.execute();
        expect(clockViewModel.multiplier()).toEqual(-multiplier);
    });

    it('animating backwards pauses with a bounded startTime', function() {
        var centerTime = JulianDate.fromIso8601("2012-01-01T12:00:00");

        var clockViewModel = new ClockViewModel();
        clockViewModel.startTime(JulianDate.fromIso8601("2012-01-01T00:00:00"));
        clockViewModel.stopTime(JulianDate.fromIso8601("2012-01-02T00:00:00"));
        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.currentTime(centerTime);
        clockViewModel.shouldAnimate(false);

        var viewModel = new AnimationViewModel(clockViewModel);
        verifyPausedState(viewModel);

        //Play in reverse while clamped
        clockViewModel.multiplier(-1);
        clockViewModel.clockRange(ClockRange.CLAMPED);
        viewModel.playReverseViewModel.command.execute();

        verifyReverseState(viewModel);

        //Set current time to start time
        clockViewModel.currentTime(clockViewModel.startTime());

        //Should now be paused
        verifyPausedState(viewModel);

        //Animate in reverse again.
        clockViewModel.currentTime(centerTime);
        clockViewModel.clockRange(ClockRange.LOOP_STOP);
        viewModel.playReverseViewModel.command.execute();

        verifyReverseState(viewModel);

        //Set current time to start time
        clockViewModel.currentTime(clockViewModel.startTime());

        //Should now be paused
        verifyPausedState(viewModel);

        //Reversing in start state while bounded should have no affect
        viewModel.playReverseViewModel.command.execute();
        verifyPausedState(viewModel);

        //Set to unbounded and reversing should be okay
        clockViewModel.clockRange(ClockRange.UNBOUNDED);
        viewModel.playReverseViewModel.command.execute();
        verifyReverseState(viewModel);
    });

    it('dragging shuttle ring does not pause with bounded start or stop Time', function() {
        var centerTime = JulianDate.fromIso8601("2012-01-01T12:00:00");

        var clockViewModel = new ClockViewModel();
        clockViewModel.startTime(JulianDate.fromIso8601("2012-01-01T00:00:00"));
        clockViewModel.stopTime(JulianDate.fromIso8601("2012-01-02T00:00:00"));
        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.clockRange(ClockRange.CLAMPED);
        clockViewModel.multiplier(1);

        var viewModel = new AnimationViewModel(clockViewModel);
        verifyPausedState(viewModel);

        //Play forward while clamped
        clockViewModel.currentTime(centerTime);
        viewModel.playForwardViewModel.command.execute();
        verifyForwardState(viewModel);

        //Set current time to stop time, which won't stop while dragging
        viewModel.shuttleRingDragging(true);
        clockViewModel.currentTime(clockViewModel.stopTime());
        verifyForwardState(viewModel);

        //Drag complete stops.
        viewModel.shuttleRingDragging(false);
        verifyPausedState(viewModel);

        //Do the same thing with start time
        clockViewModel.currentTime(centerTime);
        viewModel.playReverseViewModel.command.execute();
        verifyReverseState(viewModel);

        viewModel.shuttleRingDragging(true);
        clockViewModel.currentTime(clockViewModel.startTime());
        verifyReverseState(viewModel);

        //Drag complete stops.
        viewModel.shuttleRingDragging(false);
        verifyPausedState(viewModel);

    });

    it('animating forward pauses with a bounded stopTime', function() {
        var centerTime = JulianDate.fromIso8601("2012-01-01T12:00:00");

        var clockViewModel = new ClockViewModel();
        clockViewModel.startTime(JulianDate.fromIso8601("2012-01-01T00:00:00"));
        clockViewModel.stopTime(JulianDate.fromIso8601("2012-01-02T00:00:00"));
        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.currentTime(centerTime);
        clockViewModel.shouldAnimate(false);

        var viewModel = new AnimationViewModel(clockViewModel);
        verifyPausedState(viewModel);

        //Play forward while clamped
        clockViewModel.multiplier(1);
        clockViewModel.clockRange(ClockRange.CLAMPED);
        viewModel.playForwardViewModel.command.execute();

        verifyForwardState(viewModel);

        //Set current time to stop time
        clockViewModel.currentTime(clockViewModel.stopTime());

        //Should now be paused
        verifyPausedState(viewModel);

        //Playing in stop state while bounded should have no affect
        viewModel.playForwardViewModel.command.execute();
        verifyPausedState(viewModel);

        //Set to unbounded and playing should be okay
        clockViewModel.clockRange(ClockRange.UNBOUNDED);
        viewModel.playForwardViewModel.command.execute();
        verifyForwardState(viewModel);
    });

    it('slower has no affect if at the slowest speed', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);
        var slowestSpeed = AnimationViewModel._shuttleRingTicks[0];
        clockViewModel.multiplier(slowestSpeed);
        viewModel.slower.execute();
        expect(clockViewModel.multiplier()).toEqual(slowestSpeed);
    });

    it('faster has no affect if at the faster speed', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);
        var fastestSpeed = AnimationViewModel._shuttleRingTicks[AnimationViewModel._shuttleRingTicks.length - 1];
        clockViewModel.multiplier(fastestSpeed);
        viewModel.faster.execute();
        expect(clockViewModel.multiplier()).toEqual(fastestSpeed);
    });

    it('slower and faster cycle threw defined multipliers', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);

        var i = 0;
        var multipliers = AnimationViewModel._shuttleRingTicks;
        var length = multipliers.length;

        //Start at slowest speed
        clockViewModel.multiplier(multipliers[0]);

        //Cycle through them all with faster
        for (i = 1; i < length; i++) {
            viewModel.faster.execute();
            expect(clockViewModel.multiplier()).toEqual(multipliers[i]);
        }

        //We should be at the fastest time now.
        expect(clockViewModel.multiplier()).toEqual(multipliers[length - 1]);

        //Cycle through them all with slower
        for (i = length - 2; i >= 0; i--) {
            viewModel.slower.execute();
            expect(clockViewModel.multiplier()).toEqual(multipliers[i]);
        }

        //We should be at the slowest time now.
        expect(clockViewModel.multiplier()).toEqual(multipliers[0]);
    });

    it('Realtime canExecute depends on clock settings', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);

        //UNBOUNDED but available when start/stop time does not include realtime
        clockViewModel.systemTime(new JulianDate());
        clockViewModel.clockRange(ClockRange.UNBOUNDED);
        clockViewModel.startTime(clockViewModel.systemTime().addSeconds(-60));
        clockViewModel.stopTime(clockViewModel.systemTime().addSeconds(-30));
        expect(viewModel.playRealtimeViewModel.command.canExecute()).toEqual(true);

        //CLAMPED but unavailable when start/stop time does not include realtime
        clockViewModel.clockRange(ClockRange.CLAMPED);
        clockViewModel.startTime(clockViewModel.systemTime().addSeconds(-60));
        clockViewModel.stopTime(clockViewModel.systemTime().addSeconds(-30));
        expect(viewModel.playRealtimeViewModel.command.canExecute()).toEqual(false);

        //CLAMPED but available when start/stop time includes realtime
        clockViewModel.clockRange(ClockRange.CLAMPED);
        clockViewModel.startTime(clockViewModel.systemTime().addSeconds(-60));
        clockViewModel.stopTime(clockViewModel.systemTime().addSeconds(60));
        expect(viewModel.playRealtimeViewModel.command.canExecute()).toEqual(true);

        //LOOP_STOP but unavailable when start/stop time does not include realtime
        clockViewModel.clockRange(ClockRange.LOOP_STOP);
        clockViewModel.startTime(clockViewModel.systemTime().addSeconds(-60));
        clockViewModel.stopTime(clockViewModel.systemTime().addSeconds(-30));
        expect(viewModel.playRealtimeViewModel.command.canExecute()).toEqual(false);

        //LOOP_STOP but available when start/stop time includes realtime
        clockViewModel.clockRange(ClockRange.LOOP_STOP);
        clockViewModel.startTime(clockViewModel.systemTime().addSeconds(-60));
        clockViewModel.stopTime(clockViewModel.systemTime().addSeconds(60));
        expect(viewModel.playRealtimeViewModel.command.canExecute()).toEqual(true);
    });

    it('User action breaks out of realtime mode', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);
        clockViewModel.clockStep(ClockStep.TICK_DEPENDENT);
        clockViewModel.clockRange(ClockRange.UNBOUNDED);

        viewModel.playRealtimeViewModel.command.execute();
        verifyRealtimeState(viewModel);
        expect(clockViewModel.multiplier()).toEqual(1);

        //Pausing breaks realtime state
        viewModel.pauseViewModel.command.execute();
        verifyPausedState(viewModel);
        expect(clockViewModel.multiplier()).toEqual(1);

        viewModel.playRealtimeViewModel.command.execute();
        verifyRealtimeState(viewModel);

        //Reverse breaks realtime state
        viewModel.playReverseViewModel.command.execute();
        verifyReverseState(viewModel);
        expect(clockViewModel.multiplier()).toEqual(-1);

        viewModel.playRealtimeViewModel.command.execute();
        verifyRealtimeState(viewModel);

        //Play breaks realtime state
        viewModel.playForwardViewModel.command.execute();
        verifyForwardState(viewModel);
        expect(clockViewModel.multiplier()).toEqual(1);

        viewModel.playRealtimeViewModel.command.execute();
        verifyRealtimeState(viewModel);

        //Shuttle ring change breaks realtime state
        viewModel.shuttleRingAngle(viewModel.shuttleRingAngle() + 1);
        verifyForwardState(viewModel);
    });

    it('Shuttle ring angles set expected multipliers', function() {
        var clockViewModel = new ClockViewModel();
        var viewModel = new AnimationViewModel(clockViewModel);

        //Max angle should produce max speed
        viewModel.shuttleRingAngle(AnimationViewModel._maxShuttleRingAngle);
        expect(clockViewModel.multiplier()).toEqual(AnimationViewModel._shuttleRingTicks[AnimationViewModel._shuttleRingTicks.length - 1]);

        //Min angle should produce min speed
        viewModel.shuttleRingAngle(-AnimationViewModel._maxShuttleRingAngle);
        expect(clockViewModel.multiplier()).toEqual(AnimationViewModel._shuttleRingTicks[0]);

        //Angles less than 1 are equivalent to the speed
        viewModel.shuttleRingAngle(0.5);
        expect(clockViewModel.multiplier()).toEqual(0.5);

        viewModel.shuttleRingAngle(-0.5);
        expect(clockViewModel.multiplier()).toEqual(-0.5);
    });

    it('throws when constructed without arguments', function() {
        expect(function() {
            return new AnimationViewModel();
        }).toThrow();
    });

    it('setTimeFormatter throws with non-function', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);
        expect(function() {
            animationViewModel.setTimeFormatter({});
        }).toThrow();
    });

    it('setDateFormatter throws with non-function', function() {
        var clockViewModel = new ClockViewModel();
        var animationViewModel = new AnimationViewModel(clockViewModel);
        expect(function() {
            animationViewModel.setDateFormatter({});
        }).toThrow();
    });
});