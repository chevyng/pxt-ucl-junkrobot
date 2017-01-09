/**
 * UCL junk robot prototype code using 28BYJ-48 stepper motors
 */
//% weight=100
namespace junkrobot {

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private calibration: number;
        private state: number;

        setPins(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): void {
            // send pulse
            this.input1 = in1;
            this.input2 = in2;
            this.input3 = in3;
            this.input4 = in4;
        }

        //% blockId=set_motor_calibration block="%motor|set calibration value %calibration" blockGap=8
        //% advanced=true
        setCalibration(calibration: number): void {
            this.calibration = calibration;
        }

        setState(stateNum: number): void {
            this.state = stateNum;
        }

        steps(direction: number): void {
            if (this.state == 0) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 1) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 2) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 3) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 4) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 5) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 6) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 7) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 1);
            }

            this.state = this.state + direction;
            //console.log("State: " + this.state);
            if (this.state < 0) {
                this.state = 7;
            } else if (this.state > 7) {
                this.state = 0;
            }
        }

    }

    export class Robot {
        private motorL: Motor;
        private motorR: Motor;

        setMotors(motorL: Motor, motorR: Motor): void {
            this.motorL = motorL;
            this.motorR = motorR;
        }

        //% blockId=move_forward block="%this|move %steps| steps forward"
        moveForward(steps: number): void {
            for (var i = 0; i < steps; i++) {
                this.motorL.steps(1);
                this.motorR.steps(-1);
                basic.pause(1);
            }
        }

        //% blockId=move_backward block="%this|move %steps| steps backward"
        moveBackward(steps: number): void {
            for (var i = 0; i < steps; i++) {
                this.motorL.steps(-1);
                this.motorR.steps(1);
                basic.pause(1);
            }
        }

        //% blockId=turn_left block="%this|turn left degrees %degrees"
        turnLeft(degrees: number): void {
            for (var i = 0; i < degrees; i++) {
                this.motorL.steps(-1);
                //this.motorR.steps(-1);
                basic.pause(1);
            }
        }

        //% blockId=turn_right block="%this|turn right degrees %degrees"
        turnRight(degrees: number): void {
            for (var i = 0; i < degrees; i++) {
                this.motorL.steps(1);
                //this.motorR.steps(1);
                basic.pause(1);
            }
        }

        //% blockId=turn_n_degrees block="%robot|angle %angle"
        turn(angle: number): void {
            let direction: number;
          //  var ticks: number = 34.249;
            console.log("nTicks value: " + angle);
            if (angle > 0) {
                direction = -1;
            }
            else if (angle < 0) {
                direction = 1;
            }
            else if (angle == 0) {
                direction = 0;
            }

            if (direction != 0) {
                //var nTicks: number;
                //nTicks = angle * ticks;
                //console.log("nTicks value: " + nTicks);
                for (var i = 0; i < angle; i++) {
                    this.motorL.steps(direction);
                    this.motorR.steps(direction);
                    basic.pause(1);
                }
            }
        }

    }

    //% blockId=create_moto block="set pin1 %input1|set pin2 %input2|set pin3 %input3|set pin4 %input4"
    //% weight=99
    export function createMotor(input1: DigitalPin, input2: DigitalPin, input3: DigitalPin, input4: DigitalPin)
        : Motor {
        let motor = new Motor();
        motor.setPins(input1, input2, input3, input4);
        motor.setCalibration(522);
        motor.setState(0);
        return motor;
    }

    //% blockId=create_robot block="set left motor %motor1|set right motor %motorR"
    //% weight=100
    export function createRobot(motorL: Motor, motorR: Motor): Robot {
        let robot = new Robot();
        robot.setMotors(motorL, motorR);
        return robot;
    }
}
